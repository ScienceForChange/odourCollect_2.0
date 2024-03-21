<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Polygon;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'polygon'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    protected $casts = [
        'polygon' => Polygon::class
    ];
}
