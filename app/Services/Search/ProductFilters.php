<?php

namespace App\Services\Search;

use App\Http\Resources\CategoryLightResource;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Http\Request;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 2/7/17
 * Time: 8:40 AM
 */
class ProductFilters extends QueryFilters
{
    public $category;

    public function __construct(Request $request, Category $category)
    {
        parent::__construct($request);
        $this->category = $category;
    }

    public function search($search)
    {
        return $this->builder
            ->where('name_ar', 'like', "%{$search}%")
            ->orWhere('name_en', 'like', "%{$search}%")
            ->orWhere('description_ar', 'like', "%{$search}%")
            ->orWhere('description_en', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
//            ->orWhere('notes_ar', 'like', "%{$search}%")
//            ->orWhere('notes_en', 'like', "%{$search}%");
    }

    public function name($search)
    {
        return $this->builder
            ->where('name_ar', 'like', "%{$search}%")
            ->orWhere('name_en', 'like', "%{$search}%")
            ->orWhere('description_ar', 'like', "%{$search}%")
            ->orWhere('description_en', 'like', "%{$search}%");
    }

    public function product_category_id()
    {
        return $this->builder->whereHas('categories', function ($q) {
            return $q->where('category_id', request()->product_category_id);
        });
    }

    public function on_home()
    {
        return $this->builder->where('on_home', request()->on_home);
    }

    public function on_new()
    {
        return $this->builder->where('on_new', request()->on_new);
    }

    public function is_hot_deal()
    {
        return $this->builder->where('is_hot_deal', request()->is_hot_deal);
    }

    public function exclusive()
    {
        return $this->builder->where('is_hot_deal', request()->exclusive);
    }

    public function is_available()
    {
        return $this->builder->where('is_available', request()->is_available);
    }

    public function on_sale()
    {
        return $this->builder->where('on_sale', request()->on_sale);
    }

    public function free()
    {
        return $this->builder->where('free', request()->free);
    }

    public function downlaod()
    {
        return $this->builder->where('downlaod', request()->downlaod);
    }


}
