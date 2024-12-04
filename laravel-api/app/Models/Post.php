<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $fillable = ['title', 'description', 'photo','author_id', 'slug', 'published_at', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // user
    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
