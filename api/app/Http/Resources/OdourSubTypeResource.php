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
            'id' => $this->id,
            'odourTypeId' => $this->odour_type_id,
            'name'          => $this->name,
            'slug'          => $this->slug,
            'relationships' => [
                'odourType' => new OdourTypeResource($this->whenLoaded('odourType')),
            ],
        ];
    }
}
