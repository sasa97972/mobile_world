<?php

use Illuminate\Database\Seeder;
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
            $product->title = $faker->word;
            $product->description = $faker->paragraph;
            $product->price = $faker->randomNumber(3);
            $product->category_id = mt_rand(1,5);
            $product->title_image = $faker->word;

            $product->save();

            $product->phones()->attach(mt_rand(1,15));
        }
    }
}
