
var $slGroup = $('#sl-group');
var $slPromo = $('#sl-promo');
var $slprod = $('#sl-product');
var $tblProduct = $('#tbl-product');
var PRODUCTS = [];
var IMG_DEFAULT = "";
var CURRENT_PRODUCT_ID;// Khi chọn đổi hình ảnh trả góp 0% sẽ lấy Id
$(document).ready(function () {

    $(".print-page-sm").removeClass("mt-2");
    $("#div-print-large").parent().removeClass('m-auto')
    $('#tbl-product').html(htmlEmptyTable(6, "Chưa có sản phẩm"));
    initSelectSearch({
        Element: '#sl-product',
        Url: 'product/byname',
        Value: 'ProductName',
        Id: 'Id',
        Placeholder: ''
    });

    //khởi tạo select nhóm sản phẩm
    initSelect({
        Element: '#sl-group',
        Url: 'productgroup/GetFilter',
        Value: 'GroupName',
        Id: 'Id',
        Placeholder: ''
    }, false, function () { $slGroup.val("").trigger('change'); });

    //khởi tạo select khuyến mãi
    initSelect({
        Element: '#sl-promo',
        Url: 'Promotion/GetFilter',
        Value: 'Name',
        Id: 'Key',
        Placeholder: 'Chọn từ chương trình khuyến mãi'
    }, false, function () { $slPromo.val("").trigger('change'); });

    INIT_FILE_MANAGE("#btn-image-default", function (file) {
        $("#img-default").attr("src", "/" + file.FilePath);

        if ($('#tbl-product > tr > td:nth-child(7)').find('img').length == 0) {
            $('#tbl-product > tr > td:nth-child(7)').each((index, htmlitem) => { htmlitem.innerHTML = (`<img style="width:80px;height:80px;cursor:pointer" src="${'/' + file.FilePath}">`) })
        } else {
            $('#tbl-product > tr > td:nth-child(7)').find('img').each((index, htmlitem) => {
                //$(htmlitem).attr("src", "/" + file.FilePath);
                htmlitem.src = "/" + file.FilePath;
            });
        }
        IMG_DEFAULT = "/" + file.FilePath;

    })

    $("#btn-image-remove").on('click', function () {

        $("#img-default").attr("src", "");
        IMG_DEFAULT = "";
    })

    /*Sự kiển đổi chương trình khuyến mãi*/
    $slPromo.on('change', function () {
        var id = $slPromo.val();
        if (id == "" || id == null || id == undefined) return;
        console.log(id);
        $slGroup.val("").trigger('change');
        ajaxGet('Promotion/Products/' + id, {}, function (res) {
            if (res.IsSuccess) {
                PRODUCTS = res.Result.Products;
                $tblProduct.html("");
                for (var i = 0; i < PRODUCTS.length; i++) {
                    addToTable(PRODUCTS[i], i + 1);
                }
                if (PRODUCTS.length == 0)
                    $tblProduct.html(htmlEmptyTable(6, "Chưa có sản phẩm nào trong danh sách cần in tem"));

            }
        })
    })

    /*Sự kiển đổi nhóm sp*/

    $slGroup.on('change', function () {
        var id = $slGroup.val();
        if (id == "" || id == null || id == undefined) return;
        $slPromo.val("").trigger('change');
        ajaxGet('ProductGroup/GetById/' + id, {}, function (res) {
            if (res.IsSuccess) {
                PRODUCTS = res.Result.Products;
                $tblProduct.html("");
                for (var i = 0; i < PRODUCTS.length; i++) {
                    addToTable(PRODUCTS[i], i + 1);
                }
                if (PRODUCTS.length == 0)
                    $tblProduct.html(htmlEmptyTable(6, "Chưa có sản phẩm nào trong danh sách cần in tem"));

            }
        })
    })


    $slprod.on('change', function () {
        let id = $slprod.val();
        var IsExist = PRODUCTS.find(n => n.Id == id);
        if (IsExist) return;
        ajaxGet('Product/GetById/' + $slprod.val(), {}, function (res) {
            if (res.IsSuccess) {
                PRODUCTS.push(res.Result);
                addToTable(res.Result, i + 1);
                var row = $tblProduct.find('tr');
                for (var i = 0; i < row.length; i++) {
                    $(row[i]).find('td').first().html(i + 1);
                }
                if (PRODUCTS.length == 0)
                    $tblProduct.html(htmlEmptyTable(6, "Chưa có sản phẩm nào trong danh sách cần in tem"));

            }
        })
    })

})

