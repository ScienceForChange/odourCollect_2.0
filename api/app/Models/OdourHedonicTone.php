<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Cviebrock\EloquentSluggable\Sluggable;

class OdourHedonicTone extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'index',
        'name',
        'slug'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    /**
     * Get the odours for the Odour Hedonic Tone kind.
     */
    public function odourObservations(): HasMany
    {
        return $this->hasMany(OdourObservation::class);
    }
}
