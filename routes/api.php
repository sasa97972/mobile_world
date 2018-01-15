<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['namespace' => 'Site\Api'], function () {
    Route::get('categories/search/{word?}', 'CategoriesController@search')->name('api.categories.search');
    Route::get('phones/search/{word?}', 'PhonesController@search')->name('api.phones.search');
    Route::get('products/search/{word?}', 'ProductsController@search')->name('api.products.search');
});

Route::group(['prefix' => 'admin', 'middleware' => 'api.token', 'namespace' => 'Admin\Api'], function () {
    Route::get('/', 'DashboardController@index')->name('admin.info');
    Route::resource('categories', 'CategoriesController');
    Route::resource('phones', 'PhonesController');
    Route::resource('products', 'ProductsController');
});

