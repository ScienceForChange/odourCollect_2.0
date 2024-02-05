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
        if (is_null($this->resource)) {
            return [];
        }

        return [
            'type'          => 'Citizen', //TODO: ver de mejorar
            'name'          => $this->name,
            'surname'       => $this->surname,
            'gender'        => $this->gender,
            'birthYear'     => $this->birth_year,
            'phone'         => $this->phone,
            'level'         => $this->level,
            'isTrained'     => $this->is_trained,
        ];
    }
}
