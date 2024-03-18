<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\{ UserResource, UserCollection };
use App\Http\Requests\{ StoreUserRequest, UpdateUserPasswordRequest, UpdateUserRequest };
use App\Rules\teenAgeCare;
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

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
    public function show(User $user)
    {
        return $this->success([
            new UserResource($user->load([
                'userable',
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
        if(! $user->userable) { //no tiene perfil asociado
            $user->userable()->create(
                $request->only([
                    'birth_year','gender','is_trained'
                ])
            );
        } else { // tiene perfil asociado
            $user->update(
                $request->only('accepted_legal_at')
            );
            $user->userable()->update(
                $request->only([
                    'birth_year','gender','is_trained'
                ])
            );
        }

        return $this->success([
            new UserResource($user->refresh())
        ],
        Response::HTTP_OK);
    }

    public function fullUpdate(Request $request, User $user)
    {
        $validator = Validator::make($request->all(),[
            'name'      => ['sometimes', 'min:5','max:255'],
            'birth_year' => ['required', 'integer', 'min:1900', new teenAgeCare(15)],
            'gender' => ['required', new Enum(\App\Enums\Citizen\Gender::class)],
            'is_trained' => ['sometimes', 'boolean'],
        ]);

        $user->userable()->update(
            $validator->validate()
        );

        $user->userable;

        return $this->success([
            new UserResource($user->refresh())
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

    public function changeAvatar(Request $request)
    {
        $request->validate([
            'avatar_id' => 'required|digits_between:1,18',
        ]);

        User::whereId(auth()->user()->id)->update([
            'avatar_id' => $request->avatar_id
        ]);

        return response()->noContent();
    }
}
