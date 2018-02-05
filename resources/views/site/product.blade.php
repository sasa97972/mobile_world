@extends('layouts.app')

@section('content')

    <div class="hero container-fluid">
        <div class="row no-gutters">
            <div class="col-md-12">
                <h1 class="hero__header">{{$product->title}}</h1>
            </div>
        </div>
    </div>

    <div class="container product">
        <div class="row">
            <div class="col-md-6">
                <div class="product__slider">
                    <div class="slider-for">
                        @foreach($product->images as $image)
                            <div class="product__slider-item-container">
                                <img class="product__slider-item" src={{$image->path}} alt={{$product->title}} />
                            </div>
                        @endforeach
                    </div>
                    <div class="slider-nav">
                        @foreach($product->images as $image)
                            <div class="product__slider-item-container">
                                <img class="product__slider-item" src={{$image->path}} alt={{$product->title}} />
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div id="shop-root"></div>

@endsection