<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OdourIntensity;

class OdourIntensitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrayIntensities = [
            [
                'power' => '0',
                'name' => 'Imperceptible',
            ],
            [
                'power' => '1',
                'name' => 'Muy débil',
            ],
            [
                'power' => '2',
                'name' => 'Débil',
            ],
            [
                'power' => '3',
                'name' => 'Indiferente',
            ],
            [
                'power' => '4',
                'name' => 'Fuerte',
            ],
            [
                'power' => '5',
                'name' => 'Muy fuerte',
            ],
            [
                'power' => '6',
                'name' => 'Extremadamente fuerte',
            ]
        ];

        foreach($arrayIntensities as $intensity){
            OdourIntensity::create($intensity);
        }
    }
}
