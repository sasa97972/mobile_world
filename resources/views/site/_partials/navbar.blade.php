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
                    <li class="nav__item">
                        <a href="/shop" class="nav-link">Магазин</a>
                        <ul class="nav__nested-list">
                            @forelse($categories as $category)
                                <li class="nav__nested-item">{{$category->name}}</li>
                            @empty
                                <li class="nav__nested-item">Здесь ещё нет категорий</li>
                            @endforelse
                        </ul>
                    </li>
                    <li class="nav__item"><a href="/about" class="nav-link">О нас</a></li>
                    <li class="nav__item"><a href="/contacts" class="nav-link">Контакты</a></li>
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
                                {{ Auth::user()->name }} <span class="oi oi-person nav__system-person"/>
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
                            <span class="oi oi-cart nav__system-cart"/>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</nav>