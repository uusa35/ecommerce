<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Image;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Course::factory(app()->isLocal() ? 20 : 5)->create()->each(function ($p) {
            $p->slides()->saveMany(Slide::all()->random(2));
            $p->categories()->saveMany(Category::all()->random(2));
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->images()->saveMany(Image::f, 3)->create());
        });
    }
}
