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

        /*$product = Comment::with('product', 'user')
            ->select('comments.*', 'products.title', 'user.name', 'user.login')
            ->join('products', 'comments.commentable_id', '=', 'products.id')
            ->join('users', 'comments.commented_id', '=', 'users.id')
            ->paginate(10);*/


        //$comments = Comment::get()->toTree();
        /*$product=Product::find(1);
        Auth::user()->comment($product, 'Отличный товар ..');
        Auth::user()->comment($product, 'Да, товар супер .. 2222');
        $product=Product::find(2);
        Auth::user()->comment($product, 'Отличный товар ..');
        Auth::user()->comment($product, 'Да, товар супер .. 2222');*/
        return response(Auth::user());
    }
}
