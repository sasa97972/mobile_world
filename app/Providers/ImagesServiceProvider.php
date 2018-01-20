<?php

namespace App\Providers;

use App\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class ImagesServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Image::deleting(function ($image) {
            if(Storage::exists("public/".$image->path)) {
                Storage::delete("public/".$image->path);
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
