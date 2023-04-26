<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
 
class RoleSeeder extends Seeder
{
    public static function run()
    {
        DB::table('roles')->insert([
            'id' => 100,
            'name' => "Administrateur",
        ]);
        DB::table('roles')->insert([
            'id' => 50,
            'name' => "Visiteur",
        ]);
        DB::table('roles')->insert([
            'id' => 10,
            'name' => "Banni",
        ]);
    }
}