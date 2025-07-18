<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class RecipesModel extends Model
{
    protected $table = 'recipes';
    protected $fillable = ['title', 'description', 'ingredients', 'instructions', 'image'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        // Devuelve "/storage/images/abcd1234.jpg"
        return Storage::url($this->getAttribute('image'));
    }
}