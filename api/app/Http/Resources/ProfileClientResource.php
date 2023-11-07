<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type'          => 'Client',    //TODO mejorar
            'id'            => $this->id,
            'name'          => $this->name,
            'surname'       => $this->surname,
            'company'       => $this->company,
            'phone'         => $this->phone,
            'sfcAssociated' => $this->sfc_associated,
            'companyPerson' => $this->company_person,
        ];
    }
}
