var $tblRoot = $("#tbl-root");
var $tblSelected = $("#tbl-selected");
var ALL_PRODUCTS = [], SELECTED_PRODUCTS = [];
var BANNER = '';

var $tblProduct = $("#tbl-products");
var $sltAddProduct = $("#slt-add-product");
var $spAddSalePrice = $("#sp-add-sale-price");
var $iptAddSaleQuantity = $("#ipt-add-sale-quantity");
var $spAddPrice = $("#sp-add-price");
var $iptPriority = $('#ipt-priority');
var $sltSaleBy = $("#slt-sale-by");
var $spUnit = $(".sp-unit");
var $iptSaleQuantity = $("#ipt-sale-quantity");
var $iptMaxSale = $("#ipt-max-sale");

$(document).ready(function () {
    loadProduct();
    //CKEDITOR.replace('editor');
    INIT_FILE_MANAGE('#btn-banner', function (file) {
        BANNER = file.FilePath;
        $('#img-banner').attr('src', getImagePath(file.FilePath));
    })

    //khởi tạo select nhóm sản phẩm
    initSelect({
        Element: '#sl-group',
        Url: 'productgroup/GetFilter',
        Value: 'GroupName',
        Id: 'Id',
        Placeholder: ''
    }, false, function () { });
})
function loadProduct() {
    ajaxGet('Product/AllProductOnSale', {}, function (res) {
        if (res.IsSuccess) {
            ALL_PRODUCTS = res.Result;
            renderRootTable(ALL_PRODUCTS)

        } else {
        }
    })


}


function SaveChange() {
    var from = $("#dtpk-from-date").val();
    var to = $("#dtpk-to-date").val();
    var name = $("#ipt-name").val();
    var bankId = $("#sl-bank").val();
    if (IsNullOrEmpty(name))
        alertify.error("Tên không được để trống");
    else if (SELECTED_PRODUCTS.length < 1)
        alertify.error("Chưa chọn sản phẩm");
    else {
        let d = {
            InstallmentBankId: parseInt(bankId),
            FromDateString: from,
            ToDateString: to,
            Name: name,
            Products: SELECTED_PRODUCTS.map(n => { return { Id: n.Id } })
        }
        ajaxPost('installment', d, function (res) {
            if (res.IsSuccess) {
                alertify.alert("Thêm mới thành công", function () {
                    window.location.reload();
                });

            } else {
                alertify.alert("Có lỗi xảy ra: " + res.Message);
            };
        })
    }


}

/** Binding event search */
$('#ipt-text-search-root').keyup(function () {
    delay(function () {
        let vl = removeUnicode($('#ipt-text-search-root').val());
        let data = ALL_PRODUCTS.filter(n => {
            let text = (n.ProductCode + n.ProductName);
            if (removeUnicode(text).includes(vl))
                return n;
        });
        renderRootTable(data);
    }, 250);
});

$('#ipt-text-search-selected').keyup(function () {
    delay(function () {
        let vl = removeUnicode($('#ipt-text-search-selected').val());
        let data = SELECTED_PRODUCTS.filter(n => {
            let text = (n.ProductCode + n.ProductName);
            if (removeUnicode(text).includes(vl))
                return n;
        });
        renderSelectedTable(data);
    }, 250);
});


function renderRootTable(data) {
    var html = '';
    data.map((item, index) => {
        html += ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td class="text-lowercase">${item.StockNumber} fdasfdasfds </td>
                                    <td class="text-right">${formatMoney(item.GiaBanLe)}</td>
                                    <td><button class="btn btn-primary" onclick="Add(${item.Id})">Thêm</button></td>
                 </tr>`
    });
    $tblRoot.html(html);
}

function renderSelectedTable(data) {
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td class="text-danger">${item.StockNumber}  </td>
                                    <td class="text-right">${formatMoney(item.GiaBanLe)}</td>
                                    <td><input onchange="changeQuanity(this,${item.Id})" type="text" class="form-control text-right" data-toggle="autonumeric-money" style="min-width: 130px;" value="${item.GiaGiam}" /></td>
                                    <td><button class="btn btn-danger" onclick="Remove(${item.Id})">Xóa</button></td>
                 </tr>`
    ));
    $tblSelected.html(html);
    $tblSelected.find('input').autoNumeric('init', { digitGroupSeparator: ',', mDec: '0', maximumValue: 10000000, minimumValue: 0 });
}