/*Thêm từng dòng vào table*/
function addToTable(item, stt) {
    if (PRODUCTS.length == 0)
        $('#tbl-product').html("");
    ajaxGet("Product/IsInstallment/" + item.Id, null, (data) => {
        console.log("111111111");
        if (data.IsSuccess)
            item.Image = "/images/print/print-0.png";
    }, null, false);
    console.log("2222222222222");
    console.log(item.Image);
    let imgHtml = IsNullOrEmpty(item.Image) ? "" : `<img id="img-${item.Id}" style="width:80px;height:80px;cursor:pointer" src="${item.Image}"/>`;

    let html = `
            <tr>
                <td class="py-3">${stt}</td>
                <td class="py-3">${item.ProductCode}</td>
                <td class="py-3">${item.ProductName}</td>
                <td class="py-3">${formatMoney(item.OriginPrice)}</td>
                <td class="py-3 text-danger">${formatMoney(item.GiaBanLe)}</td>
                <td class="py-3 text-right">${item.StockNumber}</td>
                <td class="py-3">${imgHtml}</td>
                <td onclick="remove(this,${item.Id})" class="text-center" style="vertical-align:middle;"><i  class="mdi  mdi-18px mdi-delete text-danger cursor-pointer " ></i> </td>
            </tr>`;
    $tblProduct.append(html);
    let a = item.Id;
    INIT_FILE_MANAGE(`#img-${item.Id}`, function (file) {
        var item = PRODUCTS.find(n => n.Id == a);
        item.Image = '/' + file.FilePath;
        $(`#img-${a}`).attr('src', item.Image);
    })
}

function remove(e, id) {
    PRODUCTS = PRODUCTS.filter(n => n.Id != id);
    $(e).parent().remove();
    var row = $tblProduct.find('tr');
    for (var i = 0; i < row.length; i++) {
        $(row[i]).find('td').first().html(i + 1);
    }
    if (PRODUCTS.length == 0)
        $('#tbl-product').html(htmlEmptyTable(6, "Chưa có sản phẩm nào trong danh sách cần in tem"));
}

/*Show modal in tem nhỏ*/
function showPrintSmallLabel() {
    if (PRODUCTS.length == 0) {
        alertify.error("Chưa chọn sản phẩm");
        return;
    }
    generateHtmlSmallLabel();
    showModal("#print-small");
}

function getFontSizeProductName(ProductName) {
    let length = ProductName.length;
    if (length < 38) return 31;
    else if (length < 50) return 25;
    else return 22;
}
function generateHtmlSmallLabel() {
    $(".print-page-sm").html("");
    let html = PRODUCTS.map((item, index) => {
        let fontName = getFontSizeProductName(item.ProductName);
        let htlmOriginPrice = item.OriginPrice > item.SaleOffPrice ? `<span class="font-20" > Giá Niêm Yết:</span> <b> <u style="text-decoration:line-through;" class="font-20">${formatMoney(item.OriginPrice)}</u></b>` : '';;

        let subHtml = ` <div class="h-100 print-item-sm overflow-hidden position-relative" style="padding-left: 15px;">
                        <div class="print-sm-p1 text-right" >
										<ul style="list-style:none;padding:0px;margin-right:40px; padding-top:20px;">
                                        	<li>Xuất xứ:   ${item.Origin} </li>
                                        	<li> Bảo hành:  ${item.GurantyTime}</li>
                                    	</ul></div>
                        <div class="print-sm-p2">
                            <span class="text-center print-product-name-sm" style="font-size:${fontName}px!important"><b>${item.ProductName}</b></span>
                        </div>
                        <div class="print-sm-p3">
                            <div class="row" style="margin-top:-8px;">
                                <div class="col-9 font-18 " id="print-sm-div-highlight" style="white-space: pre-line;padding-left:15px;margin-top: -15px;">
                                  ${getEmptyOrDefault(item.HighlightProduct)}
                                </div>
                                <div class="col-3">
                                   <div class="div-img-qr" id="qrsm${item.Id}"style="padding:3px;margin-top:10px;    margin-right: 15px;text-align:center;"></div>
<p class="text-center" style="
    font-size: 11px;
    text-align: !important;
    text-align: center!important;
">${moment().format("DDMM")}</p>
                                </div>
                            </div>
                        </div>
                        <div class="print-sm-p4">
                            <div class="font-18" style="width:41%;margin-top: -12px;padding-left: 10px; white-space: pre-line;">
                              ${getEmptyOrDefault(item.PromotionContent)}
                            </div>
                            <div style="width:59%;margin-top:-10px;" >
                                <div class="print-price text-center pb-2 mr-4">
                                    <b class="d-block">
                                        <span class="font-20"> Giá Ưu Đãi:</span> <span class="print-product-name" style="font-20"> 						${formatMoney(item.SaleOffPrice)}</span>
                                    </b>
                                    ${htlmOriginPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                   `;

        $(".print-page-sm").append(subHtml);
        $(`#qrsm${item.Id}`).qrcode({ render: "image", text: item.ProductCode, size: 110, class: "mt-2" });
        if ($('#print-sm-div-highlight ul li').length == 0) {
            $('#print-sm-div-highlight').css('padding-left', '30px');

        }
    });
    $(".print-sm-p4 img").remove();
    $(".print-sm-p3 ul").removeAttr("style");
    $(".print-sm-p3 ul li").removeAttr("style");
    $(".print-sm-p4 ul").removeAttr("style");
    $(".print-sm-p4 ul li").removeAttr("style");
}


