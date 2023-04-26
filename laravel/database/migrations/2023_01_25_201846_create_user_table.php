<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Database\Seeders\UserSeeder;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string("pseudo", 30)->unique();
            $table->string("password");
            $table->string("email")->unique();
            $table->string("nom", 30);
            $table->string("prenom", 30);
            $table->string("nationalite", 20);
            $table->string("adresse", 60);
            $table->string("tel", 11);
            $table->date("date_naissance");
            $table->string("url_image");
            $table->foreignId("role_id")->constrained("roles");
            $table->date('last_login');
            $table->timestamps();
        });

        UserSeeder::run();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
};
