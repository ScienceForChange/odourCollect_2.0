<?php

namespace Database\Seeders;

use App\Models\OdourHedonicTone;
use Illuminate\Database\Seeder;

class OdourHedonicTonesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $arrayHedonicTones = [
            [
                'index' => '-4',
                'name' => 'Extremely unpleasant',
            ],
            [
                'index' => '-3',
                'name' => 'Very unpleasant',
            ],
            [
                'index' => '-2',
                'name' => 'Unpleasant',
            ],
            [
                'index' => '-1',
                'name' => 'Slightly unpleasant',
            ],
            [
                'index' => '0',
                'name' => 'Neutral',
            ],
            [
                'index' => '1',
                'name' => 'Slightly pleasant',
            ],
            [
                'index' => '2',
                'name' => 'Pleasant',
            ],
            [
                'index' => '3',
                'name' => 'Vary pleasant',
            ],
            [
                'index' => '4',
                'name' => 'Extremely pleasant',
            ]
        ];

        foreach($arrayHedonicTones as $hedonicTone){
            OdourHedonicTone::create($hedonicTone);
        }
    }
}
