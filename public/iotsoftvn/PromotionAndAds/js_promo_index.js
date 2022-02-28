
$(document).ready(function () {
    reloadPagination()
})
/** Binding event search */
$('#ipt-text-search').keyup(function () {
    delay(function () {
        reloadPagination();
    }, 250);
});
$("#dtpk-range").on('change', function () {
    reloadPagination();
});
$("input[name=radio-status]").on('change', function () {
    reloadPagination();
})
$("#sel-record-search").on('change', function () {
    reloadPagination()
})
/** Reload pagination */
function reloadPagination() {
    $('#div-pagination-selection').twbsPagination('destroy');
    initPagination();
}
/** init Pagination */
function initPagination() {
    let keyword = $('#ipt-text-search').val();
    let pageItem = $('#sel-record-search').find('option:selected').val();
    let status = $('input[name=radio-status]:checked').val();

    let dates = getDateRangeValue($('#dtpk-range').val());

    DATE_START = dates.startDate;
    DATE_END = dates.endDate;

    let d = {
        Keyword: keyword,
        PageItem: pageItem,
        Status: status,
        FromDate: dates.startDate,
        ToDate: dates.endDate
    };
    ajaxGet('Promotion', d, function (data) {
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
                    hideOnlyOnePage: false,
                    paginationClass: 'pagination pagination-rounded',
                    first: '←',
                    last: '→',
                    prev: '«',
                    next: '»',
                    onPageClick: function (event, page) {
                        d.PageIndex = page;
                        ajaxGet('Promotion', d, function (res) {
                            if (res.IsSuccess) {
                                renderTable(res.Result, pageItem, page, data.Result.TotalRow);
                            } else {
                                alertify.alert(res.Message);
                            }
                        })
                    }
                });
            } else {
                $('#div-pagination-selection').empty();
            }
        } else {
            alertify.alert(data.Message);
        }
    });
}
function updateStatus(id, statusId) {
    ajaxPut('promotion/status/' + id, statusId, function (res) {
        if (res.IsSuccess) {
            alertify.success("Cập nhập trạng thái thành công!");
            reloadPagination();
        } else {
            alertify.alert(res.Message);
        }
    });
}
/** Render table */
function renderTable(data, pageItem, pageIndex, totalRow) {
    let html = ""
    $.each(data.Data, function (index, item) {
        //console.log(item);
        var status = getStatus(item.Status);
        var statusHtml = "";

        if (item.Status == 1) {
            statusHtml = `<a class="a-delete dropdown-item cursor-pointer" onClick="updateStatus(${item.Id}, 2)">
                                    <i class="mdi mdi-close-circle mr-1"></i>Đóng chương trình
                                  </a>`;
        }
        else {
            statusHtml = `<a class="a-delete dropdown-item cursor-pointer" onClick="updateStatus(${item.Id}, 1)">
                                    <i class="mdi mdi-lock-open mr-1"></i>Mở chương trình
                                  </a>`;
        }

        html += `<tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center"><i class="mdi mdi-square" style="color: ${item.BackgroundColor}"></i></td>
        <td class="text-left" style="width: 450px;">
            <img src="${getImagePath(item.Banner)}" style="object-fit: scale-down; width: 100%; height: 30px;"
                onerror="this.src='/images/default-banner.jpg'" class="mr-2 ">
                            </td>
            <td class="table-user">
                ${item.Name}
            </td>
            <td>${item.StartDate}</td>
            <td>${item.EndDate}</td>
            <td><span class="badge ${status.Color}">${status.Text}</span></td>
            <td class="text-center px-w-50">
                <div class="dropdown">
                    <a class="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown"><i class="mdi mdi-dots-vertical font-18 text-primary"></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="/admin/promotion/edit/${item.Id}" class="a-detail dropdown-item cursor-pointer"><i class="mdi mdi-export mr-1"></i>Cập nhật chương trình</a>
                                        ${statusHtml}
                        <a onclick="deletePromotion(${item.Id})" class="a-detail dropdown-item cursor-pointer"><i class="mdi mdi-trash-can-outline mr-1"></i>Xóa chương trình</a>
                    </div>
                </div>
            </td>
                        </tr>`;
    })
    if (html == '') {
        $("#tbl-body").html(htmlEmptyTable(11));
    }
    else {
        $("#tbl-body").html(html)
    }

    let $tblBody = $('#tbl-body');
    if (html == '') {
        $tblBody.html(htmlEmptyTable(8));
        $('#div-pagination-info').empty();
    } else {
        $tblBody.html(html);

        /** Render pagination des */
        let count = data.Data.length;
        let start = (pageIndex - 1) * pageItem + 1;
        let end = start + count - 1;
        $('#div-pagination-info').html(`Đang xem <b>${(count == 0 ? 0 : start)}</b> - <b>${end}</b> trong <b>${totalRow}</b> chương trình`);
    }
}
function deletePromotion(id) {
    alertify.confirm('Bạn có chắc muốn xóa chương trình này!', function () {
        ajaxDelete('promotion/' + id, function (res) {
            console.log('test');
            if (res.IsSuccess) {
                alertify.success('Xóa chương trình thành công');
                reloadPagination();
            } else {
                alertify.alert(res.Message);
            }
        }, function (a, b, c) {
            console.log(a, b, c);
        });
    });
}
/** Convert string to date format param = dd/MM/yyyy*/
function stringToDate(string) {
    let arr = string.split('/');
    return new Date(arr[2], arr[1] - 1, arr[0]);
}
/** Get start-date and end-date in daterangepicker */
function getDateRangeValue(string) {
    let arr = string.split(' - ');
    return {
        startDate: arr[0],
        endDate: arr[1]
    }
}
function getStatus(statusId) {
    var status = {};
    switch (statusId) {
        case 1:
            status = {
                Text: "Đang hoạt động",
                Color: "badge-success-lighten"
            }
            break;
        case 2:
            status = {
                Text: "Đã đóng",
                Color: "badge-danger-lighten"
            }
            break;
        default:
    }
    return status;
}
