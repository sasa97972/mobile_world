<?php

namespace App\Http\Controllers\Admin\Api;

use App\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $images = Image::where("product_id", $request->get('product_id'))->get();

        foreach ($images as &$image) { ///!!!!!!!!!!!!!!!!!
            $image['path'] = Storage::url($image['path']);
        }

        return response($images);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $image = new Image();

        if($request->file('image')) {
            $path = $request->file('image')->store('products', 'public');
            $image->path = $path;
            $image->product_id = $request->product_id;
            $image->save();
        }

        return response()->json($image, 201); //response::HTTP_ACCEPTED
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image $image
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Image $image)
    {
        $image->delete();

        return response()->json(null, 204);
    }
}
