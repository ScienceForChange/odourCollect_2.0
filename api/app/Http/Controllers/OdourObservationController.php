<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOdourObservationRequest;
use App\Http\Resources\OdourHedonicToneResource;
use App\Http\Resources\OdourIntensityResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\OdourObservationResource;
use App\Http\Resources\OdourTypeResource;
use App\Models\OdourHedonicTone;
use App\Models\OdourIntensity;
use App\Models\OdourObservation;
use App\Models\OdourType;
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\AllowedFilter;
use App\Filters\OdourObservations\{ FilterOdourTypes, FilterOdourHedonicTones, FilterOdourIntensities };

class OdourObservationController extends Controller
{
    use ApiResponses;

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
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
                OdourObservationResource::collection($filtered)
            ,
            Response::HTTP_OK);
        }

        return $this->success(
            OdourObservationResource::collection($odours)
        ,
        Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOdourObservationRequest $request): JsonResponse
    {
        $odourObservation = request()->user()->odourObservations()->create(
            $request->validated()
        );

        return $this->success([
            new OdourObservationResource($odourObservation->load([
                'odourHedonicTone',
                'odourIntensity',
                'odourSubType.odourType',
                'user'
            ]))
        ],
        Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(OdourObservation $odourObservation): JsonResponse
    {
        return $this->success([
            new OdourObservationResource($odourObservation->load([
                'odourHedonicTone',
                'odourIntensity',
                'odourSubType.odourType',
                'user.userable',
                'user.odourObservations.odourSubType.odourType',
                'comments'
            ]))
        ],
        Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OdourObservation $odourObservation): JsonResponse
    {
        if(request()->user()->id !== $odourObservation->user_id) {
            $this->fail([
                'message' => 'no puedes borrar observaciones que no sean tuyas.'
            ], Response::HTTP_FORBIDDEN);
        }

        $odourObservation->delete();

        return $this->success([
            // Nothing
        ],
        Response::HTTP_NO_CONTENT);
    }

    /**
     * Restore the specified resource from storage
     */
    public function restore(OdourObservation $odourObservation)
    {
        $odourObservation->restore();

        return $this->succcess([
            new OdourObservationResource($odourObservation)
        ],
        Response::HTTP_OK);
    }

    public function showRelatedData()
    {
        return $this->success([
            'OdourType' => OdourTypeResource::collection(OdourType::with(['odourSubTypes'])->get()),
            'OdourIntensity' => OdourIntensityResource::collection(OdourIntensity::get()),
            'OdourHedonicTone' => OdourHedonicToneResource::collection(OdourHedonicTone::get())
        ],
        Response::HTTP_OK);
    }
}
