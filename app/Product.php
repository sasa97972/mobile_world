<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Commentable;

class Product extends Model
{
    use Commentable;

    protected $mustBeApproved = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
