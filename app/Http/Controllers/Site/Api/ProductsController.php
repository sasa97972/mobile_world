<?php

namespace App\Http\Controllers\Site\Api;

use App\Repositories\ProductRepositories;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;

class ProductsController extends Controller
{
    protected $products;

    public function __construct(ProductRepositories $product)
    {
        $this->products = $product;
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
}
