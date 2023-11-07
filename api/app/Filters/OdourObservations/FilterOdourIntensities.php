<?php

namespace App\Filters\OdourObservations;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class FilterOdourIntensities implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if(is_array($value)) {
            $odour_intensity = DB::table('odour_intensities')->select('id')->whereBetween('power', $value);
        } else {
            $odour_intensity = DB::table('odour_intensities')->select('id')->where('power', $value);
        }
        $query->wherein('odour_intensity_id', $odour_intensity);
    }
}
