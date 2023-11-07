<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOdourObservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // TODO: maybe users can be banned
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'odour_sub_type_id'         => ['required', 'integer', 'exists:odour_sub_types,id'],
            'odour_intensity_id'        => ['required', 'integer', 'exists:odour_intensities,id'],
            'odour_hedonic_tone_id'     => ['required', 'integer', 'exists:odour_hedonic_tones,id'],
            'latitude'                  => ['required', 'string'],
            'longitude'                 => ['required', 'string'],
            'description'               => ['nullable','sometimes','string', 'min:5', 'max:1500'],
            'origin'                    => ['nullable','sometimes','string', 'min:2', 'max:255'],
        ];
    }
}
