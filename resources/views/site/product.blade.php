@extends('layouts.app')

@section('content')

    <div class="hero container-fluid">
        <div class="row no-gutters">
            <div class="col-md-12">
                <h1 class="hero__header">{{$product->category->name}}</h1>
            </div>
        </div>
    </div>

    <div class="container product">
        <div class="row">
            <div class="col-md-6">
                <div class="product__slider">
                    <div class="slider-for">
                        <div class="product__slider-item-container">
                            <a href={{$product->title_image}} class="product__slider-item_popup">
                                <img class="product__slider-item" src={{$product->title_image}} alt={{$product->title}} />
                            </a>
                        </div>
                        @foreach($product->images as $image)
                            <div class="product__slider-item-container">
                                <a href={{$image->path}} class="product__slider-item_popup">
                                    <img class="product__slider-item" src={{$image->path}} alt={{$product->title}} />
                                </a>
                            </div>
                        @endforeach
                    </div>
                    <div class="slider-nav" id="slider-nav">
                        <div class="product__slider-item-container">
                            <img class="product__slider-item" src={{$product->title_image}} alt={{$product->title}} />
                        </div>
                        @foreach($product->images as $image)
                            <div class="product__slider-item-container">
                                <img class="product__slider-item" src={{$image->path}} alt={{$product->title}} />
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div id="shop-root"></div>
            </div>
        </div>
    </div>
@endsection