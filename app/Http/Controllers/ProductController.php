<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Comment;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function show($id)
    {
        //$product = Product::with(['comments' => function($q) {
            //$q->where('parent_id', null)->with('replies')->paginate(3);
        //}, 'category'])->find($id);
        $count=Product::all()->count();
        //Auth::user()->comment($product, 'Lorem ipsum ..');
        //Auth::user()->comment($product, 'Lorem ipsum .. 2222', 6);
        return response(["products" => 1]);
    }
}
