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

        $product = Product::with('category', 'phones')
            ->select('products.*', 'phones.model', 'categories.name')
            ->leftJoin('products_phones', 'products.id', '=', 'products_phones.product_id')
            ->leftJoin('phones', 'products_phones.phone_id', '=', 'phones.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->groupBy('products.id')
            ->get();


        //$comments = Comment::get()->toTree();
        //$product=Product::find(1);
        //Auth::user()->comment($product, 'Lorem ipsum ..');
        //Auth::user()->comment($product, 'Lorem ipsum .. 2222', 4);
        return response($product);
    }
}
