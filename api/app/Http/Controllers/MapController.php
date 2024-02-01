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
        ->whereIn('odour_sub_type_id',[
            10,11,12,13,14,15, // 2 Waste Water
            16,17,18,19,20,21,22,23,24,25, // 3 Agriculture/LiveStock
            26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43, // 4 Food Industries
            44,45,46,47,48,49,50,51,52,53,54,55,56,57, // 5 Industrial
            58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73 // 6 Urban
        ])
        ->orderBy('created_at','DESC')->limit($limit)->get();

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
