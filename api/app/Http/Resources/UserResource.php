<?php

namespace App\Http\Resources;

use App\Traits\WhenMorphToLoaded;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    use WhenMorphToLoaded;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'email'             => $this->email,
            'avatar_id'         => $this->avatar_id,
            'relationships'     => [
                'profile'           => $this->whenMorphToLoaded('userable', [
                    // No me preguntes por qué pero no deja usando: ProfileCitizen::class
                    //-> cuando mapea el array no coinciden las keys (por el doble paréntesis)
                    "client" => ProfileClientResource::class,
                    "citizen" => ProfileCitizenResource::class
                ]),
                'odourObservations' => OdourObservationResource::collection($this->whenLoaded('odourObservations'))
            ],
            'AcceptedLegalAt'       => $this->accepted_legal_at,
            'createdAt'         => $this->created_at,
            'updatedAt'         => $this->updated_at,
        ];
    }
}
