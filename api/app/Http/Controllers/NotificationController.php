<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {

        $response = response()->json([
            'notifications' => $request->user()->unreadNotifications,
        ]);

        //$request->user()->notifications->markAsRead();

        return $response;
    }

    public function show(Request $request)
    {
        $notification = $request->user()->notifications()->findOrFail($request->notification);

        $notification->markAsRead();

        return response()->json([
            'notification' => $notification,
        ]);
    }
}
