<?php

namespace App\Http\Controllers\Admin\Api;

use App\Phone;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PhonesController extends Controller
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
        return response( Phone::orderBy($sortBy, $sort)->paginate($perPage));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $phone = Phone::create($request->all());

        return response()->json($phone, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function show(Phone $phone)
    {
        return response($phone);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Phone $phone)
    {
        $phone->update($request->all());

        return response()->json($phone, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Phone $phone
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Phone $phone)
    {
        $phone->delete();

        return response()->json(null, 204);
    }
}
