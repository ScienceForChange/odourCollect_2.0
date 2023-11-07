<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Type\Integer;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('odour_location_added_values', function (Blueprint $table) {
            // $table->id();
            $table->foreignId('odour_observation_id')->unique();
            $table->string('country', 3)->comment('format: alpha_3 ISO 3166-1')->nullable();
            $table->dateTime('odour_report_local_time')->comment('format used: YYYY-MM-DD hh:mm:ss')->nullable();
            $table->smallInteger('temperature')->comment('format used: Celsius')->nullable();
            $table->integer('atmospheric_pressure')->comment('format used: Pascal')->nullable();
            $table->integer('humidity')->comment('format: g.m^3')->nullable();
            $table->decimal('wind_speed', 5, 2)->comment('format used: Meter/Sec')->nullable();
            $table->integer('wind_direction')->comment('format used: Meteorological')->nullable();
            $table->timestamps();

            $table->foreign('odour_observation_id')->references('id')->on('odour_observations')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('odour_location_added_values');
    }
};
