<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OdourMapResource extends JsonResource
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
            'lat_long'                  => $this->latitude .'-'. $this->longitude,
            // 'longitude'                 => $this->longitude,
            'user_id'                   => $this->user_id,
            'color'                    => 'red',
            // 'link'  => route('odourObservations.show', ['odourObservation' => $this->id]),
        ];
    }
}
