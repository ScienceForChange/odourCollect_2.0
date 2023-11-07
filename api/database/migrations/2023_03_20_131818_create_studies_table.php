<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('studies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('odour_sub_type_id');
            $table->string('study_title')->nullable();
            $table->string('description')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();

            $table->foreign('odour_sub_type_id')->references('id')->on('odour_sub_types')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studies');
    }
};
