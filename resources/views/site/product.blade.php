@extends('layouts.app')

@section('content')

    <div class="hero container-fluid">
        <div class="row no-gutters">
            <div class="col-md-12">
                <h1 class="hero__header">{{$product->title}}</h1>
            </div>
        </div>
    </div>

    @foreach($product->images as $image)
        <img src={{$image->path}} alt="Test"/>
    @endforeach

    <div id="shop-root"></div>

@endsection