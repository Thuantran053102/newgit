initCarouselProduct('#carousel-product-related', 5, 200000);
$(document).ready(function () {
    initSlide();

})
/*Change Quantity*/
function changeQuantity(type) {
    let value = parseInt($('#inputQuantity').val());
    if (value == 1 && type == 'minus') return;
    if (value >= 99) return;
    if (type == 'plus')
        $('#inputQuantity').val(value + 1)
    else $('#inputQuantity').val(value - 1);
}

function addToCartWithQuantity(Id) {
    let value = parseInt($('#inputQuantity').val());
    AddToCart(Id, value);
    return true;
}
/** Init carousel product view */
var $view = $("#carousel-product-view");
$view.owlCarousel({
    singleItem: true,
    slideSpeed: 1000,
    pagination: false,
    navigation: true,
    navigationText: ['<i class="arrow-me left"></i>', '<i class="arrow-me right"></i>'],
    autoPlay: 200000,
    afterAction: syncPosition,
    responsiveRefreshRate: 200,
});

//function showCarousel() {
//    var itemLength = $("#carousel-product-sub  img").length;
//    if (window.innerWidth > 480 && itemLength > 4) { // Chiều rộng lớn hơn 480 tức máy tính bảng hoặc pc
//        initSlide();
//    } else if (window.innerWidth <= 480 && itemLength > 3) {
//        initSlide();
//    }
//}

function initSlide() {
    let arrowlLeft = "", arrowlRight = "";
    var itemLength = $("#carousel-product-sub  img").length;
    if (window.innerWidth > 480 && itemLength > 4) { // Chiều rộng lớn hơn 480 tức máy tính bảng hoặc pc
        arrowlLeft = "arrow-me left";
        arrowlRight = "arrow-me right";
    } else if (window.innerWidth <= 480 && itemLength > 3) {
        arrowlLeft = "arrow-me left";
        arrowlRight = "arrow-me right";
    }
    /** Init carousel product sub */
    var $sub = $("#carousel-product-sub");
    $sub.owlCarousel({
        items: 4,
        navigation: true,
        responsive: true,
        itemsDesktop: [1199, 10],
        itemsDesktopSmall: [979, 10],
        itemsTablet: [768, 10],
        itemsMobile: [479, 3],
        loop: true,
        center: true,
        pagination: false,
        navigationText: ['<i class="' + arrowlLeft + '"></i>', '<i class="' + arrowlRight+'"></i>'],
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });
}
/** Sync position */
function syncPosition(el) {
    var current = this.currentItem;
    $("#carousel-product-sub")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced")
    if ($("#carousel-product-sub").data(".owlCarousel") !== undefined) {
        center(current)
    }
}

/** Binding click item product sub */
$("#carousel-product-sub").on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).data("owlItem");
    $view.trigger("owl.goTo", number);
});

/** Fix center */
function center(number) {
    var sync2visible = $sub.data(".owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for (var i in sync2visible) {
        if (num === sync2visible[i]) {
            var found = true;
        }
    }
    if (found === false) {
        if (num > sync2visible[sync2visible.length - 1]) {
            $sub.trigger("owl.goTo", num - sync2visible.length + 2)
        } else {
            if (num - 1 === -1) {
                num = 0;
            }
            $sub.trigger("owl.goTo", num);
        }
    } else if (num === sync2visible[sync2visible.length - 1]) {
        $sub.trigger("owl.goTo", sync2visible[1])
    } else if (num === sync2visible[0]) {
        $sub.trigger("owl.goTo", num - 1)
    }
}
function RedirectCart() {
    let a = new Promise((res, rej) => {
        res(addToCartWithQuantity())
    })
    a.then((a) => { window.location.href = "gio-hang"; })
}