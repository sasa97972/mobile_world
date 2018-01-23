<?php

namespace App\Http\Controllers\Site\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
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
        return(response(User::where('name', 'like', "%$word%")
            ->orWhere('email', 'like', "%$word%")
            ->orderBy($sortBy, $sort)
            ->paginate($perPage)));
    }
}
