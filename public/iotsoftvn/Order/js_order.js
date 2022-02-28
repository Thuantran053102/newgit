
const OrderStatus = {
    Pending: 1,
    Approved: 2,
    Completed: 3,
    Canceled: 4

}
$(function () {

    $('body').on('onafterprint', function () { alertify.alert("Toan") })
    reloadPagination();
    let paramsCategorySelect = {
        Element: '#sel-category-search',
        Url: URL_BASE.ProductCategory,
        Value: 'CategoryName',
        Id: 'Id'
    }
    let Day = $("#ipt-date-search").val()
    StartDay = Day.slice(0, 10)
    EndDay = Day.slice(13)
    initSelect(paramsCategorySelect);
})
let PAGE_INDEX = 0;
let StatusId_ = 0
let StartDay;
let EndDay;
let Record = $('#sel-record-search').val();
let htmlPrint
let Lanin = 0
let day_ = new Date()
$('#ipt-date-search').change(function () {
    let Day = $("#ipt-date-search").val()
    StartDay = Day.slice(0, 10)
    EndDay = Day.slice(13)
    delay(function () {
        reloadPagination();
    }, 250);
});
$('.order-status').change(function () {
    let me = $(this);
    StatusId_ = me.data('value');
    delay(function () {
        reloadPagination();
    }, 250);
});
$('#sel-category-search').change(function () {
    delay(function () {
        reloadPagination();
    }, 250);
});
$('#sel-record-search').change(function () {
    Record = $('#sel-record-search').val()
    delay(function () {
        reloadPagination();
    }, 250);
});
/** Binding event search */
$("#ipt-text-search").keyup(function () {
    delay(function () {
        reloadPagination();
    }, 250);
});
/** Reload pagination */
function reloadPagination() {
    $('#div-pagination-selection').twbsPagination('destroy');
    initPagination();
}
/** init Pagination */
function initPagination() {
    let d = {
        keyword: $('#ipt-text-search').val(),
        statusId: StatusId_,
        categoryGroupId: $('#sel-category-search').find('option:selected').val(),
        fromDate: StartDay,
        toDate: EndDay,
        pageItem: Record,
        pageIndex: PAGE_INDEX

    };
    ajaxGet('Order', d, function (data) {
        if (data.IsSuccess) {
            let totalPage = data.Result.TotalPage;
            let totalRow = data.Result.TotalRow;

            if (totalPage == 0) {
                renderTable([]);
                return;
            } else if (totalPage > 0) {
                $('#div-pagination-selection').twbsPagination({
                    totalPages: totalPage,
                    visiblePages: 5,
                    initiateStartPageClick: true,
                    hideOnlyOnePage: totalRow < d.pageItem ? true : false,
                    paginationClass: 'pagination pagination-rounded',
                    first: '←',
                    last: '→',
                    prev: '«',
                    next: '»',
                    onPageClick: function (event, page) {
                        d.pageIndex = page;

                        ajaxGet('Order', d, function (res) {
                            if (res.IsSuccess) {
                                renderTable(res.Result, d.pageItem, page, data.Result.TotalRow);
                            } else {
                                alertify.error(res.Message);
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
/** Render table */
function renderTable(data, pageItem, pageIndex, totalRow) {
    let html = "";
    $.each(data.Data, function (index, item) {
        html += `
                            <tr style="cursor:pointer" >
                                <td onclick="showDetail(${item.Id},${item.Status})" class="text-center"><a class="text-body font-weight-bold">${item.Id}</a> </td>
                                <td onclick="showDetail(${item.Id},${item.Status})" >${item.CreatedDate}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" >${item.Customer.FullName}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" >${item.Customer.Phone}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" >${renderStatus(item.Status, item.Id)}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" class="text-center">${item.NoiDungXuLy}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" class="text-center">${item.PaymentMethod == 0 ? 'COD' : item.PaymentMethod == 1 ? 'CK' : 'Trả góp'}</td>
                                <td onclick="showDetail(${item.Id},${item.Status})" class="money font-weight-bold">${formatMoney(item.Total)}</td>
                                <td class="text-center px-w-50">
                                    <div class="dropdown">
                                        <a class="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown"><i class="mdi mdi-dots-vertical font-18 text-primary"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                                ${renderStatusio(item.Status, item)}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            `;
    })
    let $tbl = $("#tbl-po");
    if (html == '') {
        $tbl.html(htmlEmptyTable(9));
        $('#div-pagination-info').empty();
    } else {
        $tbl.html(html);
        /** Render pagination des */
        let count = data.Data.length;
        let start = (pageIndex - 1) * pageItem + 1;
        let end = start + count - 1;
        $('#div-pagination-info').html(`Đang xem <b>${(count == 0 ? 0 : start)}</b> - <b>${end}</b> trong <b>${totalRow}</b> đơn hàng`);
    }

}
//renderstatus
function renderStatus(status) {
    switch (status) {
        case OrderStatus.Pending:
            return '<span class="badge badge-warning-lighten">Chờ xác nhận đơn hàng</span>';
            break;
        case OrderStatus.Approved:
            return `<span class="badge badge-primary-lighten">Chốt sale - đã xác nhận từ khách hàng</span>`;
            break;
        case OrderStatus.Completed:
            return `<span class="badge badge-success-lighten">Hoàn thành</span>`;
        case OrderStatus.Canceled:
            return `<span class="badge badge-danger-lighten">Đã hủy</span>`;
            break;
    }
}
function renderStatusio(status, item) {
    let html = ''
    switch (status) {
        case OrderStatus.Pending:
            html += `<a onclick="UpdateStatus(${item.Id}, ${OrderStatus.Approved})" class="dropdown-item cursor-pointer"><i class="mdi mdi-package-up mr-1"></i><span>Chốt sale - đã xác nhận từ khách hàng</span></a>`;
            break;
        case OrderStatus.Approved:
            html += `<a onclick="UpdateStatus(${item.Id},${OrderStatus.Completed})" class="dropdown-item cursor-pointer"><i class="mdi mdi-checkbox-multiple-marked-circle-outline mr-1"></i><span>Hoàn thành</span></a>`;
            break;
        case OrderStatus.Completed:
            html += `<a onclick="UpdateStatus(${item.Id},${OrderStatus.Pending})" class="dropdown-item cursor-pointer"><i class="mdi mdi-checkbox-multiple-marked-circle-outline mr-1"></i><span>Chờ xác nhận đơn hàng</span></a>`;
            break;
        case OrderStatus.Canceled:
            html += `<a onclick="UpdateStatus(${item.Id},${OrderStatus.Pending})" class="dropdown-item cursor-pointer"><i class="mdi mdi-checkbox-multiple-marked-circle-outline mr-1"></i><span>Chờ xác nhận đơn hàng</span></a>`;
            break;
    }
    if (status != OrderStatus.Canceled)
        html += `<a onclick="UpdateStatus(${item.Id},${OrderStatus.Canceled})" class="dropdown-item cursor-pointer"><i class="mdi mdi-cancel mr-1"></i><span>Hủy đơn hàng</span></a>`;
    return html;
}
/** Function xác thực khách hàng */
function UpdateStatus(id, newStatus, hideModelDetail = false) {
    showModal('#modal-content-handle')
    $('#btn-edit-branch-handle').unbind().on('click', function () {
        let content = $('#contentHandle').val();
        if (content == '') {
            alertify.alert('Xin mời nhập nội dung')
        }
        else {
            alertify.confirm("Xác nhân cập nhật", function () {
                ajaxPut(`Order/UpdateStatus/${id}?statusId=${newStatus}&note=${content}`, {}, function (res) {
                    if (res.IsSuccess) {
                        alertify.success('Cập nhật thành công');
                        resetContenthandle()
                        hideModal('#modal-order-detail')
                        hideModal('#modal-content-handle')
                        reloadPagination();

                    }
                    else {
                        alertify.alert(res.Message)

                    }

                })
            })

        }

    })
}
//showContentHandleres.Result.NoiDungXuLy
function showContentHandle(id) {
    ajaxGet(`Order/ById/${id}`, {}, function (res) {
        if (res.IsSuccess) {
            $('#contentHandle__').val(res.Result.NoiDungXuLy)
        }
        else {
            alertify.alert(res.Message)
        }
    })
    showModal('#modal-content-handle__')
    $('#btn-edit-branch-handle__').attr('onclick', `updateContentHandle(${id})`)
}
//updateContentHandle
function updateContentHandle(id) {
    let content = $('#contentHandle__').val()
    ajaxPut(`Order/Approve/${id}?note=${content}`, {}, function (res) {
        if (res.IsSuccess) {
            ajaxPut(`Order/UpdateStatus/${id}?statusId=2`, {}, function (res) {
                if (res.IsSuccess) {
                    alertify.success('Cập nhật thành công');
                    resetContenthandle()
                    hideModal('#modal-content-handle__')
                    reloadPagination()
                }
                else {
                    alertify.alert(res.Message)
                }
            })
        }
        else {
            alertify.alert(res.Message)
        }
    })
}
//resetContenthandle
function resetContenthandle() {
    $('#contentHandle').val('')
    $('#contentHandle__').val('')
}
function resetReasonOrder() {
    $('#reasonCancel').val('')
    $('#reasonCancel__').val('')
}
/*hiển thị modal chi tiết đơn hàng của từng đơn hàng */
function showDetail(id, stt) {
    ajaxGet(`Order/ById/${id}`, {}, function (res) {
        if (res.IsSuccess) {
            let data = res.Result
            if (data.InstallmentOrder != null) {
                $('#div-tomtatdonhang').css('display', 'none');
            }
            let dataCart = data.OrderDetails
            let html = ''
            let tongtientamtinh = 0
            let soluong = 0
            if (data.Status == OrderStatus.Completed) {
                $("#print_T").html(`<button id="btn-print" type="button" class="btn btn-success"><i class="mdi mdi-chart-scatter-plot-hexbin mr-1"></i>In đơn hàng</button>`);
            } else {
                $("#print_T").html('');
            }
            if (!data.IsInstallment) {
                $('#price-tragop-text').html('Giá');
            } else {
                $('#price-tragop-text').html('Giá trả góp');
            }
            $("#customer__").html(data.Customer.FullName)
            $("#trangthai").html(renderStatus(data.Status))
            $("#madonhang").html(data.Id)
            $("#phone").html(data.Customer.Phone)
            $("#address__").html(data.Customer.Address)
            $("#email").html(data.Customer.Email)
            $("#giatamtinh").html(formatMoney(data.Total))
            $("#thanhtien").html(formatMoney(data.Total))
            $("#time_").html(data.CreatedDate)
            $("#orderType").html(data.InstallmentOrder ? "Mua trả góp" : "Mua trả thẳng")
            if (data.Status == 2) {
                $('#people_').html(` <h5 class="pr-2">Nguời thực hiện: <span>${data.ProcessedUser.FullName}</span></h5>`)
            }
            if (data.Status == 3) {
                $('#people_').html(` <h5 class="pr-2">Nguời thực hiện : <span>${data.ProcessedUser.FullName}</span></h5>`)
            }
            if (data.Status == 1) {
                $('#people_').html(``)
            }

            let htmlHistories = data.Histories.map(n => `<li class="item-timeline">
                                                                    <div class="time"> ${n.CreatedDate} - ${n.UserName} </div>
                                                                    <p class="mb-0"> ${renderStatus(n.Status)}</p>
                                                                    <p class="mb-0 ml-1">Nội dung: ${n.Content}</p>
                                                                </li>`);
            $('#ul-histories').html(htmlHistories);
            $.each(dataCart, function (index, item) {
                html += `
                                <tr>
                                    <td>${item.Product.ProductCode}</td>
                                    <td class='row'>
                                            <div class='col-3'>
                                            <img src="${ROOT_URL + item.Product.ThumbNail}" alt="contact-img" title="contact-img" class="rounded mr-3" height="64">
                                            </div>
                                            <p class="m-0 d-inline-block align-middle font-16 col-9">
                                            <a  class="text-body">${item.Product.ProductName}</a>
                                            </p>
                                        </td>
                                        <td class="money">
                                                <small class="text-secondary" style="text-decoration: line-through;"><span>${formatMoney(item.OriginPrice)}</span></small><br/>
                                                ${formatMoney(item.BuyPrice)}
                                        </td>
                                    <td class='text-center'>
                                        <span >${item.Quanity}</span>
                                        </td>
                                        <td class="money">
                                                    ${formatMoney(item.Quanity * item.BuyPrice)}
                                        </td>
                                </tr>
                        `
                tongtientamtinh += ((item.BuyPrice) * (item.Quanity))
                soluong += item.Quanity
            })
            if (data.IsInstallment) {
                let BuyPrice = (data.OrderDetails[0].BuyPrice);
                let html = `<h3>Thông tin trả góp</h3>
                            <table class="table border table-striped">
                        <tbody>
                             <tr>
                                <td> Công ty</td>
                                <td><span>${data.InstallmentOrder.InstallmentBankName}</span></td>
                            </td></tr>
                            <tr>
                                <td>Giá sản phẩm</td>
                                <td><span class="text-danger">${formatMoney(BuyPrice)}</span></td>
                            </tr>
                            <tr>
                                <td>Trả trước</td>
                                 <td><span class="">${formatMoney(Math.floor((BuyPrice * (data.InstallmentOrder.PrepayPercent / 100))))}</span></td>
                            </tr>
                            <tr>
                                <td>Còn lại</td>
                                <td><span class="">${formatMoney(Math.floor(BuyPrice-(BuyPrice * (data.InstallmentOrder.PrepayPercent / 100))))}</span></td>
                           </tr>
                            <tr>
                                <td>Lãi suất</td>
                                 <td><span class="">${data.InstallmentOrder.InterestRate} %</span></td>
                            </tr>

                            <tr>
                                <td>Góp mỗi tháng</td>
                                 <td><span class="">${formatMoney(data.InstallmentOrder.PayPerMonth)}</span></td>
                            </tr>

                            <tr>
                                <td>Chênh lệch</td>
                                 <td><span class="">${formatMoney(data.InstallmentOrder.Difference)}</span></td>
                            </tr>
                             <tr>
                                <td>Giấy tờ cần có</td>
                                 <td><span class="">${data.InstallmentOrder.Papers}</span></td>
                            </tr>
                            <tr>
                                <td>Phí hồ sơ</td>
                                 <td><span class="">${formatMoney(data.InstallmentOrder.PhiHoSo)}</span></td>
                            </tr>
                            <tr>
                                <td>Tổng tiền phải trả</td>
                                 <td><span class="text-danger">${formatMoney(data.Total)}</span></td>
                            </tr>
                        </tbody>
                    </table>
                `
                $('#detail-price-tragop').html(html);
            }
            if (html == '') {
                $("#table-sanpham").html(htmlEmptyTable(8));

            } else {
                let html_ = `
                            <tr>
                                 <th colspan="4" class="text-right">Tổng Cộng :</th>
                                <th class="money text-danger">${formatMoney(tongtientamtinh)} </th >
                            </tr>
                        `
                $("#table-sanpham").html(html)
                $("#table-sanpham").append(html_)
            }

            $('#customer').html(data.Customer.FullName)
            $('#address').html(data.Customer.Address)
            let qualityTotal = 0
            $.each(dataCart, function (index, item) {
                htmlPrint += `
                                        <tr>
                                                <td class="text-center">${index + 1}</td>
                                                <td>${item.Product.ProductName}</td>
                                                <td class="text-center">${item.Product.GurantyTime}</td>
                                                <td class="text-center">cái</td>
                                                <td class="text-center">${item.Quanity}</td>
                                                <td class="text-right">${formatMoney(item.SellOffPrice)}
                                                <td class="text-right">${formatMoney(item.Quanity * item.SellOffPrice)}</td>
                                            </tr>
                                    `
                qualityTotal += item.Quanity
            })
            $('#time_mua_').html(data.CreatedDate)
            $('#tbl_body').html(htmlPrint)
            let htmlFooter = `
                                         <tr>
                                            <td class="text-center font-weight-bold" colspan="4">TỔNG CỘNG</td>
                                            <td class="text-center" id="tongSoluong" class="font-weight-bold">${qualityTotal}</td>
                                            <td></td>
                                            <td id="tongTien" class="text-right">${formatMoney(data.Total)}</td >
                                        </tr>
                                    `
            let timePrintHtml = renderSmall10(day_.getHours()) + ':' + renderSmall10(day_.getMinutes()) + ' ' + renderSmall10(day_.getDate()) + '/' + renderSmall10((day_.getMonth() + 1)) + '/' + day_.getFullYear()
            let timeday = renderSmall10(day_.getDate()) + String(renderSmall10(day_.getMonth() + 1)) + day_.getFullYear()
            let textCT = renderSoChungtu(data.Id, timeday)
            if (data.Status == 2) {
                $('#time_print').html(timePrintHtml)
            }
            if (data.Status == 3) {
                $('#time_print').html(timePrintHtml)
            }
            $("#modal-order-detail").find('button[name="btn-update"]').remove();
            $('#SO_CT').html(textCT)
            $('#tbl_foot').html(htmlFooter)
            $('#tienbangchu').html(numTo.text(data.Total))
            $('#thanhtoan').html(formatMoney(data.Total))
            $('#tienhang').html(formatMoney(data.Total))
            $('#btn-print').unbind().on('click', () => printOrder(data.Id))
        }
        else {
            alertify.alert(res.Message)
        }
    })
    showModal("#modal-order-detail");
}
//renderGio
function renderSmall10(para) {
    if (para < 10) {
        return '0' + para
    }
    return para
}
///rendersochungtu
function renderSoChungtu(madonhang, time) {
    let so = demsoluongchuso(madonhang);
    switch (so) {
        case 1:
            return 'W' + '00000' + madonhang + '-' + time
            break;
        case 2:
            return 'W' + '0000' + madonhang + '-' + time
            break;
        case 3:
            return 'W' + '000' + madonhang + '-' + time
            break;
        case 4:
            return 'W' + '00' + madonhang + '-' + time
            break;
        case 5:
            return 'W' + '0' + madonhang + '-' + time
            break;
        default:
            return 'W' + madonhang + '-' + time
            break;
    }

}
//demsoluongchuso
function demsoluongchuso(so) {
    let dem = 0
    while (so >= 10) {
        so /= 10
        dem++
    }
    return dem + 1
}
//print
function printOrder(id) {
    printThis('#div-print', function (e) {
        //hideModal("#modal-order-detail")
        //alertify.confirm("Bạn có muốn kết thúc đơn hàng?", function () {
        //    accuracyPO(id)
        //})
    })

}
//resetFormin
function resetFormin() {
    htmlPrint = ''
    $('#tbl_foot').html('')
}
