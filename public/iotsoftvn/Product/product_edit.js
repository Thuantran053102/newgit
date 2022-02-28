var $btnSticker = $('#btn-sticker');
var $cbIsShowSticker = $("#cb-sticker");
var $imgSticker = $('#img-sticker');
var $slCategoryProperty = $('#sl-category');
var $tblProperties = $('#tbl-Properties');
var AllPropertiesCurrentCategory = [];

var oldUrl = ROOT_PRODUCT.FriendlyUrl;
var newUrl = "";
var FILES = [];
function firstRender() {
    ajaxGet('Property/ByCategoryMultiple/' + $slCategoryProperty.val(), null, function (res) {
        if (res.IsSuccess) {
            AllPropertiesCurrentCategory = [...res.Result];
        }
    }, null, false)
    for (var i = 0; i < ROOT_PRODUCT.ProductProperties.length; i++) {
        addPropertyRow(ROOT_PRODUCT.ProductProperties[i].Property.Id,
            ROOT_PRODUCT.ProductProperties[i].Values.map(n => parseInt(n.Id)))
    }


}
/*Thêm từ row vào table
currentId: Khi đổi template sẽ truyền curentId và , lấy giá trị,
currentValueIds: Gia tri cua prop
*/
function addPropertyRow(currentId = null, currentValueIds = []) {
    if ($slCategoryProperty.val().length == 0) {
        alert.error("Chọn danh mục sản phẩm trước");
        return;
    }
    if (AllPropertiesCurrentCategory.length == 0) {
        ajaxGet('Property/ByCategoryMultiple/' + $slCategoryProperty.val(), null, function (res) {
            AllPropertiesCurrentCategory = res.Result;
        }, null, false)
    }
    if (AllPropertiesCurrentCategory)
        var id = "PR" + new Date().getTime();
    let html = `<tr id="${id}">
                        <td style="width: 15%">
                            <select class="form-control sl-pro select2" id="${id + 'pro'}" data-toggle="select-no-search">
                                ${AllPropertiesCurrentCategory.map(n => '<option value=' + n.Id + '>' + n.PropertyName + '</option>')}
                            </select>
                        </td>
                        <td>
                            <select id="${id + 'val'}" class="sl-val  select2-prop select2 form-control select2-multiple" data-toggle="select" multiple="multiple">
                            </select>
                        </td>
                        <td class="text-center px-w-50">
                                        <span>
                                            <i id="${id + 'btnAddVal'}"  data-toggle="tooltip" title="Thêm mới giá trị" class="mdi mdi-plus-circle mdi-18px cursor-pointer text-primary"></i>
                                            <i  id="${id + 'remove'}" class=" ml-3 mdi mdi-trash-can  mdi-18px cursor-pointer text-danger"></i>
                                        </span>
                        </td>
                    </tr>`;
    $tblProperties.append(html);
    let $slPro = $('#' + id + 'pro');
    let $slVal = $('#' + id + 'val');
    $slPro.select2();
    $slPro.val('');
    $slVal.select2();
    $slPro.on('change', function () {
        ajaxGet('property/' + $('#' + id + 'pro').val(), null, function (res) {
            if (res.IsSuccess) {
                let htmlOption = "";
                $.each(res.Result.Values, function (index, item) {
                    htmlOption += `<option value="${item.Id}">${item.Value}</option>`;
                })
                $slVal.html(htmlOption);
                $slVal.select2();
                $slVal.val(currentValueIds).trigger('change');
            }
        }, null, false)
    })
    $('#' + id + 'remove').on('click', function () {
        $('#' + id).fadeOut(function () { $('#' + id).remove(); })
    })
    if (currentId != null)
        $slPro.val(currentId).trigger('change');
    $('#' + id + 'btnAddVal').unbind().on('click', function () {
        $('#div-modal-property-add').hide();
        $('#modal-title').text("Thêm mới giá trị thuộc tính " + $slPro.val());
        $('#modal-label').text("Nhập giá trị thuộc tính");
        if (IsNullOrEmpty($slPro.val())) {
            alertify.alert("Chưa chọn thuộc tính");
            return;
        }
        showModal('#modal-add-value', '#btn-add', function () {
            let value = $('#ipt-value').val();// input trong modal
            if (IsNullOrEmpty(value))
                alertify.alert("Nhập giá trị thuộc tính");
            else {
                ajaxPost('Value', {
                    PropertyId: parseInt($slPro.val()),
                    Value: value
                }, function (res) {

                    if (res.IsSuccess) {
                        alertify.alert("Thêm thành công");
                        $slVal.prepend(`<option value="${res.Result.Id}">${res.Result.Value}</option>`)
                        $('#ipt-value').val();
                    }

                });
            }
        })

    })
}


