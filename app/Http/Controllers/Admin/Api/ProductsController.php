<?php

namespace App\Http\Controllers\Admin\Api;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage');
        $sortBy = $request->get('sortBy');
        $sort = $request->get('sort');

        if($request->get('with') === 'category') {
            return response( Product::with('category', 'phones')
                ->join('categories', 'products.category_id', '=', 'categories.id')
                ->select('products.*', 'categories.name')
                ->orderBy('categories.'.$sortBy, $sort)
                ->paginate($perPage));
        } elseif ($request->get('with') === 'phones') {
            return response( Product::with('category', 'phones')
                ->join('products_phones', 'products.id', '=', 'products_phones.product_id')
                ->join('phones', 'products_phones.phone_id', '=', 'phones.id')
                ->select('products.*', 'phones.model')
                ->orderBy('phones.'.$sortBy, $sort)
                ->paginate($perPage));
        }

        return response( Product::with('category', 'phones')->orderBy($sortBy, $sort)->paginate($perPage));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
