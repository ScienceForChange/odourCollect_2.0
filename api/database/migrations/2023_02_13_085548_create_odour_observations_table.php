<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('odour_observations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('odour_sub_type_id')->nullable();
            $table->foreignId('odour_intensity_id')->nullable();
            $table->foreignId('odour_hedonic_tone_id')->nullable();
            $table->decimal('longitude', 8, 5)->comment('longitude varies from 180.00000 to -180.00000, 5 decimal point means 1 meter precision');
            $table->decimal('latitude', 7, 5)->comment('latitude varies from 90.00000 to -90.00000, 5 deciamal point means 1 meter precision');
            $table->text('description')->nullable();
            $table->text('origin')->nullable();
            $table->softDeletes()->nullabe();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->nullable();
            $table->foreign('odour_sub_type_id')->references('id')->on('odour_sub_types');
            $table->foreign('odour_intensity_id')->references('id')->on('odour_intensities');
            $table->foreign('odour_hedonic_tone_id')->references('id')->on('odour_hedonic_tones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('odour_observations');
    }
};
