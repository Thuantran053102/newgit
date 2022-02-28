var $tblRoot = $("#tbl-root");
var $tblSelected = $("#tbl-selected");
var ALL_PRODUCTS = [], SELECTED_PRODUCTS = [];
var BANNER = '';

var $tblProduct = $("#tbl-products");
var $sltAddProduct = $("#slt-add-product");
var $spAddSalePrice = $("#sp-add-sale-price");
var $iptAddSaleQuantity = $("#ipt-add-sale-quantity");
var $spAddPrice = $("#sp-add-price");
var $sltSaleBy = $("#slt-sale-by");
var $spUnit = $(".sp-unit");
var $iptSaleQuantity = $("#ipt-sale-quantity");
var $iptMaxSale = $("#ipt-max-sale");

var $dtpkStart = $("#dtpk-start");
var $dtpkEnd = $("#dtpk-end");
var $timeStart = $("#time-start");
var $timeEnd = $("#time-end");

var $iptPriority = $('#ipt-priority');
var $iptName = $("#ipt-name");
var $iptUrl = $("#ipt-url");
var $iptDesc = $("#ipt-desc");
var $iptRow = $("#ipt-row");
var $iptBackGround = $("#ipt-back-ground");
var $iptNote = $("#ipt-note");
var $imgBanner = $('#img-banner');



$(document).ready(function () {
    loadProduct();
    var splits = window.location.href.split('/')
    promotionId = splits[splits.length - 1];
    ajaxGet('promotion/ById/' + promotionId, {}, function (res) {
        if (res.IsSuccess) {
            newPromotion = res.Result;
            newPromotion.PromotionProductRequests = res.Result.PromotionProducts;
            SELECTED_PRODUCTS = res.Result.PromotionProducts.map(n => {
                let it = {
                    Id: n.Product.Id,
                    ProductCode: n.Product.ProductCode,
                    ProductName: n.Product.ProductName,
                    GiaBanLe: n.Product.GiaBanLe,
                    GiaGiam: n.DiscountQuantity,
                };
                return it;
            });
            let idsSelected = SELECTED_PRODUCTS.map(n => n.Id);
            ALL_PRODUCTS = ALL_PRODUCTS.filter(n => !idsSelected.includes(n.Id));
            renderRootTable(ALL_PRODUCTS);
            renderSelectedTable(SELECTED_PRODUCTS);

            $imgBanner.attr('src', ROOT_URL + newPromotion.Banner);
            BANNER = newPromotion.Banner;
            $iptName.val(newPromotion.Name);
            $iptUrl.val(newPromotion.FriendlyUrl);
            $iptDesc.val(newPromotion.Description);
            $("#ipt-row").val(newPromotion.RowDisplay);
            $iptPriority.val(newPromotion.Priority);
            //------
            let timeStart = newPromotion.StartDate.split(' ')[0];
            let timeEnd = newPromotion.EndDate.split(' ')[0];
            let dateStart = newPromotion.StartDate.split(' ')[1];
            let dateEnd = newPromotion.EndDate.split(' ')[1];

            $timeStart.val(timeStart);
            $timeEnd.val(timeEnd);
            $dtpkStart.val(dateStart);
            $dtpkEnd.val(dateEnd);

            $iptBackGround.val(newPromotion.BackgroundColor);
            $iptNote.val(newPromotion.Note);

            $sltSaleBy.val(newPromotion.DiscountType).trigger('change');
            if (newPromotion.DiscountType == 2)//là giảm phần trămg
            {
                $("#ipt-sale-percent").val(newPromotion.DiscountPercent)
                $("#div-sale-money").addClass("d-none");
                $("#div-sale-percent").removeClass("d-none");
                $iptMaxSale.attr("disabled", false);
              
                $iptMaxSale.val(newPromotion.MaximumDiscount);

            } else {// giảm tiền mặt
                $("#div-sale-money").removeClass("d-none");
                $("#div-sale-percent").addClass("d-none");
                $iptMaxSale.attr("disabled", true);
                $iptSaleQuantity.val(newPromotion.DiscountQuantity);
            }

            // Đổi giá trong table selected khi giá trị giảm tối đa thay đổi . áp dug khi kiểu giảm là %
            $iptMaxSale.on('change', function () {
                applyPrice();
            })

            $iptSaleQuantity.on('change', function () {
                applyPrice();
            })
           // Đổi giá trong table selected khi giá trị tiền giảm thay đổi . áp dug khi kiểu giảm là tiền mặt
            $("#ipt-sale-percent").on('change', function () {
                applyPrice();
            })

              // Đổi giá trong table selected khi kiểu  giảm thay đổi ( tiền mặt hoặc % ). áp dug khi kiểu giảm là %
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
                applyPrice();
            })
        }
        else {
            alertify.error(res.Mesage);
        }
    });

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

/*Load tất cả sản phẩm đang bán*/
function loadProduct() {
    ajaxGet('Product/AllProductOnSale', {}, function (res) {
        if (res.IsSuccess) {
            ALL_PRODUCTS = res.Result;
            renderRootTable(ALL_PRODUCTS)
        } else {
        }
    }, null, false)


}

/*Lưu */
function SaveChange() {
    if (bindData())
        ajaxPut('promotion/' + promotionId, newPromotion, function (res) {
            if (res.IsSuccess) {
                alertify.success('Cập nhập chương trình thành công')
            }
            else {
                alertify.error(res.Message);
            }
        });

}

/** Binding event search tbl root */
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

/** Binding event search tbl selected*/
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

//
function renderRootTable(data) {
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td>${item.StockNumber} </td>
                                    <td class="text-right">${formatMoney(item.GiaBanLe)}</td>
                                    <td><button class="btn btn-primary" onclick="Add(${item.Id})">Thêm</button></td>
                 </tr>`
    ));
    $tblRoot.html(html);
}

function renderSelectedTable(data) {
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td>${item.StockNumber} </td>
                                    <td>${formatMoney(item.GiaBanLe)}</td>
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

/*Check valid*/
var newPromotion = {
    PromotionProductRequests: []
};
function bindData() {
    newPromotion = {};
    newPromotion.DiscountPercent = parseInt($("#ipt-sale-percent").val())
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
            DiscountQuantity: typeof (n.GiaGiam) == 'number' ? n.GiaGiam : parseInt(n.GiaGiam.replace(/,/g,'')),
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
    } else if (newPromotion.Priority<=0) {
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
                let TienGiamToiDa = parseInt($iptMaxSale.val().replace(/,/g, ""));
                if (GiaGiam > TienGiamToiDa)
                    GiaGiam = TienGiamToiDa;
                SELECTED_PRODUCTS[i].GiaGiam = GiaGiam;
            }
        }
    }
    renderSelectedTable(SELECTED_PRODUCTS);
}

/*Save change*/
function postPromotion() {
    if (bindData()) {
        alertify.confirm("Xác nhận cập nhật chương trình", () => {
            ajaxPut('promotion/' + promotionId, newPromotion, function (res) {
                if (res.IsSuccess) {
                    alertify.success('Cập nhập chương trình thành công')
                }
                else {
                    alertify.error(res.Message);
                }
            });

        })
    }

}

/*Khi nhập title tạo url*/
$('input[name="Title"]').on('input', function (e) {
    $('input[name="FiendlyUrl"]').val(MakeUrl($('input[name="Title"]').val()));
});


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
