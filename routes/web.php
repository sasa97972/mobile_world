<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/shop', 'Site\ShopController@index')->name('shop');
Route::get('product/{product}', 'ProductController@show');
Route::resource('products', 'Site\ProductsController');

Route::group(['prefix' => 'admin', 'middleware' => 'admin', 'namespace' => 'Admin'], function () {
    Route::get('/', 'DashboardController@index')->name('admin');
    Route::get('/{category?}/{subcategory?}/{id?}', 'DashboardController@index');
});

