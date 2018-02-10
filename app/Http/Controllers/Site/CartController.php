<?php

namespace App\Http\Controllers\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Support\Facades\Storage;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(!$request->session()->get('cart')) {
            return response([]);
        }
        $products = Product::find($request->session()->get('cart'));
        foreach ($products as $product) {
            $product->title_image = Storage::url($product->title_image);
        }
        return response($products);
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
        //$request->session()->flush();
        if($request->session()->has('cart')) {
            $id = array_search($request->product_id, $request->session()->get('cart'));
            if(!$id && $id !== 0) {
                $request->session()->push('cart', $request->product_id);
            }
        } else {
            $request->session()->put('cart', [$request->product_id]);
        }

        return response($request->session()->get('cart'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $index = array_search($id, $request->session()->get('cart'));
        $cart = $request->session()->get('cart');
        unset($cart[$index]);
        $request->session()->put('cart', $cart);

        return response()->json($index, 200);
    }
}
