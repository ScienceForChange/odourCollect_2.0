<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdourHedonicToneResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'type'  => 'odourHedonicTone', // Buscar un método para que esto sea automático
            'attributes' => [
                'name' => $this->name,
                'index' => $this->index,
                'slug' => $this->slug,
            ],
            'relationships' => [
                'odourObservations' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourObservations.show', ['odourObservation' => $this->odourObservations]),
                    ],
                ],
            ],
            'includes' => [
                'odourObservations' => OdourObservationResource::collection($this->whenLoaded('odourObservations')),
            ],
            'links' => [
                'self' => '', //TODO
            ],
        ];
    }
}
