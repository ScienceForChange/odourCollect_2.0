<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdatePointColumnObservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $observations = \App\Models\OdourObservation::all();

        $observations->each(function ($observation) {
            $lat = $observation->latitude;
            $long = $observation->longitude;
            $observation->point = DB::raw("ST_GeomFromText(\"POINT($long $lat)\")");
            $observation->save();
        });
    }
}
