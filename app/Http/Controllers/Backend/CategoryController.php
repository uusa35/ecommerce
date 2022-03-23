<?php

namespace App\Http\Controllers\Backend;

use App\Exports\CategoriesExport;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryExtraLightResource;
use App\Imports\CategoriesImport;
use App\Imports\UsersImport;
use App\Models\Category;
use App\Models\Country;
use App\Models\Role;
use App\Models\User;
use App\Services\Search\CategoryFilters;
use App\Services\Search\UserFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CategoryController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new CategoryCollection(Category::where(['parent_id' => null])->with('children.children')->orderBy('id', 'desc')->paginate(SELF::TAKE_LESS));
        return inertia('Backend/Category/CategoryIndex', compact('elements'));
    }

    public function search(CategoryFilters $filters)
    {
        $this->authorize('search', 'category');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Category::filters($filters)->orderBy('id', 'desc')->paginate(Self::TAKE_MIN);
        return inertia('Backend/Category/CategoryIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $elements = CategoryExtraLightResource::collection(Category::where(['is_parent' => true, 'parent_id' => 0])->get());
        return inertia('Backend/Category/CategoryCreate', compact('elements'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'caption_ar' => 'required|max:1000',
            'caption_en' => 'required|max:1000',
            'order' => 'integer'
        ]);
        $element = Category::create($request->except('image', 'image_rectangle', 'file'));
        if ($element) {
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1440', '1080'], true, true) : null;
            $request->hasFile('image_rectangle') ? $this->saveMimes($element, $request, ['image_rectangle'], ['1440', '1080'], false) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            $request->hasFile('image_rectangle') ? $this->saveMimes($element, $request, ['image_rectangle'], ['1440', '1080'], false) : null;
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        $elements = CategoryExtraLightResource::collection(Category::where(['is_parent' => true, 'parent_id' => 0])->get());
        return inertia('Backend/Category/CategoryEdit', compact('category', 'elements'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        request()->validate([
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'caption_ar' => 'required|max:1000',
            'caption_en' => 'required|max:1000',
            'order' => 'integer'
        ]);
        if ($category->update($request->except('image', 'image_rectangle', 'file'))) {
            $request->hasFile('image') ? $this->saveMimes($category, $request, ['image'], ['1440', '1080'], true, true) : null;
            $request->hasFile('image_rectangle') ? $this->saveMimes($category, $request, ['image_rectangle'], ['1440', '1080'], false) : null;
            $request->hasFile('file') ? $this->savePath($category, $request, 'file') : null;
            $request->hasFile('image_rectangle') ? $this->saveMimes($category, $request, ['image_rectangle'], ['1440', '1080'], false) : null;
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if ($category->delete()) {
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function export(CategoryFilters $filters)
    {
        $this->authorize('index', 'category');
        $elements = Category::filters($filters)->orderBy('id', 'desc');
        return Excel::download(new CategoriesExport($elements), 'elements.' . request()->fileType);
    }

    public function getImport(Request $request)
    {
        $request->validate(['model' => 'required']);
        $model = request()->model;
        return Inertia::render('Backend/Import/ImportCategoryCreate', compact('model'));
    }

    public function postImport(Request $request)
    {
        $request->validate([
            'model' => 'required',
            "file" => "required|mimes:xlsx|max:990000"
        ]);
        $path = request()->file('file')->store('public/uploads/files');
        $result = Excel::import(new CategoriesImport(), $path);
        return redirect()->route('backend.' . request()->model . '.index')->with('success', trans('general.process_success'));
    }
}
