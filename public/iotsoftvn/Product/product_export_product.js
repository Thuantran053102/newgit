var PAGE_INDEX = 1;

$(document).ready(function () {
    openModalExportExcel();
    var tbHead = $('#tbody-export-product').parent().find("thead").html(`<tr>
		<tr>
                                        <th class="text-center px-w-50">#</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th class="">Danh mục</th>
                                        <th class="">Thương hiệu</th>
                                        <th>Xuất xứ</th>
                                        <th>Tình trạng</th>
                                        <th>ĐVT</th>
                                        <th>Bảo hành</th>
                                        <th>Nội dung khuyến mãi</th>
                                        <th class="money">Giá niêm yết</th>
                                        <th class="money">Giá bán lẻ</th>
                                        <th >Đặc điểm nổi bật</th>
                                 
	</tr>`);
})

function generateCategory(categories) {
    if (categories == undefined) {
        return `<span class="badge badge-primary">Không có danh mục</span>`;
    } else
        return categories.map(n => `<span class="badge badge-primary">${n.CategoryName}</span>`)
}

function openModalExportExcel() {
    ajaxGet("Product/AllProduct", {}, function (data) {
        if (data.IsSuccess) {
            let html = "";
            data.Result.Data.map((item, index) => {
                html += ` <tr>
                                        <td class="text-center">${index + 1}</td>
                                        <td>${item.ProductCode}</td>
                                        <td> ${item.ProductName}</td>
                                        <td style="max-width: 100px;" class="text-left">${generateCategory(item.ProductCategories)}</td>
                                        <td class="text-left">${generateBrandName(item.ProductBrand)}</td>
                                        <td>${getEmptyOrDefault(item.Origin)}</td>
                                        <td><span class="badge badge-${item.Status ? "primary-lighten" : "danger-lighten"}">${item.Status ? "Đang bán" : "Dừng bán"}</span></td>
                                        <td>${item.Unit}</td>
                                        <td>${item.GurantyTime}</td>
                                        <td>${generatePromotionContent(item.PromotionContent)}</td>
                                        <td class="money">${formatMoney(item.OriginPrice).replace(/đ/, '')}</td>
                                        <td class="money">${formatMoney(item.GiaBanLe).replace(/đ/, '')}</td>
										<td>${item.HighlightProduct}</td>
                                    </tr>`
            })
            $('#tbody-export-product').html(html);
        }
    })
}

function generateBrandName(BrandName) {
    if (BrandName == undefined) {
        return;
    } else
        return BrandName.BrandName;
}
function generateProperty(Property) {
    let html = '<ul>'
    Property.map((item, index) => {
        let PropertyName = item.Property.PropertyName;
        let PropertyValue = '';
        if (item.Values[0] != undefined) {
            if (item.Values[0].Value == undefined) {
                PropertyValue = '';
            } else {
                PropertyValue = item.Values[0].Value;
            }

            if (PropertyName != null || PropertyName != undefined) {
                html += `<li>${PropertyName + ": " + PropertyValue}</li>`
            }
        }
    })
    html += "</ul>"
    return html;

}
function generatePromotionContent(PromotionContent) {
    if (PromotionContent == null)
        return ""; else return PromotionContent;
}