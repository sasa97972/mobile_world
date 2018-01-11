<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Commentable;

class Product extends Model
{
    use Commentable;

    protected $fillable = [
      'title',
      'description',
      'category_id',
      'price'
    ];

    protected $mustBeApproved = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function phones()
    {
        return $this->belongsToMany('App\Phone');
    }
}
