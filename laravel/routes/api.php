<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['excluded_middleware' => 'jwt.auth'], function () {
	Route::POST("/login", [AuthController::class, "login"]);
	Route::POST("/register", [AuthController::class, "register"]);
});

Route::group(['middleware' => 'jwt.auth'], function () {
	Route::GET("/logout", [AuthController::class, "logout"]);
});

Route::group(['prefix' => "ad"], function () {
	Route::GET("", [AdController::class, "get"]);
	Route::GET("{ad}", [AdController::class, "getById"]);
	Route::group(['middleware' => 'jwt.auth'], function () {
		Route::GET("byUser", [AdController::class, "get"]);
		Route::PUT("insertOrUpdate", [AdController::class, "insertOrUpdate"]);
		Route::post("addImage/{ad}", [AdController::class, "addImage"]);
		Route::DELETE("{ad}", [AdController::class, "delete"]);
	});
});
