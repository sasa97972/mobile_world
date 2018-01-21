<?php


namespace App\Repositories;

use App\Comment;

class CommentRepositories
{
    /**
     * Поиск комментариев с пагинацией и сортировкой
     * @param $word
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function search($word, $perPage, $sortBy, $sort)
    {
        return Comment::with('product', 'user')
            ->select('comments.*', 'products.title', 'users.email')
            ->join('products', 'comments.commentable_id', '=', 'products.id')
            ->join('users', 'comments.commented_id', '=', 'users.id')
            ->where('users.name', 'like', "%$word%")
            ->orWhere('users.email', 'like', "%$word%")
            ->orWhere('products.title', 'like', "%$word%")
            ->orWhere('comments.comment', 'like', "%$word%")
            ->orderBy($sortBy, $sort)
            ->paginate($perPage);
    }

    /**
     * Получить комментарии с пагинацией и сортировкой
     * @param $perPage
     * @param $sortBy
     * @param $sort
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getWithSort($perPage, $sortBy, $sort)
    {
        return Comment::with('product', 'user')
            ->select('comments.*', 'products.title', 'users.email')
            ->join('products', 'comments.commentable_id', '=', 'products.id')
            ->join('users', 'comments.commented_id', '=', 'users.id')
            ->orderBy($sortBy, $sort)
            ->paginate($perPage);
    }
}

