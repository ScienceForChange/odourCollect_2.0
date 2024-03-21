<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('projects')->insert([
            'odour_sub_type_id' => 1,
            'user_id' => 2609,
            'title' => 'Project 1',
            'description' => 'Project 1 description',
            'hours' => 4,
            'space' => 600,
            'start_date' => '2023-01-18 13:18:18',
            'end_date' => '2023-03-18 13:18:18',
        ]);
    }
}
