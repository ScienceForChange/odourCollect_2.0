<?php

namespace App\Exports;

use App\Models\OdourObservation;
use Maatwebsite\Excel\Concerns\FromCollection;

class OdourExport implements FromCollection
{
    public function __construct(public int $id)
    {
        //
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return OdourObservation::where('user_id', $this->id)->get();
    }
}
