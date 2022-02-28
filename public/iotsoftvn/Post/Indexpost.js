$(document).ready(function () {
    initSelect({
        Element: '#sl-category',
        Url: 'PostCategory',
        Value: 'Name',
        Id: 'Id',
        Placeholder: 'Nhập tên danh mục ...'
    }, true);
    //Record
    $("#sel-record-search").change(function () {
        delay(function () {
            loadTable();
        }, 250);
    });

    //Category
    $("#sl-category, #ipt-date").change(function () {
        delay(function () {
            loadTable();
        }, 250);
    });

    //search
    $("#ipt-text-search").keyup(function () {
        delay(function () {
            loadTable();
        }, 250);
    });


    loadTable();
});

/** Load table */
function loadTable() {
    $('#div-pagination-selection').twbsPagination('destroy');
    initPagination();
}

/** init Pagination */
function initPagination() {
    let dates = getDateRangeValue("#ipt-date");
    let keyword = $('#ipt-text-search').val();
    let pageItem = $('#sel-record-search').find('option:selected').val();
    let categoryId = !!!$('#sl-category').val() ? 0 : $('#sl-category').val();
    let d = {
        keyword,
        categoryId,
        pageItem,
        fromDate: dates.startDate,
        toDate: dates.endDate,
        pageIndex: 0,
    };
    ajaxGet('Post', d, function (data) {
        if (data.IsSuccess) {
            let totalPage = data.Result.TotalPage;
            if (totalPage == 0) {
                renderTable([]);
                return;
            } else if (totalPage > 0) {
                $('#div-pagination-selection').twbsPagination({
                    totalPages: totalPage,
                    visiblePages: 5,
                    initiateStartPageClick: true,
                    hideOnlyOnePage: true,
                    paginationClass: 'pagination pagination-rounded',
                    first: '←',
                    last: '→',
                    prev: '«',
                    next: '»',
                    onPageClick: function (event, page) {
                        ajaxGet('Post', d, function (res) {
                            if (res.IsSuccess) {
                                renderTable(res.Result.Data, pageItem, page, data.Result.TotalRow);
                            } else {
                                alertify.error(res.Message);
                            }
                        });
                    }
                });
            } else {
                $('#div-pagination-selection').empty();
            }
        } else {
            alertify.alert(data.Message);
        }
    }, "json");
}

/** Render table */
function renderTable(data, pageItem, pageIndex, totalRow) {
    let html = data.map((item, index) => {
        return `
                                    <tr>
                                        <td class="text-center">${index + 1}</td>
                                        <td>${item.PostCategory.Name}</td>
                                        <td>${item.Title}</td>
                                        <td>${getEmptyOrDefault(item.CreatedUser.FullName)}</td>
                                        <td>${getEmptyOrDefault(item.CreatedUser.CreatedDate)}</td>
                                        <td>${item.Type == 1 ? `<span class="badge badge-danger-lighten">Ẩn</span>` : `<span class="badge badge-success-lighten">Hiện</span>`}</td>
                                        <td class="text-center px-w-50">
                                            <div class="dropdown">
                                                <a class="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown"><i class="mdi mdi-dots-vertical font-18 text-primary"></i></a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <a href="/${item.FriendlyUrl}" target="_blank" class="a-detail dropdown-item cursor-pointer"><i class="mdi mdi-window-restore mr-1"></i>Xem chi tiết</a>
                                                    <a href="/admin/post/edit/${item.Id}" class="a-detail dropdown-item cursor-pointer"><i class="mdi mdi-export mr-1"></i>Cập nhật tin tức</a>
                                        ${item.Type == 1 ? `
                                        <a onclick = "lookTypePost(${item.Id},2,'Xác nhận hiện bài viết')" class="a-delete dropdown-item cursor-pointer" > <i class="mdi mdi-check mr-1"></i>Hiện bài viết</a >
                                    `
                :
                `
                                        <a onclick = "lookTypePost(${item.Id},1,'Xác nhận ẩn bài viết')" class="a-delete dropdown-item cursor-pointer" > <i class="mdi mdi-content-save-settings mr-1"></i>Ẩn bài viết</a >
                                    `
            }
                                                    <a onclick="deletePost(${item.Id})" class="a-delete dropdown-item cursor-pointer"><i class="mdi mdi-trash-can-outline mr-1"></i>Xóa tin</a>
                                                </div>
                                            </div>
                                        </td>
                                     </tr>
                                        `
    }).join('');

    let $tblBody = $('#tbl-body');
    if (html == '') {
        $tblBody.html(htmlEmptyTable(7));
        $('#div-pagination-info').empty();
    } else {
        $tblBody.html(html);

        /** Render pagination des */
        let count = Object.keys(data).length;
        let start = (pageIndex - 1) * pageItem + 1;
        let end = start + count - 1;
        $('#div-pagination-info').html(`Đang xem <b>${(count == 0 ? 0 : start)}</b> - <b>${end}</b> trong <b>${totalRow}</b> bài viết`);
    }
}
function lookTypePost(id, type, text) {
    alertify.confirm(text, function (data) {
        ajaxPut('Post/Type/' + id + "?type=" + type, {}, function (res) {
            if (res.IsSuccess) {
                alertify.success("Cập nhập tin tức thành công");
                loadTable();
            } else
                alertify.alert(res.Message)
        })
    });
}

function deletePost(id) {
    alertify.confirm("Xác nhận xoá tin tức ?", function (data) {
        ajaxDelete('Post/' + id, function (res) {
            if (res.IsSuccess) {
                alertify.success("Xoá tin tức thành công");
                loadTable();
            } else
                alertify.alert(res.Message)
        })
    });
}