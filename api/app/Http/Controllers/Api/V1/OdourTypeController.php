<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OdourType;
use App\Http\Resources\OdourTypeResource;

class OdourTypeController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => OdourTypeResource::collection(OdourType::all()),
        ], 200);
    }

    public function show(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => new OdourTypeResource(OdourType::find($request->id)),
        ], 200);
    }
}
