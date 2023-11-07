<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OdourSubType extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'odour_type_id',
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
     * Get the odours for the subtype kind.
     */
    public function odours(): HasMany
    {
        return $this->hasMany(OdourObservation::class);
    }

    /**
     * Get the Odour Type that owns the Odour SubType.
     */
    public function odourType(): BelongsTo
    {
        return $this->belongsTo(OdourType::class);
    }
}
