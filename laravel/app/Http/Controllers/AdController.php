<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Throwable;

class AdController extends Controller
{
	public function get() {
		$ads = Ad::get();
		return response()->json($ads);
	}

	public function getById(Ad $ad) {
		$ad->user();
		$ad->comments();
		return response()->json($ad);
	}

	public function insertOrUpdate(Request $request) {
		$request->validate([
			'id '=> ['nullable', 'integer', 'min:0'],
			'description' => ['required', 'string'],
			'puissance' => ['required', 'integer'],
			'annee' => ['required', 'integer', 'min:0'],
			'marque' => ['required', 'string', 'max:30'],
			'modele' => ['required', 'string', 'max:50'],
			'prix' => ['required', 'integer', 'min:0'],
			'setDeflautImage' => ["required", "boolean"]
		]);

		try{
			$url_img = "storage/ads/default_ad.png";
			$valueToChange = [
				"description" => $request->get("description"),
				"puissance" => $request->get("puissance"),
				"annee" => $request->get("annee"),
				"marque" => $request->get("marque"),
				"modele" => $request->get("modele"),
				"prix" => $request->get("prix"),
				"user_id" => auth()->user()->id,
			];
			if($request->get("setDeflautImage")) {
				$valueToChange["url_image"] = $url_img;
			}
			$ad = Ad::updateOrCreate([
				"id" => $request->get("id")
			], $valueToChange);

			return response()->json($ad);
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible d'ajouter/modifier l'annonce");
			}
		}
	}

	public function addImage(Request $request, Ad $ad) {
		if($ad == null) {
			return abort(500);
		}
		$request->validate([
			"image" => ["required", "image"],
		]);

		try {
			$image = $request->file('image');
			$ext = $image->extension();
			if (!$image->move(storage_path("app/public/ads"), "ad_" . $ad->id . "." . $ext)) {
				abort(500, "Impossible d'ajouter l'image");
			} else {
				$ad->update([
					"url_image" => "storage/ads/ad_". $ad->id .".jpg",
				]);
			}

			return response()->json($ad);
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible d'ajouter l'image");
			}
		}
	}

	public function delete(Ad $ad) {
		try {
			return response()->json($ad->delete());
		} catch (\Throwable $th) {
			if (config("app.debug")) {
				throw $th;
			} else {
				return abort(500, "Impossible de supprimer l'annonce");
			}
		}
	}
}
