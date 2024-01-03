<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdourTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => 'odourType', // Buscar un método para que esto sea automático
            'attributes' => [
                'name' => $this->name,
                'slug' => $this->slug,
            ],
            'relationships' => [
                'odourSubTypes' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourTypes.odourSubTypes.index', ['odourType' => $this->id]),
                    ],
                ],
                'odourObservations' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourTypes.odourObservations.index', ['odourType' => $this->id]),
                    ],
                ],
            ],
            'includes' => [
                'odourSubTypes' => OdourSubTypeResource::collection($this->whenLoaded('odourSubTypes')),
                'odourObservations' => OdourObservationResource::collection($this->whenLoaded('odourObservations')),
            ],
            'links' => [
                'self' => route('odourTypes.show', ['odourType' => $this->id]),
            ],
        ];
    }
}
