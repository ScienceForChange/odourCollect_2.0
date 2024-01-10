<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LikeRequest;
use App\Http\Requests\UnlikeRequest;
use App\Notifications\LikeReceived;
class LikeController extends Controller
{
    public function like(LikeRequest $request)
    {
        $notificationObj = $request->likeable();

        $request->user()->like($notificationObj);

        $userToNoify = $notificationObj->user;

        $userToNoify->notify(new LikeReceived($notificationObj, $request->user()));
        // \App\Models\User::find($notificationObj->user_id)->notify(new LikeReceived($notificationObj));

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
