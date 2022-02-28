const $iptBottomSlide1 = $("#ipt-bottom-slide-1");
const $iptBottomSlide2 = $("#ipt-bottom-slide-2");
const $iptBottomSlide3 = $("#ipt-bottom-slide-3");

const $imgBottomSlide1 = $("#img-bottom-slide-1");
const $imgBottomSlide2 = $("#img-bottom-slide-2");
const $imgBottomSlide3 = $("#img-bottom-slide-3");

const $btnBottomSlide1 = $("#btn-bottom-slide-1");
const $btnBottomSlide2 = $("#btn-bottom-slide-2");
const $btnBottomSlide3 = $("#btn-bottom-slide-3");


const $cboxBottomSlide1 = $("#cbox-bottom-slide-1");
const $cboxBottomSlide2 = $("#cbox-bottom-slide-2");
const $cboxBottomSlide3 = $("#cbox-bottom-slide-3");

const $cboxBannerTopPromotion = $("#ipt-check-show-top-promotion");

$(function () {
    //get
    ajaxGet('BannerAds', { keyword: '' }, (data) => {
        if (data.IsSuccess) {
            if (data.Result.IsShowLeft)
                $('#ipt-check-show-left').attr('checked', true);
            if (data.Result.IsShowRight)
                $('#ipt-check-show-right').attr('checked', true);
            if (data.Result.IsShowTop)
                $('#ipt-check-show-top').attr('checked', true);
            $('#img-banner-left').attr('src', data.Result.LeftPath);
            $('#img-banner-right').attr('src', data.Result.RightPath);
            $('#ipt-friendly-url-left').val(data.Result.LeftFriendlyUrl);
            $('#ipt-friendly-url-right').val(data.Result.RighFriendlyUrl);
            $('#img-banner-top').attr('src', data.Result.TopPath);
            $('#ipt-friendly-url-top').val(data.Result.TopFriendlyUrl);

            $iptBottomSlide1.val(data.Result.UrlBannerBottomSlide1);
            $iptBottomSlide2.val(data.Result.UrlBannerBottomSlide2);
            $iptBottomSlide3.val(data.Result.UrlBannerBottomSlide3);

            $imgBottomSlide1.attr('src', data.Result.PathBannerBottomSlide1);
            $imgBottomSlide2.attr('src', data.Result.PathBannerBottomSlide2);
            $imgBottomSlide3.attr('src', data.Result.PathBannerBottomSlide3);

            $cboxBottomSlide1.prop('checked', data.Result.IsShowBannerBottomSlide1);
            $cboxBottomSlide2.prop('checked', data.Result.IsShowBannerBottomSlide2);
            $cboxBottomSlide3.prop('checked', data.Result.IsShowBannerBottomSlide3);
            //hình dưới slide

            $('#img-banner-top-promotion').attr('src', data.Result.BannerTopPromotionPath);
            $cboxBannerTopPromotion.prop('checked', data.Result.IsShowBannerTopPromotionPath);
            $('#ipt-friendly-url-top-promotion').val(data.Result.BannerTopPromotionFriendlyUrl);
        } else
            alertify.alert(data.Message);
    })
    INIT_FILE_MANAGE('#btn-img-advertise-left', function (file) {
        $('#img-banner-left').attr('src', getImagePath(file.FilePath));
    })

    INIT_FILE_MANAGE('#btn-img-advertise-right', function (file) {

        $('#img-banner-right').attr('src', getImagePath(file.FilePath));
    })
    INIT_FILE_MANAGE('#btn-img-advertise-top', function (file) {
        $('#img-banner-top').attr('src', getImagePath(file.FilePath));
    })

    INIT_FILE_MANAGE('#btn-img-advertise-top-promotion', function (file) {
        $('#img-banner-top-promotion').attr('src', getImagePath(file.FilePath));
    })

    //3 hình ảnh dưới slide 
    INIT_FILE_MANAGE('#btn-bottom-slide-1', function (file) {
        $imgBottomSlide1.attr('src', getImagePath(file.FilePath));
    });
    INIT_FILE_MANAGE('#btn-bottom-slide-2', function (file) {
        $imgBottomSlide2.attr('src', getImagePath(file.FilePath));
    });
    INIT_FILE_MANAGE('#btn-bottom-slide-3', function (file) {
        $imgBottomSlide3.attr('src', getImagePath(file.FilePath));
    });

})
function UpdateBannerAds() {
    let d = {
        LeftPath: $('#img-banner-left').attr('src'),
        RightPath: $('#img-banner-right').attr('src'),
        IsShowLeft: $('#ipt-check-show-left').is(':checked'),
        IsShowRight: $('#ipt-check-show-right').is(':checked'),
        LeftFriendlyUrl: $('#ipt-friendly-url-left').val(),
        RighFriendlyUrl: $('#ipt-friendly-url-right').val(),
        TopPath: $('#img-banner-top').attr('src'),
        IsShowTop: $('#ipt-check-show-top').is(':checked'),
        TopFriendlyUrl: $('#ipt-friendly-url-top').val(),

        PathBannerBottomSlide1: $imgBottomSlide1.attr('src'),
        PathBannerBottomSlide2: $imgBottomSlide2.attr('src'),
        PathBannerBottomSlide3: $imgBottomSlide3.attr('src'),

        UrlBannerBottomSlide1: $iptBottomSlide1.val(),
        UrlBannerBottomSlide2: $iptBottomSlide2.val(),
        UrlBannerBottomSlide3: $iptBottomSlide3.val(),
        IsShowBannerBottomSlide1: $cboxBottomSlide1.prop("checked"),
        IsShowBannerBottomSlide2: $cboxBottomSlide2.prop("checked"),
        IsShowBannerBottomSlide3: $cboxBottomSlide3.prop("checked"),

        BannerTopPromotionPath: $('#img-banner-top-promotion').attr('src'),
        BannerTopPromotionFriendlyUrl: $('#ipt-friendly-url-top-promotion').val(),
        IsShowBannerTopPromotionPath: $cboxBannerTopPromotion.prop("checked"),

    }
    if (IsNullOrEmpty(d.LeftFriendlyUrl) && d.IsShowLeft) {
        alertify.alert("Vui lòng nhập đường dẫn cho hình ảnh quảng cáo bên trái.")
    } else if (IsNullOrEmpty(d.RighFriendlyUrl) && d.IsShowRight) {
        alertify.alert("Vui lòng nhập đường dẫn cho hình ảnh quảng cáo bên phải.")
    } else if (IsNullOrEmpty(d.TopFriendlyUrl) && d.IsShowTop) {
        alertify.alert("Vui lòng nhập đường dẫn cho hình ảnh quảng cáo bên trên.")
    } else {
        ajaxPost('BannerAds', d, (data) => {
            if (data.IsSuccess) {
                alertify.success("Cập nhập thành công");
            } else {
                alertify.alert(data.Message);
            }
        })
    }
}