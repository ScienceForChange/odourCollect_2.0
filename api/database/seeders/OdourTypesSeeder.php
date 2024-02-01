<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OdourType;
use Illuminate\Support\Facades\DB;

class OdourTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // get sql file path
        $path = database_path('sql_dump_seeder_files/odour_types.sql');

        // execute raw sql from .sql file
        DB::unprepared(file_get_contents($path));
    }
}
