jQuery(document).ready(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

    function changeHeaderStyle() {
        if($(window).scrollTop() > 0) {
            mainHeader.addClass('nav_scroll');
        } else {
            mainHeader.removeClass('nav_scroll');
        }
    }
    changeHeaderStyle();

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}

		changeHeaderStyle();
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}

	const hamburger = $(".hamburger");
    hamburger.on("click", function() {
		$(this).toggleClass("is-active");
        $(".nav__menu, .nav__system").slideToggle(500);
	});

	function setNestedPosition() {
		const nestedMenu = $(".baron.baron__root");
		nestedMenu.css("bottom", -nestedMenu.outerHeight(false));
    }

    $(window).resize(function(){
    	setNestedPosition();
	}).resize();

	function initBaronMobile() {
	    const baronRoot = $(".baron, .nav__menu");
        baronRoot.css({display: "block", visibility: "hidden"});
        baron({
            root: '.baron',
            scroller: '.baron__scroller',
            bar: '.baron__bar',
        }).controls({
            track: '.baron__track',
            forward: '.baron__down',
            backward: '.baron__up'
        });
        baronRoot.css({display: "none", visibility: "visible"});
    }

    function initBaron() {
        baron({
            root: '.baron',
            scroller: '.baron__scroller',
            bar: '.baron__bar',
        }).controls({
            track: '.baron__track',
            forward: '.baron__down',
            backward: '.baron__up'
        });
    }

    if($(window).width() >= 992) {
        initBaron();
    } else {
        initBaronMobile();
    }


    $(window).on('resize', function(){
        if($(this).width() >= 992) {
        	$(".nav").removeClass("nav_mobile");
		} else {
            $(".nav").addClass("nav_mobile");
		}
    }).resize();


    let isFirst = true;
    $(window).on('resize', function(){
        if($(this).width() <= 992 && $(".nav_mobile")) {
            if(!isFirst) {return}
            isFirst = false;
            $(".nav__item-open-nested > .nav-link").click(function(e){
                $(".baron.baron__root").slideToggle(500);
                $(".nav__item-open-nested > .nav-link > .fa-caret-down").toggleClass("caret_open");
                return false;
            });
        } else {
            $(".nav__item-open-nested > .nav-link").unbind("click");
        }
    }).resize();

});