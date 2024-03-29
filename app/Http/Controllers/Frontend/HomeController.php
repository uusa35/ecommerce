<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookExtraLightResource;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\CourseExtraLightResource;
use App\Http\Resources\ProductExtraLightResource;
use App\Http\Resources\SettingResource;
use App\Http\Resources\SlideExtraLightResource;
use App\Http\Resources\TranslationResource;
use App\Http\Resources\UserExtraLightResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Newsletter;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Translation;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    use HomeTrait;

    public function index()
    {
        switch (env('APP_NAME')) {
            case 'grc':
                return $this->getGrc();
            case 'istores':
                return $this->getIstores();
            default:
                return $this->getEcommerce();
        }
    }

    public function changeLang($lang)
    {
        if (!in_array($lang, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($lang);
        session()->put('lang', $lang);
        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * **/
    public function postNewsLetter(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters',
        ]);
        if (Newsletter::create($request->all())) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function corporate()
    {
        $slides = SlideExtraLightResource::collection(Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order', 'asc');
        }])->first()->slides);
        return inertia('Frontend/Home/HomeCorporate', compact('slides'));
    }
}