function changeQuanity(e, productId) {
    var item = SELECTED_PRODUCTS.find(n => n.Id == productId);
    item.GiaGiam = $(e).val();
}

/* Thêm */
function Add(id) {
    ajaxGet("Promotion/isInOrtherPromo/" + id, {}, function (res) {
        resp = res;
    }, null, false);
    if (resp.IsSuccess) {
        let chuongTrinh = `<ul>${resp.Result.map((n, i) => {

            let html = "<li>" + n + "</li>";
            return html;
        })}</ul>`
        alertify.confirm(`Sản phẩm bạn đang chọn đã tồn tại trong ${resp.Result.length} chương trình khuyến mãi${chuongTrinh} Bạn có chắc muốn thêm sản phẩm? `,
            function (e) {
                subAdd();
            });
    } else {
        subAdd();
    }
    function subAdd() {
        let item = ALL_PRODUCTS.find(n => n.Id == id);
        SELECTED_PRODUCTS.push(item);
        if (item.GiaGiam == undefined) item.GiaGiam = 0;
        ALL_PRODUCTS = ALL_PRODUCTS.filter(n => n.Id != id);
        var $row = $("#row" + id);
        $row.remove();
        renderSelectedTable(SELECTED_PRODUCTS);
    }
}

/** Xóa */
function Remove(id) {
    let item = SELECTED_PRODUCTS.find(n => n.Id == id);
    ALL_PRODUCTS.push(item);
    SELECTED_PRODUCTS = SELECTED_PRODUCTS.filter(n => n.Id != id);
    renderRootTable(ALL_PRODUCTS);
}

/*Chẹc valid*/
var newPromotion = {
    PromotionProductRequests: []
};
function bindData() {
    newPromotion = {};
    newPromotion.Name = $("#ipt-name").val();
    newPromotion.BackgroundColor = $("#ipt-back-ground").val();
    newPromotion.Description = $("#ipt-desc").val();
    newPromotion.DiscountQuantity = parseInt($iptSaleQuantity.autoNumeric('get'));
    newPromotion.MaximumDiscount = parseInt($("#ipt-max-sale").autoNumeric('get'));
    newPromotion.DiscountType = parseInt($sltSaleBy.val());
    newPromotion.FriendlyUrl = $("#ipt-url").val();
    newPromotion.Priority = parseInt($('#ipt-priority').val());
    newPromotion.RowDisplay = parseInt($("#ipt-row").val());
    newPromotion.Banner = BANNER;
    newPromotion.PromotionProductRequests = SELECTED_PRODUCTS.map(n => {
        return {
            ProductName: n.ProductName,
            GiaBanLe: n.GiaBanLe,
            ProductId: n.Id,
            DiscountQuantity: typeof (n.GiaGiam) == 'number' ? n.GiaGiam : parseInt(n.GiaGiam.replace(/,/g, '')),
            DiscountType: parseInt($("#slt-sale-by").val()),
            MaximumDiscount: parseInt($iptMaxSale.autoNumeric('get')),
        };
    });

    var startTime = $("#time-start").val().replace("PM", "").replace("AM", "");
    var endTime = $("#time-end").val().replace("PM", "").replace("AM", "");
    newPromotion.StartDate = startTime + " " + $("#dtpk-start").val();
    newPromotion.EndDate = endTime + " " + $("#dtpk-end").val();

    newPromotion.Note = $("#ipt-note").val();
    if (isNaN(newPromotion.Priority)) {
        alertify.alert("Vui lòng nhập thự tự sắp xếp")
    } else if (newPromotion.Priority <= 0) {
        alertify.alert("Vui lòng nhập thự tự sắp xếp lớn hơn 0")
    } else if (newPromotion.Name == "") {
        alertify.alert("Vui lòng nhập tên chương trình khuyến mãi")
    } else if (isNaN(newPromotion.RowDisplay)) {
        alertify.alert("Vui lòng nhập số dòng hiển thị")
    } else if (newPromotion.RowDisplay == 0) {
        alertify.alert("Vui lòng nhập số dòng hiển thị lớn hơn 0")
    } else if (BANNER == '') {
        alertify.alert("Bạn cần chọn một hình dại diện");
    } else if (newPromotion.PromotionProductRequests.length == 0) {
        alertify.alert("Vui lòng chọn sản phẩm cho chương trình khuyến mãi.");
    } else if (Date.parse(newPromotion.StartDate) > Date.parse(newPromotion.EndDate)) {
        alertify.alert("Thời gian chương trình khuyến mãi kết thúc không thể ngắn hơn thời gian chương trình bắt đầu");
    } else {
        return true;
    }
}

