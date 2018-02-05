<?php

namespace App\Http\Controllers\Site\Api;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\Phone;

class FilterController extends Controller
{
    public function index()
    {
        return response([
            "categories" => Category::all(),
            "phones" => Phone::all(),
            "price" => [
                "max" => Product::max('price'),
                "min" => Product::min('price'),
            ]
        ]);
    }
}
