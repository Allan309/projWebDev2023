<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Throwable;

class AuthController extends Controller
{

	public function login(Request $request)
	{
		$request->validate([
			'email' => ['required', 'email'],
			'password' => ['required', 'string', 'min:8'],
		]);

		try {
			$user = User::where('email', $request->get("email"))->first();

			if($user == null) {
				return abort(401, "Adresse e-mail ou mot de passe incorrect");
			}
			$hashedPassword = $user->password;
			if(!password_verify($request->get("password"), $hashedPassword)) {
				return abort(401, "Adresse e-mail ou mot de passe incorrect");
			}

			$credentials = request(['email', 'password']);
			if(!$token = auth()->attempt($credentials)){
				return response()->json(['error' => 'Unauthorized'], 401);
			}
			return response()->json($this->createNewToken($token));
		} catch (Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500);
			}
		}
	}

	
	public function register(Request $request) {

		$request->validate([
			'pseudo' => ['required', 'string', 'max:30'],
			'password' => ['required', 'string', 'min:8'],
			'email' => ['required', 'email', 'min:8'],
			'nom' => ['required', 'string', 'max:30'],
			'prenom' => ['required', 'string', 'max:30'],
			'nationalite' => ['required', 'string', 'max:20'],
			'adresse' => ['required', 'string', 'max:60'],
			'tel' => ['required', 'string', 'max:11'],
			'date_naissance' => ['required', 'date'],
		]);

		try {
			$url_img = "storage/avatars/default_avatar.jpg";
			try {
				$user = User::create([
					"pseudo" => $request->pseudo,
					"password" => Hash::make($request->password),
					"email" => $request->email,
					"nom" => $request->nom,
					"prenom" => $request->prenom,
					"nationalite" => $request->nationalite,
					"adresse" => $request->adresse,
					"tel" => $request->tel,
					"date_naissance" => $request->date("date_naissance"),
					"url_image" => $url_img,
					"isAdmin" => false,
				]);
				return response()->json($user);
			} catch (Throwable $th) {
				if (config("app.debug")) {
					throw $th;
				} else {
					return abort(500);
				}
			}
		} catch (Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500);
			}
		}
	}


	public function logout()
	{
		auth()->logout();
		return response()->json(['message' => 'User successfully signed out']);
	}
	
	protected function createNewToken($token)
	{
		return [
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth('api')->factory()->getTTL() * 60,
			'user' => auth()->user()
		];
	}
}
