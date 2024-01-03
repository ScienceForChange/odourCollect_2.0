<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdourSubTypeResource extends JsonResource
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
            'type'  => 'odourSubType', // Buscar un método para que esto sea automático
            'attributes' => [
                'name' => $this->name,
                'slug' => $this->slug,
            ],
            'relationships' => [
                'odourType' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourTypes.show', ['odourType' => $this->odour_type_id]),
                    ],
                ],
                'odourObservations' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourSubTypes.odourObservations.index', ['odourSubType' => $this->id]),
                    ],
                ],
            ],
            'includes' => [
                'odourType' => new OdourTypeResource($this->whenLoaded('odourType')),
                'odourObservations' => OdourObservationResource::collection($this->whenLoaded('odourObservations')),
            ],
            'links' => [
                'self' => route('odourSubTypes.show', ['odourSubType' => $this->id])
            ],
        ];

        // return [
        //     'id' => $this->id,
        //     'odourTypeId' => $this->odour_type_id,
        //     'name'          => $this->name,
        //     'slug'          => $this->slug,
        //     'relationships' => [
        //         'odourType' => new OdourTypeResource($this->whenLoaded('odourType')),
        //     ],
        // ];
    }
}
