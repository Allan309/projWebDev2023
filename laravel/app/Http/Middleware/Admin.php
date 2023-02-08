<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RoleEnum;

class Admin
{

	public function handle($request, Closure $next)
	{
		if (auth()->check() && auth()->user()->role->id == RoleEnum::ADMINISTRATEUR->value) {
			return $next($request);
		} else {
			return abort(403, "T PO ADMIN (". auth()->user()->role->id ." | ". RoleEnum::ADMINISTRATEUR->value .")");
		}
	}
}
