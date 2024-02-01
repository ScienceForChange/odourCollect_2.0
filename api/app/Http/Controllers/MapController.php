<?php

namespace App\Http\Controllers;

use App\Filters\OdourObservations\FilterOdourHedonicTones;
use App\Filters\OdourObservations\FilterOdourIntensities;
use App\Filters\OdourObservations\FilterOdourTypes;
use App\Http\Resources\MapObservationResource;
use App\Models\OdourObservation;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MapController extends Controller
{
    use ApiResponses;

    public function index()
    {
        $odourObservations = QueryBuilder::for(OdourObservation::class)
        ->allowedFilters([
            AllowedFilter::custom('hedonicTone', new FilterOdourHedonicTones),
            AllowedFilter::custom('intensity', new FilterOdourIntensities),
            AllowedFilter::custom('type', new FilterOdourTypes),
            AllowedFilter::scope('createdBetween'),
            AllowedFilter::scope('createdTodayBetween'),
        ])->allowedIncludes([
            'odourIntensity',
            'odourHedonicTone',
            'odourSubType.odourType',
            'user.userable'
        ]);

        $limit = request()->limit ?? '';

        $odours = $odourObservations
        // ->select('id','user_id', 'latitude','longitude') Maybe not needed
        ->get();

        if(request()->has('is_inside')) {
        $filtered = $odours->filter(function (OdourObservation $value) {
        return $value->haversineGreatCircleDistance() < request()->is_inside;
        });

        return $this->success(
        MapObservationResource::collection($filtered)
        ,
        Response::HTTP_OK);
        }

        return $this->success(
        MapObservationResource::collection($odours)
        ,
        Response::HTTP_OK);
    }
}
