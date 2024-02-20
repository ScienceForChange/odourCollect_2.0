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
use App\Exports\OdourExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

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
                        ->orderBy('created_at','DESC')->limit($limit)->get();

        if(request()->has('is_inside') && request()->has('latitude') && request()->has('longitude')) {
            $filtered = $odours->filter(function (OdourObservation $value) {
                return $value->haversineGreatCircleDistance(request()->latitude, request()->longitude) < request()->is_inside;
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
                'user',
                'comments'
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
                'comments.user'
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

    public function export()
    {
        $id = auth()->user()->id;
        return Excel::download(new OdourExport($id), 'odours.csv', \Maatwebsite\Excel\Excel::CSV, [
            'Content-Type' => 'text/csv',
      ]);
    }
}
