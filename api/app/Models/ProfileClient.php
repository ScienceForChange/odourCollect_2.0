<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class ProfileClient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company',
        'phone',
        'sfc_associated',
        'charge'
    ];

    /**
     * Get the user's profile.
     */
    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'userable');
    }
}
