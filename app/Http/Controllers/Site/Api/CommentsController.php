<?php

namespace App\Http\Controllers\Site\Api;

use App\Comment;
use App\Repositories\CommentRepositories;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentsController extends Controller
{
    protected $comments;

    public function __construct(CommentRepositories $comments)
    {
        $this->comments = $comments;
    }

    public function search($word, Request $request) {
        $perPage = $request->get('perPage');
        $sortBy = $request->get('sortBy');
        $sort = $request->get('sort');
        return response($this->comments->search($word, $perPage, $sortBy, $sort));
    }
}
