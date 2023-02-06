<?php

namespace App\Models;

enum RoleEnum: int {  
    case ADMINISTRATEUR = 100;
    case INVITE = 50;
    case BANNI = 10;
}