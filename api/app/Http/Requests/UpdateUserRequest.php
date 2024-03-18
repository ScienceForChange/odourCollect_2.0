<?php

namespace App\Http\Requests;

use App\Rules\teenAgeCare;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            // 'name'      => ['sometimes', 'min:5','max:255'],
            'birthYear' => ['required', 'integer', 'min:1900', new teenAgeCare(15)],
            'gender' => ['required', new Enum(\App\Enums\Citizen\Gender::class)],
            'is_trained' => ['sometimes', 'boolean'],
            'accepted_legal_at' => ['sometimes', 'date'],
        ];
    }
}
