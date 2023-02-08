<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Laravel\Passport\HasApiTokens;
use App\Models\Ad;
use App\Models\Role;
use App\Models\Comment;

class User extends Authenticatable implements JWTSubject
{
	protected $table = "user";
    protected $with = ['role'];
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'pseudo',
        'password',
        'email',
        'nom',
        'prenom',
        'nationalite',
        'adresse',
        'tel',
        'date_naissance',
        'url_image',
        'role_id',
        'last_login'
    ];

    protected $hidden = [
        'password',
    ];
    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function ads()
    {
        return $this->hasMany(Ad::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
