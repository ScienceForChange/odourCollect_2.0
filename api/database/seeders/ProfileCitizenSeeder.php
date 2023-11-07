<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileCitizenSeeder extends Seeder
{
    //TODO
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // get sql file path
        $path = database_path('sql_dump_seeder_files/profile_citizen_users.sql');

        // execute raw sql from .sql file
        DB::unprepared(file_get_contents($path));
    }
}
