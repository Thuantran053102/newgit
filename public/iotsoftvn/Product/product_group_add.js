
$(document).ready(function () {
    $('#btn-save').on('click', function () { SaveChange(); })
    initGenerateFriendlyUrl('#ipt-name','#ipt-friendly-url');
    loadProduct();
})
function SaveChange() {
    let name = $.trim($('#ipt-name').val());
    let note = $.trim($('#ipt-note').val());
    if (name == '') {
        alertify.error("Tên nhóm không được trống");
        return;
    }
    alertify.confirm("Bạn có chắc muốn thêm nhóm", function () {
        var group = {
            GroupName: name,
            Note: note,
            Products: SELECTED_PRODUCTS.map(n => { return { Id: n.Id } }),
            FriendlyUrl: $("#ipt-friendly-url").val()
        };
        if (SELECTED_PRODUCTS.length == 0) {
            alertify.error("Chọn ít nhất 1 sản phẩm");
            return;
        }
        ajaxPost('ProductGroup', group, function (res) {
            if (res.IsSuccess) {
                alertify.success("Tạo nhóm sản phẩm thành công");
                $tblSelected.html("");
                ALL_PRODUCTS = [...ALL_PRODUCTS, ...SELECTED_PRODUCTS];
                SELECTED_PRODUCTS = [];
                renderRootTable();

            } else {
                alertify.alert("Có lỗi xảy ra: " + res.Message);
            };
        })
    })

}