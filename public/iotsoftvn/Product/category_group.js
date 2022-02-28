
var $btnStickerAdd = $('#btn-sticker-add');
var $cbIsShowStickerAdd = $("#cb-sticker-add");
var $imgStickerAdd = $("#img-sticker-add");

var $btnStickerEdit = $('#btn-sticker-edit');
var $cbIsShowStickerEdit = $("#cb-sticker-edit");
var $imgStickerEdit = $("#img-sticker-edit")

$(document).ready(function () {
    reloadTable();
    initSelectCategory();
    reloadTableGroup();
    INIT_FILE_MANAGE("#btn-sticker-add", function (file) {
        $imgStickerAdd.attr('src', getImagePath(file.FilePath))
    })
    INIT_FILE_MANAGE("#btn-sticker-edit", function (file) {
        $imgStickerEdit.attr('src', getImagePath(file.FilePath))
    })

    INIT_FILE_MANAGE("#img-logo-add", function (file) {
        BANNER = file.FilePath;
        $('#img-logo-add').attr('src', getImagePath(file.ThumbNailPath))
    })
    INIT_FILE_MANAGE("#img-logo-edit", function (file) {
        BANNER = file.FilePath;
        $('#img-logo-edit').attr('src', getImagePath(file.ThumbNailPath))
    })

    INIT_FILE_MANAGE("#img-icon-group-add", function (file) {
        BANNER = file.FilePath;
        $('#img-icon-group-add').attr('src', getImagePath(file.ThumbNailPath))
    })
    INIT_FILE_MANAGE("#img-icon-group-edit", function (file) {
        BANNER = file.FilePath;
        $('#img-icon-group-edit').attr('src', getImagePath(file.ThumbNailPath))
    })
    $("#sl-group-add, #sl-group-edit").on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

});
/*DECLARE VARIABLE*/
var BANNER = "~/images/default-avatar.jpg";
var CURRENT_ID_IMG = 0;
var KEY_WORD = "";
/*Binding add */
$("#form-add-category").on('submit', function (e) {
    e.preventDefault();
    try {
        let name = $("#ipt-add-name").val();
        if (!!name) {
            ajaxPost('ProductCategory', {
                CategoryName: name,
                FriendlyUrl: MakeUrl(name),
                Note: $('#ipt-add-note').val(),
                Banner: BANNER,
                StickerImage: $imgStickerAdd.attr('src'),
                IsShowSticker: $cbIsShowStickerAdd.prop('checked')
            },
                function (rs) {
                    if (rs.IsSuccess) {
                        alertify.success("Thêm thành công")
                        $("#ipt-add-name").val("");
                        $("#ipt-add-note").val("");
                        hideModal('#modal-category-add')
                        reloadTable();
                    } else {
                        alertify.error(rs.Message);
                    }
                }
            );
        } else {
            alertify.alert("Tên danh mục không được để trống");
        }
    } catch (e) {
        alertify.error(e);
    }
});
///*Binding search */
$("#ipt-text-search").keyup(function (e) {
    delay(function () {
        KEY_WORD = e.target.value;
        reloadTable()
    }, 250);
});

/*FUNCTION*/
/*Hiển thị modal edit category*/
function showModalEdit(id, name, note, banner, isShowSticker, StickerImage) {
    $("#ipt-edit-name").val(name);
    $("#ipt-edit-note").val(getEmptyOrDefault(note));
    $("#img-logo-edit").attr('src', '/' + banner);
    $imgStickerEdit.attr('src', StickerImage);
    $cbIsShowStickerEdit.prop('checked', isShowSticker);
    showModal("#modal-edit-category");
    /*Binding edit */
    $("#form-edit-category").unbind().on('submit', function (e) {
        e.preventDefault();
        try {
            let name = $("#ipt-edit-name").val();
            if (IsNullOrEmpty(name)) {
                alertify.alert("Tên danh mục không được để trống");
            }
            if (!!name) {
                ajaxPut('ProductCategory/' + id, {
                    CategoryName: name,
                    Note: $('#ipt-edit-note').val(),
                    Banner: BANNER,
                    StickerImage: $imgStickerEdit.attr('src'),
                    IsShowSticker: $cbIsShowStickerEdit.prop('checked')
                },
                    function (rs) {
                        if (rs.IsSuccess) {
                            $("#ipt-edit-name").val("");
                            reloadTable();
                            hideModal("#modal-edit-category");
                        } else {
                            alertify.error(rs.Message);
                        }
                    }
                );
            }
        } catch (e) {
            alertify.error(e.Message);
        }
    });

    $('#btn-delete').unbind().on('click', function (e) {
        alertify.confirm("Xác nhận xóa danh mục", function () {
            ajaxDelete('ProductCategory/' + id, function (res) {
                if (res.IsSuccess) {
                    alertify.success("Xóa thành công")
                    $('#category-' + id).remove();
                    hideModal('#modal-edit-category');
                }
                else alertify.error(rs.Message);
            });
        });
    });
}
/*Reload table category*/
function reloadTable() {
    ajaxGet('ProductCategory', { keyword: KEY_WORD }, res => {
        if (res.IsSuccess) {
            let html = '';
            let data = res.Result;
            if (data.length == 0) {
                html = htmlEmptyTable(5);
            } else {
                html = data.map((item, i) => (
                    ` <tr id="category-${item.Id}" onclick="showModalEdit(${item.Id},'${item.CategoryName}','${item.Note == null ? '' : item.Note}','${item.Banner == null ? '' : item.Banner}',${item.IsShowSticker},'${item.StickerImage}')" class="cursor-pointer">
                                                    <td class="stt">${i + 1}</td>
                                                     <td class="stt"><img src="/${item.Banner}" onerror="this.src='/images/default-image.png'" class="mr-2 img-fluid"></td>
                                                    <td>${item.CategoryName}</td>
                                                    <td>${getEmptyOrDefault(item.Note)}</td>
                                                    <td><img src='${item.StickerImage}' class="img-fluid" style="max-width:70px;"  onerror="this.src='/images/default-image.png'" /></td>
                                                    <td class="text-right">${item.CountProduct}</td>
                                                </tr>`
                ));
            }
            $('#tbl-body').html(html);
        }
    });
}

