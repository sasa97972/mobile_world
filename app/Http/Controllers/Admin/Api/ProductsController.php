<?php

namespace App\Http\Controllers\Admin\Api;

use App\Category;
use App\Phone;
use App\Product;
use App\Repositories\ProductRepositories;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    protected $products;

    public function __construct(ProductRepositories $product)
    {
        $this->products = $product;
    }

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

        return response($this->products->getWithSort($perPage, $sortBy, $sort));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response([
            "categories" => Category::orderBy('name')->get(),
            "phones" => Phone::orderBy('name')->get()
        ]) ;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();

        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        if($request->file('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->title_image = $path;
        }
        $product->save();

        if($request->phones_id) {
            $product->phones()->attach(explode(",", $request->phones_id));
        }

        return response($product->id);
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
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = Product::with('category', 'phones')->findOrFail($id);
        if($product->title_image) {
            $product->title_image = Storage::url($product->title_image);
        }
        return response([
            "categories" => Category::orderBy('name')->get(),
            "phones" => Phone::orderBy('name')->get(),
            "product" => $product
        ]) ;
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
        $path = $product->title_image;
        if($request->file('image')) {
            if(Storage::exists("public/".$product->title_image)) {
                Storage::delete("public/".$product->title_image);
            }
            $path = $request->file('image')->store('products', 'public');
        }

        $product->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'title_image' => $path,
        ]);

        $product->phones()->sync(explode(",", $request->phones_id));

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product $product
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
