<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use App\Contracts\Likeable;
use App\Traits\Likes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OdourObservation extends Model implements Likeable
{
    use HasFactory, SoftDeletes, Likes;

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

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
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

    public function generateColor(): int
    {
        // se hace la conversión de id a index o power
        // En hedonic_tone por ejemplo el id 1 hace referencia al -4 de index
        // En intensity el id 2 hace referencia al 1 de power TODO: hablar con Johana esto

        $color = array(
            2 => [1 => 6, 2 => 5, 3 => 5, 4 => 4, 5 => 3, 6 => 3, 7 => 2, 8 => 1, 9 => 1],
            3 => [1 => 6, 2 => 6, 3 => 5, 4 => 4, 5 => 4, 6 => 3, 7 => 2, 8 => 2, 9 => 1],
            4 => [1 => 7, 2 => 6, 3 => 5, 4 => 5, 5 => 4, 6 => 4, 7 => 3, 8 => 2, 9 => 2],
            5 => [1 => 7, 2 => 7, 3 => 6, 4 => 5, 5 => 5, 6 => 4, 7 => 3, 8 => 3, 9 => 2],
            6 => [1 => 7, 2 => 7, 3 => 6, 4 => 6, 5 => 5, 6 => 4, 7 => 4, 8 => 3, 9 => 2],
            7 => [1 => 7, 2 => 7, 3 => 7, 4 => 6, 5 => 5, 6 => 5, 7 => 4, 8 => 4, 9 => 3],
        );

        // 8 lo pondré como valor default si no se ha podido calcualr el color, por lo de que la tabla de intensidad no corresponde con la matriz.
        return $color[$this->odour_intensity_id][$this->odour_hedonic_tone_id] ?? 8;
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
