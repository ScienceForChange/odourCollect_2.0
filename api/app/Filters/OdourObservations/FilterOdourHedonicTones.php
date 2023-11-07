<?php

namespace App\Filters\OdourObservations;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class FilterOdourHedonicTones implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if(is_array($value)) {
            $odour_hedonic_tone = DB::table('odour_hedonic_tones')->select('id')->whereBetween('index', $value);
        } else {
            $odour_hedonic_tone = DB::table('odour_hedonic_tones')->select('id')->where('index', $value);
        }
        $query->wherein('odour_hedonic_tone_id', $odour_hedonic_tone);
    }
}
