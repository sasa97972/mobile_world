<?php

namespace App\Http\Controllers\Site\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request)
    {
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'id';
        $sort = $request->get('sort') ? $request->get('sort') : 'asc';
        $categories = Category::all();
        foreach ($categories as $category) {
            $category->title_image = Storage::url($category->title_image);
        }
        return response($categories);
    }

    /**
     * @param Request $request
     * @param string $word
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function search($word = "", Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $sortBy = $request->get('sortBy', "created_at");
        $sort = $request->get('sort', "asc");
        return(response(Category::where('name', 'like', "%$word%")->orderBy($sortBy, $sort)->paginate($perPage)));
    }

}
