@extends('layouts.app')

@section('content')

@include('site._partials.slider-fluid')

<section class="points container" id="points">
    <div class="points__row row">
        <div class="points__item col-md-4 col-sm-12">
            <div class="points__icon"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
            <h2 class="points__header">Absolute service</h2>
            <p class="points__text">No more hassle for you. From the wedding rings or dresses to the last bite of wedding cake, we got it.</p>
        </div>
        <div class="points__item col-md-4 col-sm-12">
            <div class="points__icon"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
            <h2 class="points__header">Best people</h2>
            <p class="points__text">Top-notch photographers and operators assembled in a dream team, ready to make your wedding as great as you imagined it at 9.</p>
        </div>
        <div class="points__item col-md-4 col-sm-12">
            <div class="points__icon"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
            <h2 class="points__header">Live & Breathe</h2>
            <p class="points__text">Discover amazing scenic locations for a ceremony, honeymoon or photo session.</p>
        </div>
    </div>
</section>

<section class="services container">
    <div class="row">
        <div class="col-md-12">
            <h2 class="services__hero-header hero-header">Категории товаров</h2>
        </div>
    </div>
    <div class="row services__row">
        @forelse($categories as $category)
        <div class="services__service col-md-4 col-sm-6 col-xs-12">
            <a href={{url("/shop/".$category->alias)}} class="services__link">
                <div class="services__image">
                    <img src={{$category->title_image}} class="services__image-image" alt="Alghero">
                    <p class="services__text">{{$category->description}}</p>
                </div>
                <h2 class="services__header">{{$category->name}}</h2>
            </a>
        </div>
        @empty
        <h1>Здесь ещё нет категорий</h1>
        @endforelse
    </div>
</section>

<section class="events container-fluid" id="events">
    <div class="container">
        <div class="events__row row">
            <div class="col-md-12 events__content">
                <h2 class="events__header">Большие скидки</h2>
                <p class="events__text">Your ideas and our expertise create a stunning combination to remember. We will roll as you do: minimalistic or lush, classic or extravagant, elegant or chic, we will make sure that you get the best.
                    <br>Feel the satisfaction when everything goes as planned.</p>
                <a href="{{url("/shop")}}" class="events__button">Посмотреть товары</a>
            </div>
        </div>
    </div>
</section>

<section class="counter container-fluid">
    <div class="container">
        <div class="row counter__row">
            <div class="col-md-3 col-sm-12 counter__content">
                <div class="counter__icon"><i class="fas fa-users"></i></div>
                <h2 class="counter__count first-count">19237</h2>
                <p class="counter__text">Довольных покупателей</p>
            </div>
            <div class="col-md-3 col-sm-12 counter__content">
                <div class="counter__icon"><i class="fas fa-mobile-alt"></i></div>
                <h2 class="counter__count second-count">21334</h2>
                <p class="counter__text">Товаров продано</p>
            </div>
            <div class="col-md-3 col-sm-12 counter__content">
                <div class="counter__icon"><i class="fas fa-sun"></i></div>
                <h2 class="counter__count third-count">1337</h2>
                <p class="counter__text">Дней работает наш магазин</p>
            </div>
            <div class="col-md-3 col-sm-12 counter__content">
                <div class="counter__icon"><i class="fas fa-calendar-alt"></i></div>
                <h2 class="counter__count fourth-count">312</h2>
                <p class="counter__text">Акционных товаров</p>
            </div>
        </div>
    </div>
</section>

<section class="testimonials container-fluid">
    <div class="container">
        <div class="row testimonials__row">
            <div class="col-md-12">
                <h2 class="testimonials__header">Отзывы о магазине</h2>
            </div>
            <div class="col-md-12">
                <div class="testimonials__slider slider">
                    <div class="testimonials__slider-item">
                        <p class="testimonials__text">My husband and I live in the United States but chose to get married in beautiful Alghero. Eva was always responsive through email, Skype, or phone (A+ when planning a destination wedding) and offered great advice on everything from wedding themes and table setups to props and vendors. Eva also has a keen eye for design and style and worked with us to transform the wedding venue into our own magical oasis. I would definitely recommend Eva's services!</p>
                    </div>
                    <div class="testimonials__slider-item">
                        <p class="testimonials__text">We got married as Belgians in Castelsardo and had our ceremony organised and planned by Eva. She is very friendly, professional and client oriented. Even from a distance we were able to plan the ceremony which resulted in a dream come through scenario... Bravissimo!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div id="shop-root" style="position: absolute"></div>

@endsection
