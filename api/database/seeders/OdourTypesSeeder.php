<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OdourType;

class OdourTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrayTypes = [
            [
                'name' => 'Waste',
            ],
            [
                'name' => 'Waste Water',
            ],
            [
                'name' => 'Agriculture / Livestock',
            ],
            [
                'name' => 'Food Industries',
            ],
            [
                'name' => 'Industrial',
            ],
            [
                'name' => 'Urban',
            ],
            [
                'name' => 'Nice',
            ],
            [
                'name' => 'Other',
            ],
            [
                'name' => 'No Odor',
            ]
        ];

        foreach($arrayTypes as $type){
            OdourType::create($type);
        }
    }
}
