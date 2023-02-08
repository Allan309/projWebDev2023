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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string("name", 50);
        });

        Schema::table('user', function (Blueprint $table) {
            $table->foreignId("role_id");
            $table->dropColumn("isAdmin");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
        Schema::table('user', function (Blueprint $table) {
            $table->boolean("isAdmin");
            $table->dropColumn("role_id");
        });
    }
};
