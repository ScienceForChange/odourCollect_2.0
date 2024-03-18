<?php

namespace App\Exports;

use App\Models\OdourObservation;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class OdourExport implements FromCollection, WithHeadings
{
    public function __construct(public int $id)
    {
        //
    }

    public function headings(): array
    {
        return [
            'id',
            'user',
            'odour_sub_type',
            'odour_intensity',
            'odour_hedonic_tone',
            'longitude',
            'latitude',
            'description',
            'origin',
            'created_at',
            'updated_at',
        ];
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $odourObservations = OdourObservation::with(['odourSubType:id,name','odourIntensity:id,name','odourHedonicTone:id,name'])
                                ->where('user_id', $this->id)
                                ->get();

        $odourForExcel = $odourObservations->map(function($odour){
            return [
                'id'                => $odour->id,
                'user'              => $odour->user->email,
                'odour_sub_type'    => $odour->odourSubType->name,
                'odour_intensity'   => $odour->odourIntensity->name,
                'odour_hedonic_tone'=> $odour->odourHedonicTone->name,
                'latitude'          => $odour->latitude,
                'longitude'         => $odour->longitude,
                'description'       => $odour->description,
                'origin'            => $odour->origin,
                'created_at'        => $odour->created_at,
                'updated_at'        => $odour->updated_at,
            ];
        });

        return collect($odourForExcel);
    }
}
