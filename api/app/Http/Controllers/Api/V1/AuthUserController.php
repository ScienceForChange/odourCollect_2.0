<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class AuthUserController extends Controller
{
    /**
     * Display the authenticated user.
     */
    public function show(Request $request)
    {
        return new JsonResponse([
            'status' => 'success',
            'data' => new UserResource($request->user()->load([
                'odourObservations' => [
                    'odourHedonicTone',
                    'odourIntensity',
                    'odourSubType.odourType'
                ]
            ])),
        ], 200);
        return new UserResource($request->user());
    }
}
