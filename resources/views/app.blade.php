<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    @if(request()->segment(1) !== 'backend')
        @if(isset($page['props']['element']) && $page['props']['element']->name_ar && !is_null(request()->segment(2)))
            <title>{{$page['props']['element']->{'name_'.app()->getLocale()}  }}</title>
            <meta property="og:type" content="website"/>
            <meta property="description" content="{{$page['props']['element']->{'description_'.app()->getLocale()} }}"/>
            <meta property="og:locale" content="{{ app()->getLocale() }}"/>
            <meta property="og:site_name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:url" content="{{ request()->getUri().request()->getQueryString() }}"/>
            <meta property="og:title" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:description"
                  content="{{substr($page['props']['settings']->{'description_'.app()->getLocale()},0,50) }}"/>
            <meta property="og:image" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            <meta property="og:image:alt" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:mobile" content="{{$page['props']['settings']->mobile }}"/>
            <meta property="og:whatsapp" content="{{$page['props']['settings']->whatsapp }}"/>
            <meta itemProp="facebook" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta itemProp="fb:app_id" content="658753405351209"/>
            <meta property="facebook:card" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            <meta property="facebook:url" content="{{ request()->getUri().request()->getQueryString() }}"/>
            <meta property="facebook:title" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="facebook:description"
                  content="{{substr($page['props']['settings']->{'description_'.app()->getLocale()},0,30) }}"/>
            <meta property="facebook:image" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            <meta property="facebook:image" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>

            <meta itemProp="twitter" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta property="twitter:card" content="summary"/>
            <meta property="twitter:url" content="{{ request()->getUri().request()->getQueryString() }}"/>
            <meta property="twitter:title" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="twitter:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()} }}"/>
            <meta property="twitter:image" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
        @else
            <title>{{$page['props']['settings']->{'name_'.app()->getLocale()} }} {{ request()->segment(1) ? ' :: '. trans('general.'.Str::plural(request()->segment(1))) : '' }}</title>
            <meta name="name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}">
            <meta name="title" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta name="description" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta name="keywords" content="{{ trans('general.app_keywords') }}"/>
            <meta name="author" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}">
            <meta name="country" content="{{$page['props']['settings']->{'country_'.app()->getLocale()} }}">
            <meta name="mobile" content="{{$page['props']['settings']->mobile }}">
            <meta name="phone" content="{{$page['props']['settings']->phone }}">
            <meta name="whatsapp" content="{{$page['props']['settings']->whatsapp }}">
            <meta name="logo" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}">
            <meta name="email" content="{{$page['props']['settings']->email }}">
            <meta name="address" content="{{$page['props']['settings']->{'address_'.app()->getLocale()} }}">
            <meta name="lang" content="{{ app()->getLocale() }}">
            <meta itemProp="name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta itemProp="description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta itemProp="image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:url" content="{{ env('APP_URL') }}"/>
            <meta property="og:title" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta property="og:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta property="og:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="og:image:alt" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:mobile" content="{{$page['props']['settings']->mobile }}"/>
            <meta property="og:whatsapp" content="{{$page['props']['settings']->whatsapp }}"/>

            <meta itemProp="facebook" content="{{$page['props']['settings']->facebook }}"/>
            <meta itemProp="fb:app_id" content="658753405351209"/>
            <meta property="facebook:card" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="facebook:url" content="{{$page['props']['settings']->facebook }}"/>
            <meta property="facebook:title" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="facebook:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()} }}"/>
            <meta property="facebook:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="facebook:alt" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>

            <meta itemProp="twitter" content="{{$page['props']['settings']->twitter }}"/>
            <meta property="twitter:card" content="summary"/>
            <meta property="twitter:url" content="{{$page['props']['settings']->twitter }}"/>
            <meta property="twitter:title" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="twitter:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()} }}"/>
            <meta property="twitter:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
        @endif
    @endif
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <!-- index.html -->
        <script>
            // before React is loaded
            // if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            //     __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
            // }
        </script>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
</head>
<body>
<div id="lang" style="display: none">{{ app()->getLocale() }}</div>
<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
    @csrf
</form>
@routes
@inertia
</body>
</html>
