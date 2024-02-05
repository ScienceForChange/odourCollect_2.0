<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\FeedbackReceived;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{

    public function sendRequestToEmail(Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);

        $data = [
            'message' => $request->message,
            'email' => auth()->user()->email
        ];

        try{
            Mail::to('carlos.millan@scienceforchange.eu')->send(new FeedbackReceived($data));
        }catch (\Exception $e){
            return response()->json(['message' => 'Error sending email'], 500);
        }

        // Send email
        return response()->noContent();
    }
}
