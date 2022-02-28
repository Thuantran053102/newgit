const OrderStatus = {
    Pending: 1,
    Approved: 2,
    Completed: 3,
    Canceled: 4
}
$(function () {
    reloadPagination()
})
var PAGE_INDEX = 0;
let Record = $('#sel-record-search').val();
//reloadPagination
function reloadPagination() {
    $('#div-pagination-selection').twbsPagination('destroy');
    initPagination();
}

$('#sel-record-search').change(function () {
    Record = $('#sel-record-search').val()
    delay(function () {
        reloadPagination();
    }, 250);
});

$('#ipt-text-search').keyup(function () {
    delay(function () {
        reloadPagination();
    }, 250);
});
//initPagination
function initPagination() {
    let d = {
        keyword: $('#ipt-text-search').val(),
        pageItem: Record,
        pageIndex: PAGE_INDEX
    };

    ajaxGet('Customer', d, function (data) {
        if (data.IsSuccess) {
            let totalPage = data.Result.TotalPage;
            let totalRow = data.Result.TotalRow;
            if (totalPage == 0) {
                renderTable([]);
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
                        ajaxGet('Customer', d, function (res) {
                            if (res.IsSuccess) {
                                renderTable(res.Result, d.pageItem, page, data.Result.TotalRow);
                            }
                            else {
                                alertify.error(res.Message);
                            }
                        });
                    }
                });
            } else {
                $('#div-pagination-selection').empty();
            }
        }
        else {
            alertify.alert(data.Message);
        }
    });
}
function renderTable(data, pageItem, pageIndex, totalRow) {
    let html = "";
    $.each(data.Data, function (index, item) {
        html += `
                                        <tr class='cursor-pointer' onclick="showOrders(${item.Id})">
                                            <td>${index + 1}</td>
                                            <td class="text-left">${item.FullName}</td>
                                            <td class="text-left">${item.Phone}</td>
                                            <td class="text-left">${(item.Address) ? (item.Address).slice(0, 15) + '....' : ''}</td>
                                            <td class="text-left">${item.Email}</td>
                                        </tr>
                                    `
    })
    let $table = $("#tbl-body");
    if (html == '') {
        $table.html(htmlEmptyTable(7));
        $('#div-pagination-info').empty();
    } else {
        $table.html(html)
        let count = data.Data.length;
        let start = (pageIndex - 1) * pageItem + 1;
        let end = start + count - 1;
        $('#div-pagination-info').html(`Đang xem <b>${(count == 0 ? 0 : start)}</b> - <b>${end}</b> trong <b>${totalRow}</b> khách hàng`);
    }
}
//detelecustomer
function deteleCustomer(id) {
    alertify.confirm("Bạn có chắc xóa.",
        function () {
            ajaxDelete(`Customer/${id}`, function (res) {
                if (res.IsSuccess) {
                    alertify.success('Xóa thành công');
                    reloadPagination()
                }
                else {
                    alertify.alert(res.Message)
                }
            })
        });
}
/*hiển tị modal danh sách đơn hàng của tuwgf khách hàng*/
function showOrders(id) {
    ajaxGet(`Customer/${id}`, {}, function (res) {
        if (res.IsSuccess) {
            let data = res.Result
            let arrayOrder = data.Orders
            let arrayOrderDetails = arrayOrder.OrderDetails
            $('#ten').html(data.FullName)
            $('#sdt').html(data.Phone)
            $('#dc').html(data.Address)
            $('#email').html(data.Email)
            let html = '';
            $.each(arrayOrder, function (index, item) {
                html += `
                        <div class="card mb-0">
                            <div class="card-header" id="headingOne">
                                <div class='row'>
                                        <div class='col-4 text-left'>
                                                <h5 onclick="clickdownIcon()">
                                                    <a class="custom-accordion-title d-block collapsed p-t-2"
                                                    data-toggle="collapse" href="#collapseOne_${item.Id}"
                                                    aria-expanded="false" aria-controls="collapseOne">
                                                        Mã đơn hàng ${item.Id} ${item.IsInstallment ?'-  Trả góp' : ''}
                                                    </a>
                                                    </h5>
                                        </div>
                                        <div class='col-4 text-center'>
                                                <h5 class='p-t-2'>Thời gian đặt: <span class='text-primary'> ${item.CreatedDate}</span></h5>
                                        </div>
                                        <div class='col-4 text-right'>
                                                <h5>Trạng thái : ${renderStatus(item.Status)}</h5>
                                        </div>
                                </div>
                            </div>

                            <div id="collapseOne_${item.Id}" class="collapse"
                                    aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-9">
                                            <table class="table table-borderless table-centered mb-0">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th>Mã sản phẩm</th>
                                                            <th>Sản phẩm</th>
                                                            <th>  ${item.IsInstallment ? 'Giá trả góp' : 'Giá'}</th>
                                                            <th class="text-center">Số lượng</th>
                                                            <th>Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="table_body">
                                                        ${renderSanPham(item.OrderDetails, item.IsInstallment)}
                                                    </tbody>
                                                    <tfoot>
                                                        ${rednerFooter(item.OrderDetails)}
                                                    </tfoot>
                                            </table>
                                            ${RenderTableTraGop(item) == undefined ? '' : RenderTableTraGop(item)}
                                        </div>
                                        <div class="col-3 ">
                                            <div id="reason ${item.IsInstallment ? 'd-none' : ''}">
                                                ${renderProplehandle(item.ProcessedUser.FullName, item.Status)}
                                            </div>
                                            <div class="border p-3 mt-4 mt-lg-0 rounded ${item.IsInstallment ? 'd-none' : ''}">
                                                <h4>Tóm tắt đơn hàng</h4>
                                                <div class="table-responsive">
                                                    <table class="table mb-0">
                                                        <tbody>
                                                                ${renderTableprovisional(item.OrderDetails)}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            <!--Start Detai Trả góp-->
                                        <div id="detail-price-tragop">
                           
                                        </div>
                                        </div>
                 
                                        <div id="reason" class='col-9  pr-3'>
                                        </div>
                                        <div id="html_histories">
                                            <div class="mt-4">
                                                <h5 data-toggle="collapse" data-target="#ul-histories" aria-expanded="false" aria-controls="ul-histories"> Lịch sử đơn hàng </h5>
                                                <ul id="ul-histories" class="collapse show sessions" aria-labelledby="headingOne">
                                                        ${renderStory(item.Histories)}
                                                </ul>
                                            </div>
                                        </div></div>
                                </div>
                            </div>
                        </div>
                      `
                })
            

            if (html == '') {
                $("#accordionExample").html(htmlEmptyTable(5));
            }
            else {
                $("#accordionExample").html(html);
            }
        }
        else {
            alertify.alert(res.Message)
        }
    })
    showModal("#modal-order-detail");

}
//renderStory
function renderStory(array) {
    let html = ''
    $.each(array, function (index, item) {
        html += `   <li class="item-timeline">
                        <div class="time"> ${item.CreatedDate} - ${item.UserName} </div>
                        <p class="mb-0"> ${renderStatus(item.Status)}</p>
                        <p class="mb-0 ml-1">Nội dung: ${item.Content}</p>
                    </li>`
    })
    return html;
}
//renderProplehandle
function renderProplehandle(fn, stt) {
    if (stt == 1) {
        return ``
    }
    return `<h5 class="pr-2">Người thực hiện: <span>${fn}</span></h5>
                                `
}
//renderSeason
function renderSeason(stt, ndxl, note) {
    switch (stt) {
        case 2:
            return ` <h5>Nội dung xử lý</h5>
                                      <div class="form-group">
                                           <textarea id="reasonCancel__" data-toggle="maxlength" class="form-control" maxlength="225"  readonly rows="3">${ndxl ? ndxl : 'Chưa có nội dung'}</textarea>
                                       </div>`
            break;
        case 3:
            return ` <h5>Lý do hủy đơn hàng</h5>
                                      <div class="form-group">
                                           <textarea id="reasonCancel__" data-toggle="maxlength" class="form-control" maxlength="225"  readonly rows="3">${note ? note : 'Chưa có nội dung'}</textarea>
                                       </div>`
            break;
        default:
            return ``
            break;

    }
}
//renderFooter
function rednerFooter(array) {
    let total = 0
    $.each(array, function (index, item) {
        total += ((item.Quanity) * (item.BuyPrice))
    })
    if (total == 0) {
        return ``
    }
    else {
        return `<tr>
                                   <td class="text-right font-weight-bold" colspan="4">TỔNG CỘNG : </td>
                                    <th class="text-danger">${formatMoney(total)
            }</th>
                                </tr>`
    }

}
//renderTableprovisional
function renderTableprovisional(array) {
    console.log(array);
    let priceProvisional = 0
    $.each(array, function (index, item) {
        priceProvisional += ((item.BuyPrice) * (item.Quanity))
    })
    let html = ` <tr>
                                         <td>Giá tạm tính:</td>
                                         <td class="money">${formatMoney(priceProvisional)}</td>
                                    </tr>
                                    <tr>
                                         <td>Giảm giá : </td>
                                         <td class="money"></td>
                                    </tr>
                                    <tr>
                                         <th>Thành tiền :</th>
                                         <th class="money">${formatMoney(priceProvisional)}</th>
                                    </tr>
                                    `
    return html
}
//rendersanpham
function renderSanPham(array, tragop=false) {
    let html = ''
    $.each(array, function (index, item) {
        html += `<tr>
                                            <td>
                                                ${item.Product.ProductCode}
                                            </td>
                                            <td>
                                                <img src=${ROOT_URL + item.Product.ThumbNail} alt="contact-img" title="contact-img" class="rounded mr-3" height="64">
                                                ${item.Product.ProductName}
                                            </td>
                                            <td>
                                                <small class="text-secondary" style="text-decoration: line-through;"><span>${formatMoney(item.Product.OriginPrice)}</span></small><br>
                                                ${formatMoney(item.BuyPrice)}</td>
                                            <td class="text-center">
                                                <span>${item.Quanity}</span>
                                            </td>
                                            <td>${formatMoney((item.BuyPrice) * (item.Quanity))}</td>
                                    </tr>

                                    `

    })
    if (html == '') {
        html = htmlEmptyTable(4)
    }
    return html;
}
//renderStatus
function renderStatus(status) {
    switch (status) {
        case OrderStatus.Pending:
            return '<span class="badge badge-warning-lighten">Chờ xác nhận đơn hàng</span>';
            break;
        case OrderStatus.Approved:
            return `<span class="badge badge-primary-lighten">Chốt sale - đã xác nhận từ khách hàng</span>`;
            break;
        case OrderStatus.Completed:
            return `<span  class="badge badge-success-lighten">Hoàn thành</span>`;
        case OrderStatus.Canceled:
            return `<span  class="badge badge-danger-lighten">Đã hủy</span>`;
            break;
    }
}

/*Render Table Trả góp*/
function RenderTableTraGop(data) {
    let html = '';
    if (data.InstallmentOrder != null) {
        BuyPrice = data.InstallmentOrder.Price;
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
                                <td><span class="">${formatMoney(Math.floor(BuyPrice - (BuyPrice * (data.InstallmentOrder.PrepayPercent / 100))))}</span></td>
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
                `;
        return html;
    }
    
   
}