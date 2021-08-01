<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\ProductAttribute;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductAttributeController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ProductAttribute::class, 'attribute');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate(
            ['product_id' => 'required|integer|exists:products,id']);
        $elements = ProductAttribute::where(['product_id' => request()->product_id])->with('color', 'size', 'product')->orderBy('id','desc')->paginate(SELF::TAKE_LEAST)->appends(request()->except(['page', '_token']));
        return inertia('ProductAttribute/ProductAttributeIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $validate = validator(request()->all(),
            ['product_id' => 'required|integer|exists:products,id']);
        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors()->first());
        }
        $colors = Color::active()->get();
        $sizes = Size::active()->get();
//        if (auth()->user()->isAdminOrAbove) {
        $elements = ProductAttribute::whereId(request()->product_id)->with('color', 'size')->paginate(SELF::TAKE_LEAST)->appends(request()->except(['page', '_token']));
//        } else {
//            $elements = ProductAttribute::whereId(['product_id' => request()->product_id, 'user_id' => auth()->id()])->with('color','size')->paginate(SELF::TAKE_LEAST);
//        }
//        if ($elements) {
        return inertia('ProductAttribute/ProductAttributeCreate', compact('elements', 'colors', 'sizes'));
//        }
//        return redirect()->route('backend.product.search')->withErrors(trans('general.no_elements'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'color_id' => 'required|exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'qty' => 'required|integer|min:1',
            'price' => 'required|min:0.5|max:999',
        ]);
        $productAttribute = ProductAttribute::where([
            ['product_id', '=', $request->product_id],
            ['color_id', '=', $request->color_id],
            ['size_id', '=', $request->size_id],
        ])->first();
        if (!is_null($productAttribute) && $productAttribute->id) {
            return redirect()->back()->withErrors(trans('general.progress_failure'));
        } else {
            $element = ProductAttribute::create($request->request->all());
            return redirect()->route('backend.attribute.index', ['product_id' => $request->product_id])->with('success', trans('general.progress_success'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function show(ProductAttribute $attribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductAttribute $attribute)
    {
        $colors = Color::active()->get();
        $sizes = Size::active()->get();
        return inertia('ProductAttribute/ProductAttributeEdit', compact('attribute','colors','sizes'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductAttribute $attribute)
    {
        if($attribute->update($request->all())) {
            return redirect()->route('backend.attribute.index', ['product_id' => $attribute->product_id])->with('success', __('general.progress_success'));
        }
        return redirect()->back()->withErrors(__('general.progress_failure'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductAttribute $attribute)
    {
        $productId = $attribute->product_id;
        if ($attribute->delete()) {
            return redirect()->route('backend.attribute.index', ['product_id' => $productId]);
        }
        return redirect()->back()->withErrors(trans('general.process_failure'));
    }
}
