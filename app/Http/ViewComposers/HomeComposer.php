<?php

namespace App\Http\ViewComposers;

use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;
use App\Category;

class HomeComposer
{

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $categories = Category::all();
        foreach ($categories as $category) {
            $category->title_image = Storage::url($category->title_image);
        }
        $view->with('categories', $categories);
    }
}