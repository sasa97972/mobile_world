<?php

use Illuminate\Database\Seeder;
use App\Phone;

class PhonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 15; $i++) {
            Phone::create([
                'name' => ucfirst($faker->word),
                'model' => ucfirst($faker->unique()->word),
            ]);
        }
    }
}
