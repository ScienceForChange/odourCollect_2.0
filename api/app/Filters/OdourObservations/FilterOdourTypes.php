<?php

namespace App\Filters\OdourObservations;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class FilterOdourTypes implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if(is_array($value)) {
            $odour_sub_types = DB::table('odour_sub_types')->select('id')->whereIn('odour_type_id', $value);
        } else {
            $odour_sub_types = DB::table('odour_sub_types')->select('id')->where('odour_type_id', $value);
        }
        $query->wherein('odour_sub_type_id', $odour_sub_types);
    }
}
