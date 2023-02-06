<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;

class Role extends Model
{
    protected $fillable = [
		'name',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}