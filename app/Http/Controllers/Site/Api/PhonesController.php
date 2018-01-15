<?php

namespace App\Http\Controllers\Site\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Phone;

class PhonesController extends Controller
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
        return(response(Phone::where('name', 'like', "%$word%")->orWhere('model', 'like', "%$word%")->orderBy($sortBy, $sort)->paginate($perPage)));
    }
}
