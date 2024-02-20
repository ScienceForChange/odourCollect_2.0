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
            'user_id',
            'odour_sub_type_id',
            'odour_intensity_id',
            'odour_hedonic_tone_id',
            'longitude',
            'latitude',
            'description',
            'origin',
            'deleted_at',
            'created_at',
            'updated_at',
        ];
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return OdourObservation::where('user_id', $this->id)->get();
    }
}
