<?php

namespace App\Http\Controllers\Site\Api;

use App\Repositories\ProductRepositories;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;


class ProductsController extends Controller
{
    protected $products;

    public function __construct(ProductRepositories $product)
    {
        $this->products = $product;
    }

    public function index(Request $request)
    {
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'id';
        $sort = $request->get('sort') ? $request->get('sort') : 'asc';
        $products = $this->products->getAllWithSort($sortBy, $sort);
        foreach ($products as $product) {
            $product->title_image = Storage::url($product->title_image);
        }
        return response($products);
    }

    /**
     * @param Request $request
     * @param string $word
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function search($word = "", Request $request)
    {
        $perPage = $request->get('perPage');
        $sortBy = $request->get('sortBy');
        $sort = $request->get('sort');
        return response($this->products->search($word, $perPage, $sortBy, $sort));
    }

    public function show($id)
    {
        $product = Product::with('category', 'phones', 'images')->find($id); //or fail
        $product->title_image = Storage::url($product->title_image);
        foreach($product->images as $image) {
            $image->path = Storage::url($image->path);
        }
        return response(["product" => $product, "comments" => $product->commentsTree()]);
    }
}
