var $tblRoot = $("#tbl-root");
var $tblSelected = $("#tbl-selected");
var ALL_PRODUCTS = [], SELECTED_PRODUCTS = [];


$(document).ready(function () {
    initSelect({
        Element: '#sl-bank',
        Url: 'InstallmentBank/get-all',
        Value: 'BankName',
        Id: 'Id',
        Placeholder: ''
    });
    loadProduct();

})
function loadProduct() {
    ajaxGet('Product/AllProductOnSale', {}, function (res) {
        if (res.IsSuccess) {
            ALL_PRODUCTS = res.Result;
            renderTable(ALL_PRODUCTS, "#tbl-root")

        } else {
        }
    })


}

function Add(id) {
    let item = ALL_PRODUCTS.find(n => n.Id == id);
    SELECTED_PRODUCTS.push(item);
    ALL_PRODUCTS = ALL_PRODUCTS.filter(n => n.Id != id);
    var $row = $("#row" + id);
    $row.remove();
    $tblSelected.prepend($row);
    $row.find("button").text("Xóa");
    $row.find("button").removeClass("btn-primary");
    $row.find("button").addClass("btn-danger");
    $row.find("button").attr("onclick", "Remove(" + id + ");");
}


function Remove(id) {
    let item = SELECTED_PRODUCTS.find(n => n.Id == id);
    ALL_PRODUCTS.push(item);
    SELECTED_PRODUCTS = SELECTED_PRODUCTS.filter(n => n.Id != id);
    var $row = $("#row" + id);
    $row.remove();
    $tblRoot.prepend($row);
    $row.find("button").text("Thêm");
    $row.find("button").removeClass("btn-danger");
    $row.find("button").addClass("btn-primary");
    $row.find("button").attr("onclick", "Add(" + id + ");");
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
            FromDateString :from,
            ToDateString : to,
            Name : name,
            Products :  SELECTED_PRODUCTS.map(n => { return { Id: n.Id } })
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
        renderTable(data, "#tbl-root");
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
        renderTableSelected(data, "#tbl-selected");
    }, 250);
});

function renderTable(data, tableId) {
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td>${formatMoney(item.GiaBanLe)}</td>
                                    <td>${formatMoney(item.InstallmentPrice)}</td>
                                    <td><button class="btn btn-primary" onclick="Add(${item.Id})">Thêm</button></td>
                 </tr>`
    ));
    $(tableId).html(html);
}

/** Xóa */
function showDelete(id, oldStock) {
    alertify.confirm("Xác nhận xóa sản phẩm ", function () {
        ajaxDelete('product/' + id, function (res) {
            if (res.IsSuccess) {
                alertify.alert("Xóa sản phẩm thành công");
                reloadPagination();
            } else {
                alertify.alert("Lỗi không xóa được sản phẩm");
                console.log(res.Message);
            }
        })
    });
}

function renderTableSelected(data, tableId) {
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td>${formatMoney(item.GiaBanLe)}</td>
                                    <td>${formatMoney(item.InstallmentPrice)}</td>
                                    <td><button class="btn btn-danger" onclick="Remove(${item.Id})">Xóa</button></td>
                 </tr>`
    ));
    $(tableId).html(html);
}