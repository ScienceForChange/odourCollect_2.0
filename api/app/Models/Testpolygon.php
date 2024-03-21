<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

/**
 * @property Point $location
 * @property Polygon $area
 */
class Testpolygon extends Model
{
    use HasSpatial;

    protected $fillable = [
        'name',
        'area',
    ];

    protected $casts = [
        'area' => Polygon::class,
    ];
}
