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
            'name'      => ['sometimes', 'min:5','max:255'],
            'gender'    => ['sometimes', 'string'],
            'birth_year' => ['sometimes', 'string'],
        ];
    }
}
