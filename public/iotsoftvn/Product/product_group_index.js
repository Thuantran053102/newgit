var PAGE_INDEX = 1;

$(document).ready(function () {
    load();
})
function load() {
    ajaxGet('ProductGroup/GetFilter?keysearch=' + $('#ipt-text-search').val(), {}, function (res) {
        if (res.IsSuccess) {
            var html = res.Result.map((item, index) => (
                ` <tr class='hover-point cursor-pointer'>
                                            <td  onclick="showDetail(${item.Id})" class="text-center ">${index + 1}</td>
                                            <td  onclick="showDetail(${item.Id})">${item.GroupName}</td>
                                            <td  onclick="showDetail(${item.Id})">${getEmptyOrDefault(item.FriendlyUrl)}</td>
                                            <td  onclick="showDetail(${item.Id})" class="text-right">${item.CountProduct}</td>
                                            <td  onclick="showDetail(${item.Id})">${item.Note}</td>
                                            <td  onclick="showDetail(${item.Id})">${item.CreatedDate}</td>
                                            <td  ><i class="mdi mdi-delete font-18 cursor-pointer text-danger" onclick="remove(${item.Id})"></i></td>
                                        </tr>`
            ));
            if (html == '')
                html = htmlEmptyTable(5);
            $("#tbl-body").html(html);
        } else {
        }
    })
}
/** Binding event search */
$('#ipt-text-search').keyup(function () {
    delay(function () {
        load();
    }, 250);
});

function showDetail(id) {
    window.location.href = '/admin/product-group/detail/'+id;
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
function remove(id) {
    alertify.confirm("Bạn có chắc muốn xóa nhóm", function () {
        ajaxDelete('ProductGroup/' + id, function (res) {
            if (res.IsSuccess) {
                alertify.alert("Xóa nhóm thành công", function () {
                    load();
                });
            } e
        })
    })
}