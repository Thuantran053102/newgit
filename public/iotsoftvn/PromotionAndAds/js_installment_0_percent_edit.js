
var $tblRoot = $("#tbl-root");
var $tblSelected = $("#tbl-selected");
var ALL_PRODUCTS = [], SELECTED_PRODUCTS = [];
var $iptName = $("#ipt-name");
var $iptFromDate = $("#dtpk-from-date");
var $iptToDate = $("#dtpk-to-date");
var $slBank = $("#sl-bank");


$(document).ready(function () {

    ajaxGet("installment/byid/" + ID, {}, function (res) {
        if (res.IsSuccess) {
            initSelect({
                Element: '#sl-bank',
                Url: 'InstallmentBank/get-all',
                Value: 'BankName',
                Id: 'Id',
                Placeholder: ''
            }, false, function () {
                $slBank.val(item.InstallmentBankId).trigger("change");
            });

            SELECTED_PRODUCTS = res.Result.Products;
            let item = res.Result;
            $iptName.val(item.Name);
            $iptFromDate.val(item.FromDateString);
            $iptToDate.val(item.ToDateString);
            ajaxGet('Product/AllProductOnSale', {}, function (res2) {
                if (res2.IsSuccess) {
                    let ids = SELECTED_PRODUCTS.map(n => { return n.Id });
                    ALL_PRODUCTS = res2.Result.filter(n => !ids.includes(n.Id));


                    renderTable(ALL_PRODUCTS, "#tbl-root")
                    renderTableSelected(SELECTED_PRODUCTS, "#tbl-selected")
                } else {
                }
            })
        }

    })

})

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
    var from = $iptFromDate.val();
    var to = $iptToDate.val();
    var name = $iptName.val();
    var bankId = $slBank.val();
    if (IsNullOrEmpty(name))
        alertify.error("Tên không được để trống");
    else if (SELECTED_PRODUCTS.length < 1)
        alertify.error("Chưa chọn sản phẩm");
    else {
        let d = {
            Id: ID,
            InstallmentBankId: parseInt(bankId),
            FromDateString: from,
            ToDateString: to,
            Name: name,
            Products: SELECTED_PRODUCTS.map(n => { return { Id: n.Id } })
        }
        ajaxPut('installment', d, function (res) {
            if (res.IsSuccess) {
                alertify.alert("Cập nhật thành công", function () {
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
        let data = SELECTED_PRODUCTS.filter(n => (n.ProductCode + n.ProductName).Search($('#ipt-text-search-root').val()));
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
$('#ipt-text-search-selected').keyup(function () {
    delay(function () {
        let vl = removeUnicode($('#ipt-text-search-selected').val());
        let data = SELECTED_PRODUCTS.filter(n => {
            let text = (n.ProductCode + n.ProductName);
            if (removeUnicode(text).includes(vl))
                return n;
        });
        renderTable(data, "#tbl-selected");
    }, 250);
});

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