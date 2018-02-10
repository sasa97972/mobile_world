<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function show($id)
    {
        //$product = Product::with('category', 'phones')->find($id);
        //$comments = $product->comments();

        /*$product = Comment::with('product', 'user')
            ->select('comments.*', 'products.title', 'user.name', 'user.login')
            ->join('products', 'comments.commentable_id', '=', 'products.id')
            ->join('users', 'comments.commented_id', '=', 'users.id')
            ->paginate(10);*/


        //$comments = Comment::get()->toTree();
        /*$product=Product::find(1);
        Auth::user()->comment($product, 'Отличный товар ..');
        Auth::user()->comment($product, 'Да, товар супер .. 2222', 1);
        Auth::user()->comment($product, 'Согласен ..');
        Auth::user()->comment($product, 'Да, товар супер .. 2222', 3);*/


        //findOrFail
        $product = Product::with('category', 'phones', 'images')->find($id);
        $product->title_image = Storage::url($product->title_image);
        foreach($product->images as $image) {
            $image->path = Storage::url($image->path);
        }
        return view("site.product", ["product" => $product]);
    }
}
