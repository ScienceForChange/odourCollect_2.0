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
            'latitude'                  => $this->latitude,
            'longitude'                 => $this->longitude,
            'relationships'             => [
                'odourSubType'      => new OdourSubTypeResource($this->whenLoaded('odourSubType')),
                'odourIntensity'    => new OdourIntensityResource($this->whenLoaded('odourIntensity')),
                'odourHedonicTone'  => new OdourHedonicToneResource($this->whenLoaded('odourHedonicTone')),
                'user'              => new UserResource($this->whenLoaded('user')),
            ],
            'description'               => $this->description,
            'origin'                    => $this->origin,
            'createdAt'                 => $this->created_at->format('Y-m-d H:m:s'),
            'updatedAt'                 => $this->updated_at->format('Y-m-d H:m:s'),
        ];
    }
}
