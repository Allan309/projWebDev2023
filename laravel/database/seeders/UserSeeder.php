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
			'pseudo' => 'Allan309',
			'password' => Hash::make("azerty123"),
			'email' => 'allan309@mail.com',
			'nom' => 'Allan',
			'prenom' => '309',
			'nationalite' => 'Belge',
			'adresse' => 'Rue 4',
			'tel' => '0412345678',
			'date_naissance' => Carbon::createFromFormat("d/m/Y", "04/06/1998"),
			'url_image' => 'storage/avatars/default_avatar.jpg',
			'role_id' => RoleEnum::ADMINISTRATEUR
		]);

		DB::table('user')->insert([
			'pseudo' => 'admin',
			'password' => Hash::make("admin"),
			'email' => 'admin@mail.com',
			'nom' => 'admin',
			'prenom' => 'admin',
			'nationalite' => 'Belge',
			'adresse' => 'Rue des admins',
			'tel' => '0412345678',
			'date_naissance' => Carbon::createFromFormat("d/m/Y", "04/06/1990"),
			'url_image' => 'storage/avatars/default_avatar.jpg',
			'role_id' => RoleEnum::ADMINISTRATEUR
		]);
    }
}