<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Throwable;
use Carbon\Carbon;

class GestAdminController extends Controller
{
	public function getUsers() {
		$users = User::with("role")->select("url_image", "pseudo", "id", "role_id", "last_login")->get();
		return response()->json($users);
	}

	public function setRole(Request $request, $user_id) {
		$user = User::find($user_id);
		if($user == null) {
			return abort("Utilisateur inconnu", 500);
		}
		$request->validate([
			'role_id' => ['required', 'integer', 'min:0'],
		]);
		$role = Role::find($request->get("role_id"));
		if($role == null) {
			return abort("Role inconnu", 500);
		}

		try{
			$user->update([
				"role_id" => $request->get("role_id")
			]);

			return response()->json($user);
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de modifier les données de l'utilisateur");
			}
		}
	}

	public function deleteUser(Request $request, $user_id) {
		$user = User::find($user_id);
		if($user == null) {
			return abort("Utilisateur inconnu", 500);
		}
		try {
			$isDeleted = $user->delete();
			return response()->json($isDeleted);
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de supprimer l'utilisateur");
			}
		}
	}
}