/*Show modal in tem lớn*/
function showPrintLargeLabel() {
    if (PRODUCTS.length == 0) {
        alertify.error("Chưa chọn sản phẩm");
        return;
    }
    $(".print-page").html("");
    showLoading();
    generateHtmlLargeLabel();
    showModal("#print-large");
    hideLoading();
}

function generateHtmlLargeLabel() {
    console.log(PRODUCTS);
    let html = PRODUCTS.map((item, index) => {
        let htmlImg = IsNullOrEmpty(item.Image) ? "" : ` <img class="print-img-tra-gop-0" src="${item.Image}" />`;
        if (htmlImg == undefined) htmlImg = "";
        let fontName = getFontSizeProductName(item.ProductName);;
        let htlmOriginPrice = item.OriginPrice > item.SaleOffPrice ? `<span class="font-22"> Giá Niêm Yết:</span> <b class="font-24"> <u style="text-decoration:line-through;">${formatMoney(item.OriginPrice)}</u></b>` : '';;
        let subHtml = `<div class="print-item" ><div class="h-100">
            <div  class="print-p0"></div>
            <div class="print-p1"><p class="print-p1 text-center print-product-name mt-2" style="font-size:${fontName}px!important"><b> ${item.ProductName}</b></p></div>
            <div class="print-p2 position-relative font-20 "><div class="position-relative hl-${item.Id}" style="top:-10px;">${$.trim(item.HighlightProduct.replace("\ \g,''"))}</div>
			</div>
            <div class="print-p3" style="text-align: center; border-color: #e8e8e8;"><b class="d-block"><span class="font-24 ml-3"> Giá Ưu Đãi:</span> <b class="print-product-name" style="font-size:33px;"> ${formatMoney(item.SaleOffPrice)}</b></b> ${htlmOriginPrice}</div>
            <div class="print-p4 row"><div class="col-12"><div class="col-8"></div>
                                 <div class="col-2 float-right">
                                     ${htmlImg}
                                 </div><div class="col-2"></div></div></div>
            <div class="print-p5 font-20" style="white-space:pre-line;">${getEmptyOrDefault(item.PromotionContent)}</div>
            <div class="print-p6 mx-0 row"><div class="col-12 d-flex">
                <div class="col-8 mt-2 pl-0" style="">${getEmptyOrDefault(item.GoldenCommitment)}</div> 
                <div class="col-4" ><div id="qr${item.Id}" class="text-center" style="padding: 5px;"></div>
<p class="text-center" style="
    font-size: 11px;
    text-align: !important;
    text-align: center!important;
">${moment().format("DDMM")}</p>
</div>
            </div>  </div>
        </div>`
        $(".print-page").append(subHtml);
        var $ul = $('.hl-' + item.Id + ' ul');
        if ($ul.length > 0 && !item.HighlightProduct.includes("Xuất sứ") && !item.HighlightProduct.includes("Xuất xứ")) {
            $ul.append(`<li>Xuất xứ: ${item.Origin} </li>`);
            $ul.append(`<li>Bảo hành: ${item.GurantyTime} </li>`);
        } else if (!item.HighlightProduct.includes("Xuất sứ") && !item.HighlightProduct.includes("Xuất xứ")) {
            $('.hl-' + item.Id).append(`<span>- Xuất xứ: ${item.Origin} </span> <br/>`);
            $('.hl-' + item.Id).append(`<span>- Bảo hành: ${item.GurantyTime} </span>`);
        }
        console.log(item.HighlightProduct);
        $(`#qr${item.Id}`).qrcode({ render: "image", text: item.ProductCode, size: 120 });
    });
    $(".print-p5 img").remove();
    $(".print-p2 ul").removeAttr("style");
    $(".print-p2 ul li").removeAttr("style");
    $(".print-p6 ul").removeAttr("style");
    $(".print-p6 ul li").removeAttr("style");
    $(".print-p5 ul").removeAttr("style");
    $(".print-p5 ul li").removeAttr("style");
    $(".print-p6 ul>li>span").remove();
    $(".print-p6 ul>li img").remove();
    $(".print-page ul li").css({ color: "#000000" });
}

function printLargeStart() {
    $("#div-print-large").printThis({
        loadCSS: "/iotsoftvn/style.css",
    });
}
function printSmallStart() {
    $("#div-print-small").printThis({
        loadCSS: "/iotsoftvn/style.css",
    });;
}

