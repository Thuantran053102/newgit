$btnCoppyIframe = $("#btnCopyFrame");
$(document).ready(function () {
    initGenerateFriendlyUrl('#ipt-name', '#ipt-friendly-url');
    $('#btn-save').on('click', function () { SaveChange(); })
    initSelectSearch({
        Element: '#sl-product',
        Url: 'product/byname',
        Value: 'ProductName',
        Id: 'Id',
        Placeholder: 'Nhập tên hoặc mã sản phẩm để tìm kiếm'
    });

    ajaxGet('ProductGroup/getById/' + ID, {}, function (res) {
        if (res.IsSuccess) {
            $('#ipt-name').val(res.Result.GroupName);
            $('#ipt-note').val(res.Result.Note);
            $('#ipt-friendly-url').val(res.Result.FriendlyUrl);
            SELECTED_PRODUCTS = res.Result.Products;
            loadProduct();
            let ids = SELECTED_PRODUCTS.map(n => n.Id);
            ALL_PRODUCTS = ALL_PRODUCTS.filter(n => !ids.includes(n.Id));
            renderSelectedTable();
            renderSelectedTable();
            GenerateIFrame();
        }
    });
    $btnCoppyIframe.on('click', function () {
        showModal("#modal-iframe");

    })
    $("#ckIsShowSlide, #txtItemPerRow, #txtCountRow, #txtWidth, #txtHeigh").on('change', () => { GenerateIFrame(); })
})

/*Event tạo iframe khi đổi input*/
function GenerateIFrame() {
    let txtItemPerRow = $("#txtItemPerRow").val();
    let txtCountRow = $("#txtCountRow").val();
    let txtWidth = $("#txtWidth").val();
    let txtHeight = $("#txtHeight").val();
    let isShowSlide = $("#ckIsShowSlide").prop("checked") ? 1 : 0;;
    let iframe = `<iframe style="width:100%;height:100%;" allowfullscreen="true" src="https://dienmaycongthanh.vn/IFrameGroup/${$('#ipt-friendly-url').val()}/${txtItemPerRow}/${txtCountRow}/${isShowSlide}"></iframe>
            `;
    $("#txtFrameResult").val(iframe);
}
function CopyClipBoard() {
    navigator.clipboard.writeText($("#txtFrameResult").val());
    alertify.success("Copy thành công");
}
function SaveChange() {
    let name = $.trim($('#ipt-name').val());
    let note = $.trim($('#ipt-note').val());
    if (name == '') {
        alertify.error("Tên nhóm không được trống");
        return;
    }

    alertify.confirm("Bạn có chắc muốn cập nhật nhóm", function () {
        var group = {
            Id: ID,
            GroupName: name,
            Note: note,
            FriendlyUrl: $("#ipt-friendly-url").val(),
            Products: SELECTED_PRODUCTS.map(n => { return { Id: n.Id } })
        };
        if (SELECTED_PRODUCTS.length == 0) {
            alertify.error("Chọn ít nhất 1 sản phẩm");
            return;
        }
        ajaxPut('ProductGroup', group, function (res) {
            if (res.IsSuccess) {
                alertify.success("Cập nhật nhóm thành công");
            } else {
                alertify.alert("Có lỗi xảy ra: " + res.Message);
            };
        })
    })

}