<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\OdourObservation;
use App\Http\Resources\OdourMapResource;
use App\Services\Map\MapOdourService;
use App\Http\Requests\OdourMapRequest;

class OdourMapController extends Controller
{
    public function __construct(
        private MapOdourService $mapOdourService
        )
    {}
    public function index(OdourMapRequest $request)
    {
        $query = $request->buildFiltersQuery(OdourObservation::class);

        //TODO add limit()
        $odourObservations = $query->get();

        if($request->has('distance')) {
            $odourObservations = $query->get()->filterNotInsideInside($request->distance);
        }

        return OdourMapResource::collection($odourObservations);
    }
}
