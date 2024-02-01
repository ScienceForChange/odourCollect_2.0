<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OdourSubTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // get sql file path
        $path = database_path('sql_dump_seeder_files/odour_subtypes.sql');

        // execute raw sql from .sql file
        DB::unprepared(file_get_contents($path));
    }
}
