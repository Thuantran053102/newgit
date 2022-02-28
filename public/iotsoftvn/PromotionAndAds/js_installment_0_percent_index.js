var PAGE_INDEX = 1;

$(document).ready(function () {
    load();
})
function load() {
    ajaxGet('installment/GetByIndex', {}, function (res) {
        if (res.IsSuccess) {
            var html = res.Result.map((item, index) => (
                ` <tr class="cursor-pointer">
                                            <td onclick="showDetail(${item.Id})" class="text-center ">${index + 1}</td>
                                            <td onclick="showDetail(${item.Id})">${item.Name}</td>
                                            <td onclick="showDetail(${item.Id})">${item.InstallmentBankName}</td>
                                            <td onclick="showDetail(${item.Id})">${item.FromDateString}</td>
                                            <td onclick="showDetail(${item.Id})">${item.ToDateString}</td>
                                            <td class="text-right" onclick="showDetail(${item.Id})">${item.CountProduct}</td>
                                            <td onclick="showDetail(${item.Id})">${item.IsActive ? "<span class='badge badge-primary'>Đang hoạt động</span>" : "<span class='badge badge-danger'>Đã kết thúc</span>"}</td>
                                            <td><i class="mdi mdi-delete font-18 cursor-pointer text-danger" onclick="remove(${item.Id})"></i></td>
                                        </tr>`
            ));
            if (html == '')
                html = htmlEmptyTable(5);
            $("#tbl-body").html(html);
        } else {
        }
    })
}
function remove(id) {
    alertify.confirm("Xác nhận xóa chương trình", function () {
        ajaxDelete('Installment/' + id, function (res) {
            if (res.IsSuccess) {
                alertify.success("Xóa thành công");
                load();
            } else {
                alertify.error(res.Message);
            }
        })

    })
}
/** Binding event search */
$('#ipt-text-search').keyup(function () {
    delay(function () {
        load();
    }, 250);
});

function showDetail(id) {
    window.location.href = '/admin/promotion/installmentedit/' + id;
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