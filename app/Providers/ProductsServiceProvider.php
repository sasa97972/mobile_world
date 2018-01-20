<?php

namespace App\Providers;

use App\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class ProductsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Product::deleting(function ($product) {
            $path = $product->title_image;
            if(Storage::exists($path)) {
                Storage::delete($path);
            }

            $images = $product->images;
            if(count($images)) {
                foreach ($images as $image) {
                    if(Storage::exists("public/".$image->path)) {
                        Storage::delete("public/".$image->path);
                    }
                }
            }

            return true;
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
