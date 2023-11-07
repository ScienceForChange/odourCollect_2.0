<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; //TODO: check if user is himself or admin i guess
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
            'name'      => ['sometimes', 'required', 'min:5','max:255'],
            'email'     => ['sometimes', 'required', 'string', Rule::unique('users')->ignore(request()->user()->id),],
            'gender'    => ['sometimes', 'string'],
            'birth_year' => ['sometimes', 'string'],
            'password'  => ['sometimes', 'required', 'confirmed', Rules\Password::defaults()],
            'avatar_id' => ['sometimes'],
        ];
    }
}
