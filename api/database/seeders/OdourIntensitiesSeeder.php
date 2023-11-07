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
                'name' => 'Not perceptible',
            ],
            [
                'power' => '1',
                'name' => 'Very weak',
            ],
            [
                'power' => '2',
                'name' => 'Weak',
            ],
            [
                'power' => '3',
                'name' => 'Distinct',
            ],
            [
                'power' => '4',
                'name' => 'Strong',
            ],
            [
                'power' => '5',
                'name' => 'Very strong',
            ],
            [
                'power' => '6',
                'name' => 'Extremely strong',
            ]
        ];

        foreach($arrayIntensities as $intensity){
            OdourIntensity::create($intensity);
        }
    }
}
