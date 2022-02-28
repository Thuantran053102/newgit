import React from "react"
import 'react-bootstrap';
import clsx from 'clsx';

import style from "./Dashboard.scss"
function Dashboard(){
    // PAGE_INDEX = 1;
    var $spTotalOrder = $("#sp-total-order");
    var $spPendingOrder = $("#sp-pending-order");
    var $spTotalPromo = $("#sp-total-promotion");
    var $spTotalProduct = $("#sp-total-product");
    var $chartOrder = $("#order-chart");
    var $sltChartType = $("#slt-chart-range");
    var $CountDuplicateCode = $("#sp-duplicate-code");

    var chart;

    let data = {
        TotalOrder: 0,
        PendingOrder: 0,
        TotalPromotion: 0,
        TotalProduct: 0,
        OrderChartData: {}
    }

    let dataFilter = {
        chartType: 1
    }

    $sltChartType.on('change', function () {
        loadPage();
    });

    $(function () {
        initPagination();
        loadPage();
    })

    function loadPage() {
        loadFilter();

        ajaxGet('dashboard', { chartType: dataFilter.chartType }, function (res) {
            if (res.IsSuccess) {
                data = res.Result;
                renderPage();
            } else {
                alertify.error(res.Message);
            }
        });
    }
    function loadFilter() {
        dataFilter.chartType = $sltChartType.val();
    }

    function renderPage() {
        $spPendingOrder.html(data.PendingOrder);
        $spTotalOrder.html(data.TotalOrder);
        $spTotalProduct.html(data.TotalProduct);
        $spTotalPromo.html(data.TotalPromotion);
        $CountDuplicateCode.html(data.CountDuplicateCode);
        if (data.Products.length == 0)
            $('#div-duplicate').hide();
        let html = data.Products.map((n, i) => (`
                                        <tr>
                                        <td class="font-weight-bold" style="width: 50px;">
                                          ${i + 1}
                                        </td>
                                        <td class="table-user">
                                           ${n.ProductCode}
                                        </td>
                                    </tr>
`));
        $('#tbl-duplicate-code').html(html);
        initOrderChart();
    }

    function initOrderChart() {
        var chartData = data.OrderChartData.map(x => x.Count);
        var chartLabel = data.OrderChartData.map(x => x.Date);
        var title = "";
        switch (parseInt(dataFilter.chartType)) {
            case 1:
                title = "tuần này"
                break;
            case 2:
                title = "tháng này"
                break;
            case 3:
                title = "năm nay"
                break;
            default:
                title = "tuần này"
                break;
        }

        if (chart == undefined) {
            var options = {
                series: [{
                    name: 'Số đơn đặt hàng',
                    data: chartData
                }],
                chart: {
                    zoom: {
                        enabled: true,
                        type: 'x',
                        resetIcon: {
                            offsetX: -10,
                            offsetY: 0,
                            fillColor: '#fff',
                            strokeColor: '#37474F'
                        },
                        selection: {
                            background: '#90CAF9',
                            border: '#0D47A1'
                        }
                    },
                    id: 'order-chart',
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    categories: chartLabel,
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val + " đơn";
                        }
                    }

                },
                title: {
                    text: `Biểu đồ thống kê số lượng đơn đặt hàng trong ${title}`,
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                }
            };

            chart = new ApexCharts(document.querySelector("#order-chart"), options);
            chart.render();
        }
        else {
            ApexCharts.exec('order-chart', 'updateSeries', [{
                data: chartData
            }], true);

            ApexCharts.exec('order-chart', 'updateOptions', {
                xaxis: {
                    categories: chartLabel,
                },
                title: {
                    text: `Biểu đồ thống kê số lượng đơn đặt hàng trong ${title}`
                }
            }, false, true);
        }
    }
       /** Reload pagination */
       function reloadPagination() {
        $('#div-pagination-selection').twbsPagination('destroy');
        initPagination();
    }

    /** init Pagination */
    function initPagination() {
        let keyword = "";
        let pageItem = 20;
        let SortBy = 6;
        let brandId = 0;
        let categoryId = 0;
        let min = 0;
        let max = 999999999;
        let FromPrice = min;
        let ToPrice = max;

        let d = {
            keyword: keyword,
            BrandId: brandId,
            PageItem: pageItem,
            CategoryUrl: '',
            CategoryId: categoryId,
            FromPrice: FromPrice,
            ToPrice: ToPrice,
            sortOrder: SortBy,
            status: 100
        };

        ajaxGet('product/admin', d, function (data) {
            if (data.IsSuccess) {
                let totalPage = data.Result.TotalPage;
                if (totalPage == 0) {
                    renderTable([]);
                    return;
                } else if (totalPage > 0) {

                    ajaxGet('product/admin', d, function (res) {
                        if (res.IsSuccess) {
                            renderTable(res.Result, res.TotalPage, 1, res.TotalRow);
                        } else {
                            alertify.alert(res.Message);
                        }
                    })
                } else {
                    $('#div-pagination-selection').empty();
                }
            } else {
                alertify.alert(data.Message);
            }
        });

    }

    function generateCategory(categories) {
        return categories.map(n => `<span class="badge badge-primary">${n.CategoryName}</span>`)
    }
 /** Render table */
 function renderTable(data, pageItem, pageIndex, totalRow) {
    let html = ""
    let sttStart = (pageIndex - 1) * pageItem + 1;
    $.each(data.Data, function (index, item) {
        html += `
                    <tr>
                    <td class="text-center">${index+1}</td>
                    <td>${item.ProductCode}</td>
                    <td>
                        <div class="row">
                            <div class="col-md-8">${item.ProductName}</div>
                        </div>
                    </td>
                    <td class="text-left">${generateCategory(item.ProductCategories)}</td>
                    <td class="text-left">${item.ProductBrand.BrandName}</td>
                    <td>${getEmptyOrDefault(item.Origin)}</td>
                    <td><span class="badge badge-${item.Status ? "primary-lighten" : "danger-lighten"}">${item.Status ? "Đang bán" : "Dừng bán"}</span></td>
                    <td class="money">${formatMoney(item.OriginPrice)}</td>
                    <td class="money">${formatMoney(item.SaleOffPrice)}</td>
                    <td class="text-right"> <span class="badge badge-danger">${item.AccessCount}</span></td>
                </tr>
`
    })
    if (html == '') {
        $("#tbl-body").html(htmlEmptyTableAuto('#btn-product'));
    }
    else {
        $("#tbl-body").html(html)
    }

    let $tblBody = $('#tbl-body');
    if (html == '') {
        $tblBody.html(htmlEmptyTableAuto('#btn-product'));
        $('#div-pagination-info').empty();
    } else {
        $tblBody.html(html);
    }
}

    const handle=()=>{
        
    }
    return(
      <div className="container mt-3" >
        <div className="row">
            helo
            <button id="btn-file" style={{opacity:0}}>GET FILE</button> 
            <div className="col-xl-12 col-lg-12">
                <h4 className="page-title mb-4">Thông kê số lượng đơn đặt hàng</h4>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick={handle}>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."> <i className="mdi mdi-file-star-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Đơn đặt hàng</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-order">0</span> <small> đơn</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick={handle}>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-alert-decagram widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Đơn đặt hàng chưa xử lý</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-pending-order">0</span> <small> đơn</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick={handle}>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."> <i className="mdi mdi-credit-card-multiple-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Tổng chương trình khuyến mãi</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-promotion">0</span><small> chương trình</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick={handle}>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-archive-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Tổng số sản phẩm</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-product">0</span> <small> sản phẩm</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick={handle}>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-archive-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Số lượng mã trùng</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-duplicate-code">0</span> <small> sản phẩm</small></h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 bg-white" id="div-duplicate">
                        <h5>Danh sách sản phẩm trùng mã </h5>
                        <table className="table table-striped table-centered mb-0">
                            <thead>
                                <tr>
                                    <th className="font-weight-bold">#</th>
                                    <th>Mã sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody id="tbl-duplicate-code">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <h4 className="page-title mb-1">Biều đồ thống kê số lượng đơn đặt hàng</h4>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <select id="slt-chart-range" className="form-control float-right" data-toggle="select-no-search">
                                <option value="1">Tuần này</option>
                                <option value="2">Tháng này</option>
                                <option value="3">Năm nay</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div id="order-chart" className="apex-charts" data-colors="#727cf5,#e3eaef"></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="page-title mb-1">Top sản phẩm được quan tâm nhất</h4>
                    </div>
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="btn-product" className="table table-hover table-centered">
                                <thead>
                                    <tr className={clsx(style.textCenter)}>
                                        <tr className={clsx(style.textCenter_right)}>
                                            <th className="text-center px-w-50">#</th>
                                            <th>Mã sản phẩm</th>
                                            <th >Tên sản phẩm</th>
                                        </tr>
                                        <tr className={clsx(style.textCenter_left)}>

                                        <th className="">Danh mục</th>
                                        <th className="">Thương hiệu</th>
                                        <th>Xuất xứ</th>
                                        <th>Tình trạng</th>
                                        <th className="money">Giá niêm yết</th>
                                        <th className="money">Giá bán lẻ</th>
                                        <th className="">Lượt truy cập</th>
                                        </tr>
                                    </tr>
                                </thead>
                                <tbody id="tbl-body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Dashboard