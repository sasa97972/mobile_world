<?php


namespace App\Repositories;

use App\Product;

class ProductRepositories
{
    /**
     * Поиск товара с пагинацией и сортировкой, поиск по (названию товара, модели телефона и категории)
     * @param $word
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function search($word, $perPage, $sortBy, $sort)
    {
        return Product::with('category', 'phones')
            ->leftJoin('products_phones', 'products.id', '=', 'products_phones.product_id')
            ->leftJoin('phones', 'products_phones.phone_id', '=', 'phones.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'phones.model', 'categories.name')
            ->where('title', 'like', "%$word%")
            ->orWhere('phones.model', 'like', "%$word%")
            ->orWhere('categories.name', 'like', "%$word%")
            ->orderBy($sortBy, $sort)
            ->paginate($perPage);
    }

    /**
     * Получить товары с пагинацией и сортировкой
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getWithSort($perPage, $sortBy, $sort)
    {
        return Product::with('category', 'phones')
            ->select('products.*', 'phones.model', 'categories.name')
            ->leftJoin('products_phones', 'products.id', '=', 'products_phones.product_id')
            ->leftJoin('phones', 'products_phones.phone_id', '=', 'phones.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->orderBy($sortBy, $sort)
            ->groupBy('products.id')
            ->paginate($perPage);
    }
}