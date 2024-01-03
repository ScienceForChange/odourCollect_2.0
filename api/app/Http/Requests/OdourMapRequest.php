<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Filters\OdourObservations\{ FilterOdourTypes, FilterOdourHedonicTones, FilterOdourIntensities };

class OdourMapRequest extends Request
{
    public function buildFiltersQuery($modelClass)
    {
        // Use QueryBuilder on the specified model class
        return QueryBuilder::for($modelClass)
            ->allowedFilters([
                AllowedFilter::custom('hedonicTone', new FilterOdourHedonicTones),
                AllowedFilter::custom('intensity', new FilterOdourIntensities),
                AllowedFilter::custom('type', new FilterOdourTypes),
                AllowedFilter::scope('createdBetween'),
                AllowedFilter::scope('createdTodayBetween'),
            ]); // Define allowed filters
    }

    public function buildSortsQuery($modelClass)
    {
        // Use QueryBuilder on the specified model class
        return QueryBuilder::for($modelClass)
            ->allowedSorts([
                // 'created_at',
                // 'odour_hedonic_tone_id',
                // 'odour_intensity_id',
                // 'odour_sub_type_id',
                // 'user_id',
            ]); // Define allowed sorts
    }
}
