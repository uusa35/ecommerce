<?php

use App\Models\Favorite;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companies = User::companies()->get();
        foreach ($companies as $company) {
            factory(Rating::class, 5)->create(['member_id' => $company->id]);
        }
    }
}
