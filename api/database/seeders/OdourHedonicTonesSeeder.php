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
                'name' => 'Extremadamente desagradable',
            ],
            [
                'index' => '-3',
                'name' => 'Muy desagradable',
            ],
            [
                'index' => '-2',
                'name' => 'Desagradable',
            ],
            [
                'index' => '-1',
                'name' => 'Ligeramente desagradable',
            ],
            [
                'index' => '0',
                'name' => 'Neutral',
            ],
            [
                'index' => '1',
                'name' => 'Ligeramente agradable',
            ],
            [
                'index' => '2',
                'name' => 'Agradable',
            ],
            [
                'index' => '3',
                'name' => 'Muy agradable',
            ],
            [
                'index' => '4',
                'name' => 'Extremadamente agradable',
            ]
        ];

        foreach($arrayHedonicTones as $hedonicTone){
            OdourHedonicTone::create($hedonicTone);
        }
    }
}
