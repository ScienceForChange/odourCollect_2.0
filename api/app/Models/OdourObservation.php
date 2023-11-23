<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class OdourObservation extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'odour_sub_type_id',
        'odour_intensity_id',
        'odour_hedonic_tone_id',
        'latitude',
        'longitude',
        'description',
        'origin',
        'odour_report_server_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'odour_report_server_time' => 'datetime',
    ];

    /**
     * Get the Odour Hedonic Tone that defines the odour.
     */
    public function odourHedonicTone(): BelongsTo
    {
        return $this->belongsTo(OdourHedonicTone::class);
    }

    /**
     * Get the Intensity that defines the odour.
     */
    public function odourIntensity(): BelongsTo
    {
        return $this->belongsTo(OdourIntensity::class);
    }

    /**
     * Get the Subtype that defines the odour.
     */
    public function odourSubType(): BelongsTo
    {
        return $this->belongsTo(OdourSubType::class);
    }

    /**
     * Get the user that owns the odour.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the Type of the odour.
     */
    public function odourType(): HasOneThrough
    {
        return $this->hasOneThrough(
            OdourType::class,
            OdourSubType::class,
            'id',
            'id',
            'odour_sub_type_id',
            'odour_type_id');
    }

    public function scopeCreatedBetween(Builder $query, string $start_date, string $end_date): void
    {
        $query->whereBetween('created_at', [$start_date, $end_date]);
    }

    public function scopeCreatedTodayBetween(Builder $query, string $start_hour, string $end_hour): void
    {
        $start = Carbon::createFromTimeString(str_replace('-', ':', $start_hour));
        $end = Carbon::createFromTimeString(str_replace('-', ':', $end_hour));

        $query->whereBetween('created_at', [Carbon::parse($start), Carbon::parse($end)]);
    }

    public function haversineGreatCircleDistance(
        //41.3776, 2.1530
        $latitudeFrom = '41.3776', $longitudeFrom = '2.1530', $earthRadius = 6371000)
      {
        // convert from degrees to radians
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($this->latitude);
        $lonTo = deg2rad($this->longitude);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
          cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return $angle * $earthRadius;
      }

}
