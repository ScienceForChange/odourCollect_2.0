<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; //TODO: check if user is admin or something
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        // TODO REFACTOR WHEN YOU CREATE A CLIENTPROFILE OR CITIZENPROFILE
        return [
            'name'      => ['sometimes','required', 'min:5','max:255'],
            'email'     => ['required', 'email:rfc', 'string', 'unique:users'],
            'gender' => ['required', new Enum(\App\Enums\Citizen\Gender::class)],
            'birth_year' => ['sometimes', 'string'],
            'password'  => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
