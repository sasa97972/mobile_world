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
        //$product = Product::with('category', 'phones')->find($id);
        //$comments = $product->comments();

        $product = Product::with('category')->references('category')->get();

        //$comments = Comment::get()->toTree();
        //$product=Product::find(1);
        //Auth::user()->comment($product, 'Lorem ipsum ..');
        //Auth::user()->comment($product, 'Lorem ipsum .. 2222', 4);
        return response($product);
    }
}
