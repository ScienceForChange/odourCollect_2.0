<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LikeRequest;
use App\Http\Requests\UnlikeRequest;

class LikeController extends Controller
{
    public function like(LikeRequest $request)
    {
        $request->user()->like($request->likeable());

        // notification

        return response()->json([
            'likes' => $request->likeable()->likes()->count(),
        ]);
    }

    public function unlike(UnlikeRequest $request)
    {
        $request->user()->unlike($request->likeable());

        return response()->json([
            'likes' => $request->likeable()->likes()->count(),
        ]);
    }
}
