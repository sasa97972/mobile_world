<?php

namespace App\Http\Controllers\Admin;

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
        return view('admin/index');
    }

    public function info()
    {
        return response(
            [
                "info" => [
                    [
                        "name" => "Продукты",
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
