<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Throwable;
use Carbon\Carbon;

class UserController extends Controller
{

	public function update(Request $request) {
		$request->validate([
			'pseudo' => ['required', 'string', 'max:30'],
			'password' => ['nullable', 'string', 'min:8'],
			'email' => ['required', 'email', 'min:8'],
			'nom' => ['required', 'string', 'max:30'],
			'prenom' => ['required', 'string', 'max:30'],
			'nationalite' => ['required', 'string', 'max:20'],
			'adresse' => ['required', 'string', 'max:60'],
			'tel' => ['required', 'string', 'max:11'],
			'date_naissance' => ['required', 'string', 'regex:/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/'],
		]);

		try{
			$valueToChange = [
				"pseudo" => $request->get("pseudo"),
				"email" => $request->get("email"),
				"nom" => $request->get("nom"),
				"prenom" => $request->get("prenom"),
				"nationalite" => $request->get("nationalite"),
				"adresse" => $request->get("adresse"),
				"tel" => $request->get("tel"),
				"date_naissance" => Carbon::createFromFormat("d/m/Y", $request->string("date_naissance")),
			];
			if(!empty($request->get("password"))) {
				$valueToChange["password"] = Hash::make($request->get("password"));
			}
			auth()->user()->update($valueToChange);

			return response()->json(auth()->user());
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de modifier vos données");
			}
		}
	}

	public function addImage(Request $request) {
		$request->validate([
			"image" => ["required", "image"],
		]);

		try {
			$image = $request->file('image');
			$ext = $image->extension();
			if (!$image->move(storage_path("app/public/avatars"), "avatars_" . auth()->user()->id . "." . $ext)) {
				abort(500, "Impossible d'ajouter l'image");
			} else {
				auth()->user()->update([
					"url_image" => "storage/avatars/avatars_". auth()->user()->id .".".$ext,
				]);
			}

			return response()->json(auth()->user());
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de modifier vos données");
			}
		}
	}

	public function delete() {
		try {
			$isDeleted = auth()->user()->delete();
			auth()->logout();
			return response()->json($isDeleted);
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de supprimer vos données");
			}
		}
	}
}
