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
        Schema::create('odour_sub_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('odour_type_id');
            $table->string('name');
            $table->string('slug');

            $table->foreign('odour_type_id')->references('id')->on('odour_types')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('odour_sub_types');
    }
};
