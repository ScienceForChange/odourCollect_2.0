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
        Schema::create('zone_vertices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('zone_id');
            $table->string('vertex_position');
            $table->decimal('longitude', 8, 5)->comment('longitude varies from 180.00000 to -180.00000, 5 decimal point means 1 meter precision');
            $table->decimal('latitude', 7, 5)->comment('latitude varies from 90.00000 to -90.00000, 5 deciamal point means 1 meter precision');
            $table->timestamps();

            $table->foreign('zone_id')->references('id')->on('zones')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zone_vertices');
    }
};
