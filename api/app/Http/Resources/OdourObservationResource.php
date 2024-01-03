<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdourObservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            'type'                      => 'odourObservation', // Buscar un método para que esto sea automático
            'attributes'                => [
                'latitude'                  => $this->latitude,
                'longitude'                 => $this->longitude,
                'description'               => $this->description,
                'origin'                    => $this->origin,
                'createdAt'                 => $this->created_at->format('Y-m-d H:m:s'),
                'updatedAt'                 => $this->updated_at->format('Y-m-d H:m:s'),
            ],
            'relationships' => [
                'odourType' => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourTypes.show', ['odourType' => $this->odourType]), //TODO
                    ],
                ],
                'odourSubType'      => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourSubTypes.show', ['odourSubType' => $this->odour_sub_type_id]),
                    ],
                ],
                'odourIntensity'    => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourIntensities.show', ['odourIntensity' => $this->odour_intensity_id]),
                    ],
                ],
                'odourHedonicTone'  => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('odourHedonicTones.show', ['odourHedonicTone' => $this->odour_hedonic_tone_id]),
                    ],
                ],
                'user'              => [
                    'links' => [
                        'self' => '', //TODO
                        'related' => route('users.show', ['uuid' => $this->user_id]),
                    ],
                ],
            ],
            'includes'             => [
                'odourType'         => new OdourTypeResource($this->whenLoaded('odourType')),
                'odourSubType'      => new OdourSubTypeResource($this->whenLoaded('odourSubType')),
                'odourIntensity'    => new OdourIntensityResource($this->whenLoaded('odourIntensity')),
                'odourHedonicTone'  => new OdourHedonicToneResource($this->whenLoaded('odourHedonicTone')),
                'user'              => new UserResource($this->whenLoaded('user')),
            ],
            'links'                     => [
                'self'                      => route('odourObservations.show', ['odourObservation' => $this->id]),
            ],
        ];
    }
}

