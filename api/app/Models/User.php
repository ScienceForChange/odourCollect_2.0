<?php

namespace App\Models;

use App\Contracts\Likeable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\SfC\VerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\HasUuid;

class User extends Authenticatable //implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasUuid;

    /**
     * The relationships that should always be loaded.
     *
     * @var array<int, string>
     */
    protected $with = ['profile'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    /**
     * Get the profile associated with user.
     */
    public function profile(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'profile_type', 'profile_id');
    }

    /**
     * Get user´s profile type
     */
    public function getProfileTypeAttribute(): string
    {
        return $this->profile->getMorphClass();
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
        return $this->morphMany(Like::class, 'likeable');
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
                $q->where('uuid', $this->uuid);
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
                    $q->where('uuid', $this->uuid);
                })
                ->exists();
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
}