//====================================================================================================================================================
/*init category group*/
async function initSelectCategory(categories = null) {
    ajaxGet('ProductCategory/NoGroupCategory', null, function (res) {
        if (res.IsSuccess) {
            let data = res.Result;
            if (categories != null)
                data = [...data, ...categories];
            let html = data.map(item => (`<option value="${item.Id}">${item.CategoryName}</option>`));
            $('#sl-group-add').html(html);
            $('#sl-group-edit').html(html);
            if (categories != null)
                $('#sl-group-edit').val(categories.map(n => n.Id)).trigger('change');

        } else {
            alertify.error(res.Message);
        }
    });

}
/*Binding add */
$("#form-group-add").on('submit', function (e) {
    e.preventDefault();
    try {
        let name = $("#ipt-name-group-add").val();
        let note = $("#ipt-note-group-add").val();
        let categoryIds = stringToInt($("#sl-group-add").val());

        if (IsNullOrEmpty(name))
            alertify.alert("Tên nhóm danh mục không được để trống");
        else if (categoryIds.length == 0)
            alertify.alert("Chọn ít nhất 1 danh mục");
        else {
            ajaxPost('ProductCategoryGroup', { GroupName: name, Note: note, CategoryIds: categoryIds, Icon: $("#img-icon-group-add").attr("src") },
                function (rs) {
                    if (rs.IsSuccess) {
                        alertify.success("Thêm thành công")
                        reloadTableGroup();
                        hideModal("#modal-group-add");
                    } else {
                        alertify.error(rs.Message);
                    }
                }
            );
        }
    } catch (e) {
        alertify.alert(e);
    }
});
/*Hiển thị modal edit group*/
function showModalEditGroup(id) {
    ajaxGet('ProductCategoryGroup/' + id, null, function (res) {
        if (res.IsSuccess) {
            let data = res.Result;
            initSelectCategory(data.Categories);
            var ids = data.Categories.map(n => n.Id);
            $("#ipt-name-group-edit").val(data.GroupName);
            $("#ipt-note-group-edit").val(getEmptyOrDefault(data.Note));
            if (IsNullOrEmpty(data.Icon))
                data.Icon = '/images/ic_arrow_right.png';
            $("#img-icon-group-add").attr("src", data.Icon)
            showModal('#modal-group-edit');
        } else {
            alertify.error(res.Message);
        }
    });
    /*Binding edit */
    $("#form-group-edit").unbind().on('submit', function (e) {
        e.preventDefault();
        try {
            let name = $("#ipt-name-group-edit").val();
            let note = $("#ipt-note-group-edit").val();
            let categoryIds = stringToInt($("#sl-group-edit").val());
            if (!!name) {
                ajaxPut('ProductCategoryGroup/' + id,
                    {
                        GroupName: name,
                        Note: note,
                        CategoryIds: categoryIds,
                        Icon: $("#img-icon-group-edit").attr("src")
                    },
                    function (rs) {
                        if (rs.IsSuccess) {
                            alertify.success('Cập nhật thành công');
                            $("#ipt-edit-name").val("");
                            reloadTableGroup();
                            hideModal("#modal-group-edit");
                        } else {
                        }
                    }
                );
            }
        } catch (e) {

        }
    });

    /*Binding search */
    $('#btn-group-delete').unbind().on('click', function (e) {
        alertify.confirm("Xác nhận xóa danh mục", function () {
            ajaxDelete('ProductCategoryGroup/' + id, function (res) {
                if (res.IsSuccess) {
                    alertify.success("Xóa thành công")
                    $('#category-' + id).remove();
                    hideModal('#modal-group-edit');
                    reloadTableGroup();
                }
                else alertify.error(res.Message);
            });
        });
    });

}
/*Reload table category group*/
function reloadTableGroup() {
    ajaxGet('ProductCategoryGroup', { keyword: '' }, res => {
        if (res.IsSuccess) {
            let data = res.Result;
            let html = data.map((item, i) => (
                ` <tr id="category-${item.Id}" onclick="showModalEditGroup(${item.Id})" class="cursor-pointer">
                                                                         <td class="stt">${i + 1}</td>
                                                                         <td ><img src="${item.Icon}" style="max-width:30px;"/></td>
                                                                         <td>${item.GroupName}</td>
                                                                         <td>${getBadgeCategory(item.Categories)}</td>
                                                                     </tr>`
            ));
            $('#tbl-body-group').html(html);
        }
    });
    function getBadgeCategory(categories) {
        let html = categories.map(n => (`<span class="badge badge-primary-lighten">${n.CategoryName}</span>`))
        return html;
    }
}