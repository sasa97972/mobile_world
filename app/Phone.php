<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = [
        "name",
        "model"
    ];

    public function products()
    {
        return $this->belongsToMany('App\Product', 'products_phones');
    }
}
