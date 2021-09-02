@php
    try {
        $ssr = Http::post('http://localhost:8080/render', $page)->throw()->json();
    } catch (Exception $e) {
        $ssr = null;
    }
@endphp
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
    @foreach($ssr['head'] ?? [] as $element)
        {!! $element !!}
    @endforeach
</head>
<body>
<div id="lang" style="display: none">{{ session()->get('lang') }}</div>
<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
    @csrf
</form>
@if ($ssr)
    {!! $ssr['body'] !!}
@else
    @routes
    @inertia
@endif
</body>
</html>
