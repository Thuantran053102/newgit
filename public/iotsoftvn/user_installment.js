var PREPAY = 30, MONTH = 6, DATA = [];
var IS_FISRT = true;
$(document).ready(function () {
    $('#txt-note').html("<b> Lưu ý: </b> Giá được tính chỉ mang tính chất tham khảo.")
    load();
});

function load() {
    ajaxGet('Installment/installment-by-url?prepay=' + PREPAY + '&month=' + MONTH + '&url=' + URL, null, function (res) {
        if (res.IsSuccess) {
            var data = res.Result;
           /*for (var i = 0; i < data.length; i++) {
                if (data[i].Id == 2) {
                    data[i].IsSupport = false;
                }
            }*/
            DATA = data;
            if (IS_FISRT) {
                var months = [];
                data.map(n => n.CountMonth.split("|").map(i => months.push(parseInt(i))));
                months = new Set(months.sort());
                months = Array.from(months).sort(function (a, b) {
                    return a - b;
                });
                for (var i = 0; i < months.length; i++) {
                    let color = months[i] == 6 ? "btn-primary" : "";
                    let htmlBtn = `<button class="btn-month btn ${color} shadow-none mr-2" data-value="${months[i]}" onclick="preLoad(this);">${months[i]} tháng </button>`;
                    $("#div-month").append(htmlBtn);
                }
                IS_FISRT = false;
            }
            console.log(data);
            let subHtml = `<table class="table border table-striped table-responsive">
                        <tbody>
                             <tr>
                                <td> Công ty</td>
                                ${data.map(n => ('<td><img style="max-width: 200px;" src="/' + n.LogoPath + '"</td>')).join("")}
                            </tr>
                            <tr>
                                <td>Giá sản phẩm</td>
                                ${render(data, 'GiaMuaTraGop', true, 'text-danger')}
                            </tr>
                            <tr>
                                <td>Trả trước <select class="" id="sl-prepay">${[20, 30, 40, 50, 60, 70].map(n => '<option value="' + n + '">' + n + ' %</option>').join("")}<select></td>
                                 ${render(data, 'TienTraTruoc')}
                            </tr>
                            <tr>
                                <td>Còn lại</td>
                                ${render(data, 'TienTraGop')}
                           </tr>
                            <tr>
                                <td>Lãi suất</td>
                                 ${render(data, 'LaiXuat', false, '', '%')}
                            </tr>

                            <tr>
                                <td>Góp mỗi tháng</td>
                                 ${render(data, 'GopMoiThang')}
                            </tr>

                            <tr>
                                <td>Chênh lệch</td>
                                 ${render(data, 'ChenhLechVoiMuaTraThang')}
                            </tr>
                             <tr>
                                <td>Giấy tờ cần có</td>
                                 ${render(data, 'GiayToCanCo', false)}
                            </tr>
                            <tr>
                                <td>Phí hồ sơ</td>
                                 ${render(data, 'PhiHoSo')}
                            </tr>
                            <tr>
                                <td>Tổng tiền phải trả</td>
                                 ${render(data, 'TongTienPhaiTra', true, 'text-danger')}
                            </tr>
                            <tr>
                                <td></td>
                                 ${data.map(n => (n.IsSupport ? `<td>

                                    <a href="javascript:buyInstallment(${n.Id})" class="px-h-42 w-100 text-center" >
                                        <p class="btn btn-gradient-orange text-white font-weight-bold justify-content-center rounded-8px d-flex align-items-center h-100 w-50 m-0">Đặt mua</p>
                                    </a>
                                    </td>` : `<td></td>`)).join(' ')}
                            </tr>
                        </tbody>
                    </table>`;
            $("#tbl-info").html(subHtml);
            $("#sl-prepay").val(PREPAY).trigger("change")
            $("#sl-prepay").on("change", function () {
                PREPAY = parseInt($("#sl-prepay").val());
                load();
            })
        }


    }, null, false);
}
function buyInstallment(bankId) {
    $('#div-info-customer').removeClass('d-none');
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#div-info-customer").offset().top
    }, 1000);
    $('#btn-buy').unbind().on('click', function () {
        payclick(bankId);
    })
}
function preLoad(e) {
    MONTH = $(e).attr("data-value");
    $(".btn-month").removeClass("btn-primary");
    $(e).addClass(" btn-primary");
    load();
}
function render(data, key, IsMoney = true, color = '', prefix = "") {
    if (IsMoney) {
        let html = data.map(n => {
            if (n.IsSupport)
                return '<td class="text-right"><span class="' + color + '">' + formatMoney(n[key]) + prefix + '</span></td>';
            else return `<td>${key == 'TongTienPhaiTra' ? '<a href="/lien-he">Liên hệ</a>' : ""}</td>`;
        }).join("");
        return html;
    }
    else {
        let html = data.map(n => {
            if (n.IsSupport)
                return '<td class="text-right"><span class="' + color + '">' + n[key] + prefix + '</span></td>';
            else return `<td></td>`;
        }).join("");
        return html;

    }
}
function payclick(bankId) {

    //Check thoong tin khach hang
    var customer = formToObject('#form-customer');
    let validCustomer = false;
    if (IsNullOrEmpty(customer.FullName)) {
        $('#lb-error-fullname').removeClass('d-none');
        $('input[name="FullName"]').focus(); 
        validCustomer = false;
    } else {
        $('#lb-error-fullname').addClass('d-none');
        validCustomer = true;
    }
    if (IsNullOrEmpty(customer.Phone) || !isPhoneNumber(customer.Phone)) {
        $('#lb-error-phone').removeClass('d-none');
        $('input[name="Phone"]').focus(); 
        validCustomer = false;
    } else {
        $('#lb-error-phone').addClass('d-none');
        validCustomer = true;
    }

    if (validCustomer) {
        localStorage.setItem('customer', JSON.stringify(customer));
        ajaxPost('customer', {
            FullName: customer.FullName,
            Address: customer.Address,
            Phone: customer.Phone,
            Email: customer.Email,
        }, function (res) {
            var myCart = getMyCart();
            var orders = [];
            orders.push({
                ProductId: parseInt(ID),
                Quantity: 1,
            });
            if (res.IsSuccess) {// insert order
                let bank = DATA.find(n => n.Id == bankId);
                ajaxPost('order/PostInstallment', {
                    TongTienPhaiTra: bank.TongTienPhaiTra,
                    CustomerId: res.Result.Id,
                    OrderDetailRequests: orders,
                    InstallmentBankId: bankId,
                    SoThang: parseInt(MONTH),
                    GiaMuaTraGop: bank.GiaMuaTraGop,
                    LaiXuat: bank.LaiXuat,
                    PhiHoSo: bank.PhiHoSo,
                    PhanTramTraTruoc: PREPAY,
                    GiayToCanCo: bank.GiayToCanCo,
                    ChenhLech: bank.ChenhLechVoiMuaTraThang,
                    GopMoiThang: bank.GopMoiThang

                }, function (resOrder) {
                    if (resOrder.IsSuccess) {
                        setMyCart([]);
                        // sent to zalo đã chuyển lên server
                        //sendZalo(resOrder.Result);
                        alertify.alert("Đặt hàng thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất", function () {
                            {
                                location.href = '/';
                            }
                        });

                    } else if (resOrder.Result == 'false') {
                        alertify.alert("Giá sản phẩm đã có thay đổi, vui lòng cập nhật lại trang", function () {
                            location.href = '/checkout/payment';
                        });
                    } else {
                        alertify.alert("Lỗi xảy ra, vui liên hệ chăm sóc khách để được hỗ trợ", function () {
                            {
                            }
                        });
                    }


                });
            }
        });

    }
}
