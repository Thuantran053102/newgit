function sendContact() {
    let params = {
        CustomerName: $('#ipt-name').val(),
        Phone: $('#ipt-phone').val(),
        Content: $('#ipt-content').val(),
        Recaptcha: grecaptcha.getResponse()
    }
    let isValidPhone = false;
    let isValidName = false;
    let isValidContent = false;

    isValidName = !IsNullOrEmpty(params.CustomerName);
    isValidPhone = isPhoneNumber(params.Phone);
    isValidContent = !IsNullOrEmpty(params.Content);
    isValidName ? $('#name-error').addClass("d-none") : $('#name-error').removeClass("d-none");
    isValidPhone ? $('#phone-error').addClass("d-none") : $('#phone-error').removeClass("d-none");
    isValidContent ? $('#content-error').addClass("d-none") : $('#content-error').removeClass("d-none");
    if (!isValidName) {
        $('#ipt-name').focus();
        return;
    }
    else if (!isValidPhone) {
        $('#ipt-phone').focus();
        return;
    }

    else if (!isValidContent) {
        $('#ipt-content').focus();
        return;
    }

    if (params.Recaptcha.length == 0) {
        alertify.alert("Vui lòng xác thực bạn không phải người máy");
        return;
    }
    else {
        if (isValidName && isValidPhone && isValidContent) {
            ajaxPost('contact', params, function (data) {
                if (data.IsSuccess) {
                    alertify.alert('Cảm ơn quý khách đã gửi liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất', function () {
                        window.location.href = '/';
                    })
                } else {
                    alertify.alert('Gửi liên hệ thất bại. Đã xảy ra sự cố hoặc hệ thống đang bảo trì. Xin quý khách vui lòng thử lại sau');
                }
            })
        }
    }
};

var brandlider = $("#brand-slide");
if (brandlider.length > 0) {
    brandlider.owlCarousel({
        items: 5,
        margin: 10,
        lazyLoad: true,
        pagination: false,
        autoPlay: 1500,
        stopOnHover: true
    });
}