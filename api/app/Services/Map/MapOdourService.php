<?php

namespace App\Services\Map;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Filters\OdourObservations\{ FilterOdourTypes, FilterOdourHedonicTones, FilterOdourIntensities };
use Illuminate\Http\Request;

class MapOdourService
{
    public function near(Request $request)
    {
    }
}
