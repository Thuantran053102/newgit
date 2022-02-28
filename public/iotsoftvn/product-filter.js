
$(function () {
    getBranchByCategoryId();
    getFilterByCategoryId();
    getPrice();

    $('[data-toggle="select-no-search"]').select2({ language: 'vi', width: '100%', minimumResultsForSearch: -1 });


    $('#div-filter').find('select').on('select2:select', function (e) {
        let key = $(this).attr('data-key');
        console.log(e);
        let value = e.params.data.id;
        if (key == KEY.Cat && getParam(KEY.Page)) {
            history.pushState({ id: 'search' }, '', removeParam(KEY.Page));
        }
        builderUrl(key, value, true);
    })

    $('#div-filter').find('select').each(function () {
        let $this = $(this);
        let key = $this.attr('data-key');
        let value = getParam(key) ? getParam(key) : '0';
        $this.val(value).trigger('change');
    })

    $('input[type="checkbox"]').on('click', function (e) {
        let key = $(this).attr('data-key');
        let value = '';
        $(`input[data-key="${key}"]`).each(function () {
            let $this = $(this);
            if ($this.is(':checked')) {
                value += $this.attr('data-value') + ',';
            }
        })
        if (value != '') {
            value = value.substring(0, value.length - 1);
        }

        builderUrl(key, value, true);
    })

    $("#ipt-search-layout").val(getParam('keyword'));
})

let KEY = {
    Page: 'page',
    Sort: 'sort',
    Box: 'box',
    Brand: 'brand',
    Cat: 'cat',
    Price: 'price'
}

const CATEGORY_ID = getParam(KEY.Cat);


function getBranchByCategoryId() {
    ajaxGet('ProductBrand', { categoryids: CATEGORY_ID }, function (data) {
        if (data.IsSuccess) {
            let html = '';
            $.each(data.Result, function (index, item) {
                html += `
                                <li>
                                    <label class="custom-control custom-checkbox cursor-pointer mb-2 mr-sm-2 mb-sm-0">
                                        <input data-key="${KEY.Brand}" data-value="${item.Id}" type="checkbox" class="custom-control-input" ${isChecked(KEY.Brand, item.Id) ? 'checked' : ''}>
                                        <span class="custom-control-indicator"></span>
                                        <span class="custom-control-description">${item.BrandName}</span>
                                    </label>
                                </li>
                            `;
            });
            [...$('.ulBranch')].map((x) => { $(x).html(html); })
        }
    }, () => { }, false)
}

function getFilterByCategoryId() {
    ajaxGet('ProductCategory/CategoryFilter/' + CATEGORY_ID, {}, function (data) {
        if (data.IsSuccess) {
            $.each(data.Result.PropertyFilters, function (index, item) {
                let html = `
                                                <div class="card">
                                                    <div class="card-header" role="tab">
                                                        <h6 class="mb-0">
                                                            <a class="collapsed" data-toggle="collapse" href="#collapse-${item.Id}">${item.PropertyName}<span><i class="fa fa-plus-square-o"></i></span></a>
                                                        </h6>
                                                    </div>
                                                    <div id="collapse-${item.Id}" class="collapse show">
                                                        <div class="card-block">
                                                            <ul class="trends">${renderValue(item.Values)}</ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                $('#div-filter').append(html);
            })
        }
    }, () => { }, false)
}

function renderValue(values) {
    let html = '';
    values.forEach(function (item) {
        html += `
                                    <li>
                                        <label class="custom-control custom-checkbox cursor-pointer mb-2 mr-sm-2 mb-sm-0">
                                            <input data-key="${item.PropertyId}" data-value="${item.Id}" type="checkbox" class="custom-control-input" ${isChecked(item.PropertyId, item.Id) ? 'checked' : ''}>
                                            <span class="custom-control-indicator"></span>
                                            <span class="custom-control-description">${item.Value}</span>
                                        </label>
                                    </li>
                                `;
    })
    return html;
}

function getPrice() {
    let data = [
        { title: 'Tất cả giá', value: '0' },
        { title: 'Từ 0 - 500K', value: '0-500000' },
        { title: 'Từ 500K - 1 triệu', value: '500000-1000000' },
        { title: 'Từ 1 triệu - 3 triệu', value: '1000000-3000000' },
        { title: 'Từ 3 triệu -5 triệu', value: '3000000-5000000' },
        { title: 'Từ 5 triệu - 7 triệu', value: '5000000-7000000' },
        { title: 'Từ 7 triệu - 10 triệu', value: '7000000-10000000' },
        { title: 'Từ 10 triệu - 15 triệu', value: '10000000-15000000' },
        { title: 'Trên 15 triệu', value: '15000000-0' },
    ]
    let html = '';
    data.forEach(function (item) {
        html += `<option value="${item.value}">${item.title}</option>`;
    })
    $('.sel-price-search').html(html);
}

//param isResetPageIndex  dặt default để luôn set pageindex = 1  khi chọn filter. 
// Chỉ trường hợp click chuyển trang mới set  = false
function builderUrl(key, value, isResetPageIndex = true) {
    if (value == '' || !value) {
        window.location.href = removeParam(key);
        return;
    }
    let params = window.location.search;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = params.indexOf('?') !== -1 ? "&" : "?";
    if (params.match(re)) {
        params = params.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        params = params + separator + key + "=" + value;
    }
    let url = window.location.pathname + params;
    if (isResetPageIndex) {
        var rexPage = new RegExp("([?&])" + 'page' + "=.*?(&|$)", "i");
        if (params.match(rexPage)) {
            params = params.replace(rexPage, '$1' + 'page' + "=" + 1 + '$2');
        } else {
            params = params + separator + 'page' + "=" + 1;
        }
        url = window.location.pathname + params;
    }
    window.location.href = url;
}


function getParam(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function removeParam(name) {
    var url = window.location.href.split('?')[0] + '?';
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] != name) {
            url = url + sParameterName[0] + '=' + sParameterName[1] + '&'
        }
    }
    return url.substring(0, url.length - 1);
}

function isChecked(key, value) {
    let result = false;
    let params = getParam(key);
    if (params != null) {
        let listParam = params.split(',');
        listParam.forEach(function (item) {
            if (item == value) {
                result = true;
                return;
            }
        })
    }
    return result;
}
