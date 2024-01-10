<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileCitizenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type'          => 'Citizen', //TODO: ver de mejorar
            'name'          => $this->name,
            'surname'       => $this->surname,
            'gender'        => $this->gender,
            'birthYear'     => $this->birth_year,
            'phone'         => $this->phone,
        ];
    }
}
