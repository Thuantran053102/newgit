var PRODUCTS = [];
$(document).ready(() => {
    $("#tbody").html(htmlEmptyTable(12, "Chưa có dữ liệu đồng bộ"));

})
function getSyncPrice() {
    let loadingHtml = ` <tr>
        <td class="text-center" colspan="12"><i class="mdi mdi-48px mdi-spin mdi-loading"></i> Đang tải dữ liệu đồng bộ</td>
    </tr>`;
    $("#tbody").html(loadingHtml);
    ajaxGet('product/syncPrice', {}, function (res) {
        if (res.IsSuccess) {
            PRODUCTS = res.Result;
            var html = PRODUCTS.map((item, i) => {
				item.ProductID =  item.ProductID.trim();
                var SttGiaNiemYet = "";
                if (item.GiaNiemYet > item.GiaNiemYetCu)
                    SttGiaNiemYet = `<span class=" text-success  mdi mdi-arrow-up-bold"></span>`;
                else if (item.GiaNiemYet < item.GiaNiemYetCu)
                    SttGiaNiemYet = `<span class="text-danger  mdi mdi-arrow-down-bold"></span>`;
                var SttGiaBanLe = "";
                if (item.GiaBanLe > item.GiaBanLeCu)
                    SttGiaBanLe = `<span class=" text-success  mdi mdi-arrow-up-bold"></span>`;
                else if (item.GiaBanLe < item.GiaBanLeCu)
                    SttGiaBanLe = `<span class=" text-danger  mdi mdi-arrow-down-bold"></span>`;

                var SttSoTon = "";
                if (item.SoLuongTon > item.SoLuongTonCu)
                    SttSoTon = `<span class=" text-success  mdi mdi-arrow-up-bold"></span>`;
                else if (item.SoLuongTon < item.SoLuongTonCu)
                    SttSoTon = `<span class=" text-danger  mdi mdi-arrow-down-bold"></span>`;

                let subHtml = ` 
                                        <tr id="row${item.ProductID}">
                                            <td class="">${(i + 1)}</td>
                                            <td>${item.ProductID}</td>
                                            <td>${item.TenSanPham}</td>
                                            <td class="text-right">${formatMoney(item.GiaNiemYetCu)}</td>
                                            <td class="text-right">${formatMoney(item.GiaNiemYet)} ${SttGiaNiemYet}</td>
                                            <td class="text-right">${formatMoney(item.GiaBanLeCu)} </td>
                                            <td class="text-right">${formatMoney(item.GiaBanLe)} ${SttGiaBanLe} </td>
                                            <td class="text-right">${item.SoLuongTonCu}</td>
                                            <td class="text-right">${item.SoLuongTon} ${SttSoTon}</td>
                                            <td class="">${item.GhiChu} </td>
                                            <td class="">${getEmptyOrDefault(item.ThongTinKhuyenMai)} </td>
                                            <td class="">${item.XuatSu} </td>
                                            <td class="">${item.HanSuDung} </td>
                                            <td class="text-right""><button onclick="SyncSingle('${item.ProductID}')" class="btn-sm btn btn-primary" data-toggle="tooltip" data-placement="top" title="Đồng bộ sản phẩm ${item.TenSanPham}"><i class="mdi mdi-sync"/></button></td>
                                        </tr>`;
                return subHtml;

            });
            if (PRODUCTS.length == 0) {
                $("#tbody").html(htmlEmptyTable(12, "Chưa có dữ liệu đồng bộ"));
            } else {
                $("#tbody").html(html);
            }
            $('button[data-toggle="tooltip"]').tooltip();
        }
    })
}
function syncPrice() {

    alertify.confirm("Xác nhận đồng bộ dữ liệu "+ PRODUCTS.length + " sản phẩm", function () {
        ajaxPost('Product/syncPrice', PRODUCTS, function (res) {
            if (res.IsSuccess) {
                alertify.alert("Đồng bộ thành công " + res.Result + " / " + PRODUCTS.length + "sản phẩm");
            } else {
                alertify.alert(res.Message);
            }
        })
    })
}

function SyncSingle(code) {
    let item = PRODUCTS.find(n => n.ProductID == code.trim());
    alertify.confirm("Xác nhận đồng bộ sản phẩm " + item.TenSanPham, function () {
		item.ProductID =  item.ProductID.trim();
        ajaxPost('Product/syncPrice', [item], function (res) {
            if (res.IsSuccess) {
                alertify.alert("Đồng bộ thành công sản phẩm " + item.TenSanPham);
                $("#row" + code).fadeOut();
                $("#row" + code).remove();

            } else {
                alertify.error(res.Message);
                getEmptyTemplateForDiv
            }
        })
    })
}
