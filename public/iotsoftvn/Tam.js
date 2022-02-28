////$divDetail = $("#div-hover-detail");
////$('.product-item').hover(function (e) {
////    let $item = $(this).parent().parent();
////    let position = $item.offset();
////    if (position.left < $item.width())
////        position.left += $item.width();
////    else position.left = position.left - $item.width();
////    $divDetail.css({ top: position.top, left: position.left + 100 });
////    $divDetail.show();
////},
////    function (e) {
////        setTimeout(function () {
////            $divDetail.hide();
////        }, 200)
////    });
////$divDetail.hover(function () {
////    $divDetail.css({ display: 'block' })
////})

$('[data-toggle="popover"]').popover({
    trigger: "manual",
    html: true,
    animation: false,
    placement:'left'
})
    .on("mouseenter", function () {
        $('[data-toggle="popover"]').popover("hide");
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
    });