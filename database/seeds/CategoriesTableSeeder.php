<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            Category::create([
                'name' => ucfirst($faker->unique()->word),
                'alias' => $faker->word,
                'description' => $faker->paragraph,
                'title_image' => "categories/1.jpg",
            ]);
        }
    }
}
