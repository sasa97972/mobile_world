jQuery(document).ready(function($) {
    let numbers = [],
        time = 500;
    $(".counter__count").each(function(){
        numbers.push({
            class: this.className.replace(/\b([a-zA-Z_-]+\b)/igm, ".$1").replace(/\s/igm, ""),
            finalNumber: this.textContent,
            count: Math.floor(this.textContent/time) || 1,
            currentNumber: 0
        });
    });

    function weedingCounter() {
        function firstCount() {
            numbers.map(number => {
                $(number.class).text(number.currentNumber);
                number.currentNumber += number.count;
                if(numbers[0].currentNumber >= numbers[0].finalNumber) {
                    $(number.class).text(number.finalNumber);
                    firstInterval && clearInterval(firstInterval);
                }
            });
        }
        let firstInterval = setInterval(firstCount, 1);
    }

    let first = true;
    function startCount() {
        let counterTop = $(".counter").offset().top,
            top = $(window).scrollTop();
        if(counterTop < top + $(".counter").outerHeight(true)*2) {
            first = false;
            weedingCounter();
        }
    }
    if($(".counter").length) {
        $(window).on("scroll", function () {
            if (first) {
                startCount();
            }
        }).scroll();
    }
});

