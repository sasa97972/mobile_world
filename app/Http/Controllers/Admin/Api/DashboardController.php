<?php

namespace App\Http\Controllers\Admin\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Product;
use App\Order;
use App\User;
use App\Comment;

class DashboardController extends Controller
{
    public function index()
    {
        return response(
            [
                "info" => [
                    [
                        "name" => "Продукты", //response messages to trans ()
                        "count" => Product::all()->count()
                    ],
                    [
                        "name" => "Пользователи",
                        "count" => User::all()->count()
                    ],
                    [
                        "name" => "Заказы",
                        "count" => Order::all()->count()
                    ],
                ],
                "comments" => Comment::with(['user', 'product'])->orderBy('created_at', 'desc')->limit(5)->get()
            ]
        );
    }
}
