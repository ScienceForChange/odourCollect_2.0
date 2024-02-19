<?php

namespace App\Models;

use App\Contracts\Likeable;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\SfC\VerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'avatar_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the parent userable model (citizen profile, client profile, etc).
     */
    public function userable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the odours for the user.
     */
    public function odourObservations(): HasMany
    {
        return $this->hasMany(OdourObservation::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function like(Likeable $likeable)
    {
     if($this->hasLiked($likeable)) {
         return $this;
     }

     (new Like())
            ->user()->associate($this)
            ->likeable()->associate($likeable)
            ->save();

            return $this;
    }

    public function unlike(Likeable $likeable)
    {
        if(!$this->hasLiked($likeable)) {
            return $this;
        }

        $likeable->likes()
            ->whereHas('user', function($q) {
                $q->where('id', $this->id);
            })
            ->delete();

            return $this;
    }

    public function hasLiked(Likeable $likeable)
    {
        if(! $likeable->exists) {
            return false;
        }

        return $likeable->likes()
                ->whereHas('user', function($q) {
                    $q->where('id', $this->id);
                })
                ->exists();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail($this));
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
