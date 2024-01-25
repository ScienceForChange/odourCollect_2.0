<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOdourObservationComment;
use App\Models\Comment;
use App\Models\OdourObservation;
use App\Notifications\CommentReceived;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OdourObservationCommentController extends Controller
{
    use ApiResponses;
    /**
     * Display a listing of the resource.
     */
    public function index(OdourObservation $odourObservation)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOdourObservationComment $request, OdourObservation $odourObservation)
    {
        $odourObservation->comments()->create([
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);

        $userToNoify = $odourObservation->user;

        if($userToNoify->id !== $request->user()->id)
            $userToNoify->notify(new CommentReceived($odourObservation, $request->user()));
            // \App\Models\User::find($notificationObj->user_id)->notify(new LikeReceived($notificationObj));

        return $this->success([
            'message' => 'Comment created successfully.'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(OdourObservation $odourObservation, Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OdourObservation $odourObservation, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OdourObservation $odourObservation, Comment $comment)
    {
        $comment->delete();

        return $this->success([
            // Nothing
        ],
        Response::HTTP_NO_CONTENT);
    }
}
