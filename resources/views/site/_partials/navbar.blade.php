<nav class="nav cd-auto-hide-header">
    <div class="container">
        <div class="row nav__row">
            <div class="col-md-4 nav__logo">
                <a href="/" class="nav__logo-link-wrapper">
                    <div class="image-wrapper">
                        <img src="{{asset("images/logo.png")}}" alt="Лого сайта MobileWorld" class="nav__logo-img">
                    </div>
                    <h5 class="nav__name">MobileWorld</h5>
                </a>
            </div>
            <div class="col-md-4 nav__menu">
                <ul class="nav__list">
                    <li class="nav__item"><a href="/" class="nav-link <?php if(Request::path() === "home"){ ?>nav-link_active<?php } ?>">Главная</a></li>
                    <li class="nav__item">
                        <a href="/shop" class="nav-link <?php if(Request::path() === "shop/*"){ ?>nav-link_active<?php } ?>">Магазин</a>
                        <ul class="nav__nested-list">
                            @forelse($categories as $category)
                                <li class="nav__nested-item"><a href="{{"/shop/".$category->alias}}"></a>{{$category->name}}</li>
                            @empty
                                <li class="nav__nested-item">Здесь ещё нет категорий</li>
                            @endforelse
                        </ul>
                    </li>
                    <li class="nav__item"><a href="/about" class="nav-link <?php if(Request::path() === "about"){ ?>nav-link_active<?php } ?>">О нас</a></li>
                    <li class="nav__item"><a href="/contacts" class="nav-link <?php if(Request::path() === "contacts"){ ?>nav-link_active<?php } ?>">Контакты</a></li>
                </ul>
            </div>
            <div class="col-md-4 nav__system">
                <ul class="nav__system-list">
                    @if (Auth::guest())
                        <li class="nav__system-list-item"><a href="{{ route('login') }}" class="nav-link">Войти</a></li>
                        <li class="nav__system-list-item"><a href="{{ route('register') }}" class="nav-link">Регистрация</a></li>
                    @else
                        @if(Auth::user()->isAdmin() || Auth::user()->isSuperAdmin())
                            <li class="nav__system-list-item">
                                <a href="{{ route('admin') }}" class="nav-link">
                                    Админ. панель
                                </a>
                            </li>
                        @endif
                        <li class="nav__system-list-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                {{ Auth::user()->name }} <i class="fas fa-user nav__system-person"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href="{{ route('logout') }}" class="dropdown-item"
                                   onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    Выход
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                      style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </div>
                        </li>
                        <li class="nav__system-list-item">
                            <i class="fas fa-shopping-cart nav__system-cart"></i>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</nav>