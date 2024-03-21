<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'odour_sub_type_id',
        'user_id',
        'title',
        'description',
        'hours',
        'space',
        'start_date',
        'end_date'
    ];

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function odourSubType()
    {
        return $this->belongsTo(OdourSubType::class);
    }
}
