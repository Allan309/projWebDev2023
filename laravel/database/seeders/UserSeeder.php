<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\RoleEnum;

class UserSeeder extends Seeder
{
    public function run()
    {
		DB::table('user')->insert([
			'pseudo' => 'admin',
			'password' => Hash::make("adminadmin"),
			'email' => 'admin@mail.com',
			'nom' => 'adminadmin',
			'prenom' => 'admin',
			'nationalite' => 'Belge',
			'adresse' => 'Rue des admins',
			'tel' => '0412345678',
			'date_naissance' => Carbon::createFromFormat("d/m/Y", "04/06/1990"),
			'url_image' => 'storage/avatars/default_avatar.jpg',
			'role_id' => RoleEnum::ADMINISTRATEUR,
			'last_login' => Carbon::now(),
		]);
    }
}