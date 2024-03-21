<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'odour_sub_type_id' => 'required|integer',
            'user_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'hours' => 'required|integer',
            'space' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ];
    }
}
