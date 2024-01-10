<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JSONResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return new JsonResponse([
            'status' => 'success',
            'data' => new UserResource(request()->user()->load([
                'userable',
                'odourObservations' => [
                    'odourHedonicTone',
                    'odourIntensity',
                    'odourSubType' => [
                        'odourType'
                    ]
                ]
            ])),
        ], 201);

        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