/*Ap dung gia giam cho tat ca san pham */
function applyPrice() {
    alertify.confirm('Áp dụng số lượng giảm cho tất cả các sản phẩm đã chọn? Những thay đổi giá giảm trước đó của bạn sẽ bị mất!', function () {
        let vl = $("#ipt-sale-quantity").val().replace(/,/, "");

        if ($sltSaleBy.val() == 1) {
            // Giảm tiền mặt
            for (var i = 0; i < SELECTED_PRODUCTS.length; i++) {
                SELECTED_PRODUCTS[i].GiaGiam = parseInt(vl);
            }
        } else {
            // giảm giá %
            var percent = parseInt($("#ipt-sale-percent").val());
            for (var i = 0; i < SELECTED_PRODUCTS.length; i++) {
                if ($iptMaxSale.val() == 0) // Giảm tối đa = 0 là ko apps dụng , giảm bao cũng đk
                {
                    let GiaGiam = SELECTED_PRODUCTS[i].GiaBanLe / 100 * percent;
                    SELECTED_PRODUCTS[i].GiaGiam = GiaGiam;
                } else {
                    let GiaGiam = SELECTED_PRODUCTS[i].GiaBanLe / 100 * parseInt($iptMaxSale.val());
                    if (GiaGiam > parseInt($iptMaxSale.val()))
                        GiaGiam = parseInt($iptMaxSale.val());
                }
            }
        }
        renderSelectedTable(SELECTED_PRODUCTS);

    });

}

/*Save change*/
function postPromotion() {
    if (bindData()) {
        alertify.confirm("Xác nhận cập nhật chương trình", () => {
            ajaxPost('promotion', newPromotion, function (res) {
                if (res.IsSuccess) {
                    alertify.success('Thêm chương trình thành công')
                    setTimeout(function () {
                        location.reload();
                    }, 250)
                }
                else {
                    alertify.alert(res.Message);
                }
            });
        })
    }
}

/*Khi nhập title tạo url*/
$('input[name="Title"]').on('input', function (e) {
    $('input[name="FiendlyUrl"]').val(MakeUrl($('input[name="Title"]').val()));
});

//Giá tối đa thay đổi
$iptMaxSale.on('change', function () {
    //Cập nhập lại giá sp mới
    onAddQuantityChange(0, $iptAddSaleQuantity);
    //Cập nhập lại giá sp đã thêm
    renderProductTable();
})


$("#sl-group").on('change', function () {
    var data = $("#sl-group").val();
    for (var i = 0; i < data.length; i++) {
        ajaxGet('ProductGroup/GetById/' + parseInt(data[i]), {}, function (res) {
            if (res.IsSuccess) {
                let products = res.Result.Products;
                let ids = products.map(n => n.Id);
                ALL_PRODUCTS = ALL_PRODUCTS.filter(n => !ids.includes(n.Id))
                for (var i = 0; i < products.length; i++) {
                    let item = products[i];
                    item.GiaGiam = 0;
                    if (SELECTED_PRODUCTS.find(n => n.Id == item.Id) == null) {
                        SELECTED_PRODUCTS.push(item);
                    }
                }
            }
        }, null,
            false)
    }
    renderSelectedTable(SELECTED_PRODUCTS);
    renderRootTable(ALL_PRODUCTS);

})

$sltSaleBy.on('change', function () {
    var type = $sltSaleBy.val();
    if (type == 1) {
        $("#div-sale-money").removeClass("d-none");
        $("#div-sale-percent").addClass("d-none");
        $iptMaxSale.attr("disabled", true);
    } else {
        $("#div-sale-money").addClass("d-none");
        $("#div-sale-percent").removeClass("d-none");
        $iptMaxSale.attr("disabled", false);
    }
})