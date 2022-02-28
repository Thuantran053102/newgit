var $tblRoot = $("#tbl-root");
var $tblSelected = $("#tbl-selected");
var ALL_PRODUCTS = [], SELECTED_PRODUCTS = [];

function loadProduct() {
    ajaxGet('Product/AllProductOnSale', {}, function (res) {
        if (res.IsSuccess) {
            ALL_PRODUCTS = res.Result;
            renderRootTable(ALL_PRODUCTS, "#tbl-root")
        } else {
        }
    })
}
function Add(id) {
    let item = ALL_PRODUCTS.find(n => n.Id == id);
    SELECTED_PRODUCTS.unshift(item);
    ALL_PRODUCTS = ALL_PRODUCTS.filter(n => n.Id != id);
    var $row = $("#row" + id);
    $row.remove();
    renderSelectedTable();
}


function Remove(id) {
    let item = SELECTED_PRODUCTS.find(n => n.Id == id);
    ALL_PRODUCTS.unshift(item);
    SELECTED_PRODUCTS = SELECTED_PRODUCTS.filter(n => n.Id != id);
    var $row = $("#row" + id);
    $row.remove();
    renderRootTable();
    renderSelectedTable();
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


function renderRootTable(data = null) {
    if (data == null) data = ALL_PRODUCTS;
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td class="text-right">${item.StockNumber} </td>
                                    <td>${formatMoney(item.GiaBanLe)}</td>
                                    <td>${formatMoney(item.InstallmentPrice)}</td>
                                    <td><button class="btn btn-primary" onclick="Add(${item.Id})">Thêm</button></td>
                 </tr>`
    ));
    $tblRoot.html(html);
}

function renderSelectedTable(data = null) {
    if (data == null) data = SELECTED_PRODUCTS;
    var html = data.map((item, index) => (
        ` <tr id="row${item.Id}">
                                    <td class="text-center ">${index + 1}</td>
                                    <td>${item.ProductCode}</td>
                                    <td class="text-lowercase">${item.ProductName} </td>
                                    <td class="text-right">${item.StockNumber} </td>
                                    <td>${formatMoney(item.GiaBanLe)}</td>
                                    <td>${formatMoney(item.InstallmentPrice)}</td>
                                    <td><button class="btn btn-danger" onclick="Remove(${item.Id})">Xóa</button></td>
                 </tr>`
    ));
    $tblSelected.html(html);
}