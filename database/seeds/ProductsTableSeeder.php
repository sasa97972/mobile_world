<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 25; $i++) {
            $product = new Product;
            $product->title = ucfirst($faker->word);
            $product->description = $faker->paragraph;
            $product->price = $faker->randomNumber(3);
            $product->category_id = mt_rand(1,8);
            $product->title_image = "products/".mt_rand(1,3).".jpg";

            $product->save();

            $product->phones()->attach(mt_rand(1,15));
        }
    }
}