$(document).ready(function () {
	//Thêm option bảo hành 18 thangs
	$('select[name="baoHanh"]').html(
													`<option value="Không bảo hành" data-select2-id="431">Không bảo hành</option>
													<option value="1 tháng" >1 tháng</option>
													<option value="3 tháng" >3 tháng</option>
													<option value="6 tháng" >6 tháng</option>
													<option value="12 tháng"  selected="" >12 tháng</option>
													<option value="18 tháng" >18 tháng</option>
													<option value="24 tháng" >24 tháng</option>
													<option value="30 tháng" >30 tháng</option>
													<option value="36 tháng" >36 tháng</option>
													<option value="48 tháng" >48 tháng</option>
													<option value="60 tháng" >60 tháng</option>`

);
	
    firstRender();
    initProductBrand('#sl-brand', false, function () {
        let idsBrand = ROOT_PRODUCT.ProductBrand.Id;
        $('#sl-brand').val(idsBrand).trigger('change')
    });
    initProductCategory('#sl-category', false, function () {

        let idsCategory = ROOT_PRODUCT.ProductCategories.map(n => n.Id);
        $('#sl-category').val(idsCategory).trigger('change')
    });

    initGenerateFriendlyUrl('#ipt-product-name', '#ipt-product-url-Friendly');
    initProductCategory('#sl-modal-category');
    /*set value root */
    FILES = ROOT_PRODUCT.ProductImages;
    INIT_SUMMERNOTE('#editor');
    INIT_SUMMERNOTE('#hightlightProduct');
    INIT_SUMMERNOTE('#GoldrenCommitment');
    INIT_SUMMERNOTE('#promoContent');
    INIT_SUMMERNOTE('#promoBranch');
    INIT_FILE_MANAGE('#btn-img-add', function (file) {
        renderImage(file);
        FILES.push(file);
    })
    INIT_FILE_MANAGE('#btn-thumbnail-product', function (file) {
        $('#img-thumbnail-edit').attr('src', '/' + file.FilePath);
    })
    INIT_FILE_MANAGE('#btn-sticker', function (file) {
        $imgSticker.attr('src', getImagePath(file.FilePath));
    })
    $('select[name="IsGift"]').val(ROOT_PRODUCT.IsGift ? 1 : 0).trigger('change');
    $('select[name="baohanh"]').val(ROOT_PRODUCT.GurantyTime).trigger('change');

    if (ROOT_PRODUCT.StickerImage )
        $imgSticker.attr('src', ROOT_PRODUCT.StickerImage)
    $cbIsShowSticker.prop('checked', ROOT_PRODUCT.IsShowSticker);
});

/*Save change*/
$('#btn-save').on('click', function () {
    let pro = formToObject('#form-add');
    let categorys = $('#sl-category').val().map(n => parseInt(n));
    let ImageIds = FILES.map(n => n.Id);

    let content = getSummernote('#editor')
    let Hightlight = getSummernote('#hightlightProduct');
    let GoldenCommitment = getSummernote('#GoldrenCommitment');
    pro.promoContent = getSummernote('#promoContent');
    pro.promoBranch = getSummernote('#promoBranch');

    let error = '';
    if (IsNullOrEmpty(pro.productCode))
        error = "Chưa nhập mã sản phẩm";
    else if (IsNullOrEmpty(pro.productName))
        error = "Chưa nhập tên sản phẩm";
    else if (categorys.length < 1)
        error = "Chọn ít nhất 1 danh mục";
    else if (IsNullOrEmpty(pro.FriendUrl))
        error = "Chưa nhập đường dẫn sản phẩm";
    else if (!isValidFriendlyUrl(pro.FriendUrl)) {
        alertify.alert('Đường dẫn chứa kí tự không hợp lệ');
    }
    else if (IsNullOrEmpty(pro.BrandId))
        error = "Chưa chọn thương hiệu";
    else if (IsNullOrEmpty(pro.unit))
        error = "Chưa nhập đơn vị ";
    else if (IsNullOrEmpty(pro.stocNumber))
        error = "Chưa nhập số lượng tồn";
    else if (IsNullOrEmpty(pro.giaNiemYet))
        error = "Chưa nhập giá niêm yết";
    else if (IsNullOrEmpty(pro.giaBan))
        error = "Chưa nhập giá bán";
    else if (FILES.length == 0)
        error = "Chọn ít nhất 1 hình ảnh";
    else if (IsNullOrEmpty(pro.productCode))
        error = "Chưa nhập mã sản phẩm";
    else if ($('#img-thumbnail-edit').attr('src') == "/images/default-image.png") {
        error = "Chưa chọn ảnh đại diện";
    }

    if (error != "") {
        alertify.alert(error);
        return;
    } else {
        let valueId = [];
        var trs = $('#tbl-Properties tr');
        for (var i = 0; i < trs.length; i++) {
            let idProp = $(trs[i]).find('.sl-pro').val();
            let valuesId = $(trs[i]).find('.sl-val').val().map(n => parseInt(n));

            valueId.push({
                PropertyId: parseInt(idProp),
                ValueIds: valuesId
            });
        }

       
        product = {
            GoldenCommitment: GoldenCommitment,
            Note: pro.Note,
            ProductName: pro.productName,
            ProductCode: pro.productCode,
            Description: $.trim(content),
            ProductCategoryId: 0,
            ProductBrandId: parseInt(pro.BrandId),
            IsGift: pro.IsGift == '0' ? false : true,
            IsAllowGifting: true,
            StockNumber: parseInt(pro.stocNumber),
            PromotionContent: $.trim(pro.promoContent),
            PromotionBranch: $.trim(pro.promoBranch),
            PromotionBranchDeadlineString: $('#dtpk-promo-deadline').val(),
            Origin: pro.origin,
            OriginPrice: parseInt(pro.giaNiemYet.replace(/,/g, '')),
            GiaBanLe: parseInt(pro.giaBan.replace(/,/g, '')),
            InstallmentPrice: parseInt(pro.InstallmentPrice.replace(/,/g, '')),
            PublicPrice: 0,
            HighlightProduct: Hightlight,
            GurantyTime: pro.baoHanh,
            FriendlyUrl: pro.FriendUrl,
            HasGift: pro.IsGift == '0' ? false : true,
            ImageIds: ImageIds,
            CategoryIds: categorys,
            Properties: valueId,
            Unit: pro.unit,
            StickerImage: $imgSticker.attr('src'),
            IsShowSticker: $cbIsShowSticker.prop('checked'),
            IsShowPrice: $('#IshowPrice').is(":checked"),
            ThumbNail: $('#img-thumbnail-edit').attr('src').slice(1, $('#img-thumbnail-edit').attr('src').length),
        }
        ajaxPut('product/' + ROOT_PRODUCT.Id, product, function (res) {
            if (res.IsSuccess) {
                newUrl = product.FriendlyUrl; newUrl = product.FriendlyUrl;
                alertify.success("Cập nhật sản phẩm thành công");
            } else {

                alertify.alert(res.Message);
            }
        });
    }
});

