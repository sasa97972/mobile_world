<?php

namespace App\Http\Controllers\Site\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{

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
        return(response([
            "data" => Category::where('name', 'like', "%$word%")->orderBy($sortBy, $sort)->paginate($perPage),
            "url" => "api/categories/search"
        ]));
    }

}
