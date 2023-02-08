<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Banned
{
	public function handle($request, Closure $next)
	{
		if (Auth::check() && Auth::user()->role()->id == RoleEnum) {
			$time = ShopCurrency::select("updated_at")->limit(1)->orderBy('updated_at')->first()->updated_at;
			if ($time < time() - 60 * 60 * 2) {
				if (config("app.env") != "local")
					AlertAddError("Currencies last updated at " . date('M d Y H:i', $time));
			}
			return $next($request);
		} else {
			return abort(403);
		}
	}
}
