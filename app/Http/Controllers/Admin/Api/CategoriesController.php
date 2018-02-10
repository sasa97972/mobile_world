<?php

namespace App\Http\Controllers\Admin\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
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
        return response( Category::orderBy($sortBy, $sort)->paginate($perPage));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories|max:255',
            'description' => 'required',
            'alias' => 'required|max:255',
            'image' => 'mimes:jpeg,bmp,png'
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->alias = $request->alias;
        if($request->file('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $category->title_image = $path;
        }
        $category->save();

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $category->title_image = Storage::url($category->title_image);
        return response($category);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $path = $category->title_image;
        if($request->file('image')) {
            if(Storage::exists($category->title_image && $category->title_image !== "public/1.jpg")) {
                Storage::delete($category->title_image);
            }
            $path = $request->file('image')->store('categories', 'public');
        }

        $category->update([
            "name" => $request->name,
            "description" => $request->description,
            "alias" => $request->alias,
            "title_image" => $path
        ]);

        return response($request->json($category, 200));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category $category
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Category $category)
    {
        if(Storage::exists("public/".$category->title_image) && $category->title_image !== "categories/1.jpg") {
            Storage::delete("public/".$category->title_image);
        }
        $category->delete();

        return response()->json(null, 204);
    }
}
