<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\{ UserResource, UserCollection };
use App\Http\Requests\{ StoreUserRequest, UpdateUserPasswordRequest, UpdateUserRequest };
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use ApiResponses;
    /**
     * Bring a collection of the resource.
     */
    public function index()
    {
        return $this->success(
            UserResource::collection(User::with([
                'userable',
                'odourObservations' => [
                    'odourHedonicTone',
                    'odourIntensity',
                    'odourSubType' => [
                        'odourType'
                    ]
                ]
            ])->get()),
        Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //TODO: Aquí solo se crea el usuario, sin perfil asociado. No es MVP
        $user = User::create(
            $request->validated()
        );

        return $this->success([
            new UserResource($user)
        ],
        Response::HTTP_CREATED);
    }

    /**
    * Bring the specified resource.
    */
    public function show(Request $request)
    {
        $user = User::where('uuid', $request->uuid)->firstOr(function () {
            abort(404, 'User not found');
        });

        return $this->success([
            new UserResource($user->load([
                'odourObservations' => [
                    'odourHedonicTone',
                    'odourIntensity',
                    'odourSubType' => [
                        'odourType'
                    ]
                ]
            ]))
        ],
        Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update(
            $request->validated()
        );

        return $this->success([
            new UserResource($user)
        ],
        Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        $request->whenFilled('deleted_because', function(string $deleted_because) use ($user){
            $user->userable()->update([
                'deleted_because' => $deleted_because
            ]);
           $user->push();
        });

        $user->delete();

        return $this->success([
            // Nothing
        ],
        Response::HTTP_NO_CONTENT);
    }

    /**
     * Restore the specified resource from storage
     */
    public function restore(User $user)
    {
        $user->restore();

        return $this->success([
            new UserResource($user)
        ],
        Response::HTTP_OK);
    }

    /**
     * Change Current password
     */
    public function changePassword(UpdateUserPasswordRequest $request)
    {
        //TODO: ver de cómo corregir el mensaje predefinido de laravel para los errores. Sí es MVP
        #Match The Old Password
        if(!Hash::check($request->validated('old_password'), auth()->user()->password)){
            return response()->json([
                "message" => "The old password is not correct",
                "errors" => [
                    "old_password" => [
                        "The old password field does not match."
                    ]
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        #Update the new Password
        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->validated('new_password'))
        ]);

        return response()->noContent();
    }
}
