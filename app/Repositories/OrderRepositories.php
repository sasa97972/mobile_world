<?php


namespace App\Repositories;

use App\Order;

class OrderRepositories
{
    /**
     * Поиск заказа с пагинацией и сортировкой, поиск по (названию товара, модели телефона и категории)
     * @param $word
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function search($word, $perPage, $sortBy, $sort)
    {
        return Order::with('category', 'phones')
            ->select('products.*', 'phones.model', 'phones.name', 'categories.name')
            ->leftJoin('products_phones', 'products.id', '=', 'products_phones.product_id')
            ->leftJoin('phones', 'products_phones.phone_id', '=', 'phones.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('title', 'like', "%$word%")
            ->orWhere('phones.model', 'like', "%$word%")
            ->orWhere('phones.name', 'like', "%$word%")
            ->orWhere('categories.name', 'like', "%$word%")
            ->orderBy($sortBy, $sort)
            ->paginate($perPage);
    }

    /**
     * Получить заказы с пагинацией и сортировкой
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getWithSort($perPage, $sortBy, $sort)
    {
        return Order::with('user', 'positions.product')
            ->select('orders.*', 'users.email')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->orderBy($sortBy, $sort)
            ->paginate($perPage);
    }
}