<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnlikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('unlike', $this->likeable());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function likeable()
    {
        $class = $this->input('likeable_type');

        return $class::findOrFail($this->input('id'));
    }
}
