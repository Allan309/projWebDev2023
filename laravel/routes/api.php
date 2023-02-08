<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GestAdminController;

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
	Route::POST("", [AdController::class, "get"]);
	Route::POST("byUser/{userId}", [AdController::class, "get"])->where('userId', '[0-9]+');
	Route::GET("byId/{ad}", [AdController::class, "getById"])->where('ad', '[0-9]+');
	Route::group(['middleware' => 'jwt.auth'], function () {
		Route::PUT("insertOrUpdate", [AdController::class, "insertOrUpdate"]);
		Route::post("addImage/{ad}", [AdController::class, "addImage"])->where('ad', '[0-9]+');
		Route::DELETE("{ad}", [AdController::class, "delete"])->where('ad', '[0-9]+');
	});
});

Route::group(['prefix' => "user"], function () {
	Route::group(['middleware' => 'jwt.auth'], function () {
		Route::PUT("", [UserController::class, "update"]);
		Route::post("addImage", [UserController::class, "addImage"]);
		Route::DELETE("", [UserController::class, "delete"]);
	});
});

//////////////
Route::group(['prefix' => "gestAdmin"], function () {
	Route::group(['middleware' => ['jwt.auth', "admin"]], function () {
		Route::get("users", [GestAdminController::class, "getUsers"]);
		Route::put("setRole/{user_id}", [GestAdminController::class, "setRole"])->where('user_id', '[0-9]+');
		Route::DELETE("{user_id}", [GestAdminController::class, "deleteUser"])->where('user_id', '[0-9]+');
	});
});
