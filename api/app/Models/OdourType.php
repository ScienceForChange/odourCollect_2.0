<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OdourType extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'name',
        'slug',
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
     * Get the Odours SubType for the Odour Type.
     */
    public function odourSubTypes(): HasMany
    {
        return $this->hasMany(OdourSubType::class);
    }

    public function odourObservations(): HasManyThrough
    {
        return $this->hasManyThrough(
            OdourObservation::class,
            OdourSubType::class,
            'odour_type_id',
            'odour_sub_type_id',
            'id',
            'id'
        );
    }
}
