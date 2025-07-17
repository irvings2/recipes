<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipesModel extends Model
{
    protected $table = 'recipes';
    protected $fillable = ['title', 'description', 'ingredients', 'instructions', 'image'];
}