//=================================
var FILES = [];
/*Binding đổi template khi chọn category*/
$('#sl-category').on('change', function () {
    var CategoryId = $('#sl-category').val();
    if (IsNullOrEmpty(CategoryId)) return;
    initSelect({
        Element: '#sl-template',
        Url: 'template/ByMutiCategoryIds/' + CategoryId.join(','),
        Value: 'PropertyTemplateName',
        Id: 'Id',
        Placeholder: ''
    }, false, function () {
        //$('#sl-template').val("").trigger('change');
    });



});

/*Binding đổi template khi chọn category*/
$('#sl-template').on('change', function () {
    $tblProperties.html("");
    let id = $('#sl-template').val();
    if (IsNullOrEmpty(id)) return;
    ajaxGet("Template/" + id, null, (res) => {
        if (res.IsSuccess) {
            let data = res.Result;
            if (data.length == 0) return;
            let properties = data.Properties;
            for (var i = 0; i < properties.length; i++) {
                addPropertyRow(properties[i].Id);
            }
        }
    });

});

/*Render html khi chọn hình ảnh*/
function renderImage(file) {
    let html = ` <div id = "product-img-${file.Id}" class="col-md-2 container-image">
                             <img class="img-auto-size" src="${getImagePath(file.FilePath)}" />
                             <button onclick="removeImg(${file.Id})" type="button" class="btn btn-danger btn-remove-image d-none"><i class="mdi mdi-trash-can font-16"></i></button>
                         </div>`;
    $('#divImage').append(html);
}

/*Xóa  hình ảnh*/
function removeImg(id) {
    FILES = FILES.filter(n => n.Id != id);
    $("#product-img-" + id).remove();
}


/*Thêm mới thuộc tính*/
$('#btn-property-add').on('click', function () {
    $('#modal-title').text("Thêm mới thuộc tính");
    $('#modal-label').text("Nhập tên thuộc tính");
    $('#div-modal-property-add').show();
    $('#sl-modal-category').html();
    showModal('#modal-add-value', '#btn-add', function () {
        let CategoryId = $('#sl-modal-category').val();
        let value = $('#ipt-value').val();
        if (IsNullOrEmpty(value))
            alertify.alert("Chưa nhập giá trị");
        else if (IsNullOrEmpty(CategoryId))
            alertify.alert("Chưa chọn danh mục");
        else {
            let check = $('#sl-category').val().includes(CategoryId);
            if (!check) {
                alertify.confirm("Danh mục thuộc tính đang chọn không thuộc danh mục sản phẩm đang chọn, Xác nhận thêm thuộc tính", function () {
                    ajaxPost('Property', {
                        CategoryId: parseInt(CategoryId),
                        PropertyName: value,
                        ValueIds: []
                    }, function (res) {
                        if (res.IsSuccess) {

                            alertify.success("Thêm thành công")

                        } else {
                            alertify.alert(res.Message)
                        }

                    });
                });
            } else {
                ajaxPost('Property', {
                    CategoryId: parseInt(CategoryId),
                    PropertyName: value,
                    ValueIds: []
                }, function (res) {
                    if (res.IsSuccess) {

                        alertify.success("Thêm thành công")
                        AllPropertiesCurrentCategory.push(res.Result);
                        $('.sl-pro').append(`<option value="${res.Result.Id}">${res.Result.PropertyName}</option>`);
                    } else {
                        alertify.alert(res.Message)
                    }
                });
            }
        }
    })
})
