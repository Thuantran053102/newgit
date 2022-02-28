
const URL_BASE = {
    PropertyGroups: 'propertygroups',
    Property: 'property',
    ProductCategory: 'ProductCategory',
    ProductBrand: 'ProductBrand',
    User: 'User',
    ProductBrand: 'ProductBrand',

}

var selectData = {};

function getSelectedItem(id) {
    return selectData.find(x => x.Id == id);
}

function initSelectSearch(input) {
    /*
     {
        Element : ,
        Url : ,
        Value : ,
        Id : ,
        Placeholder :
     }
     */
    $(input.Element).select2({
        ajax: {
            url: ROOT_API + input.Url,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            delay: 200,
            data: function (params) { return { keyword: params.term } },
            processResults: function (data) {
                selectData = data.Result;
                return {
                    results: $.map(data.Result, function (item) {
                        return {
                            text: item[input.Value],
                            id: item[input.Id]
                        }
                    })
                };
            },
            cache: true
        },
        language: 'vi',
        width: '100%',
        tag: true,
        closeOnSelect: false,
        placeholder: input.Placeholder,
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 1,
        templateResult: function (repo) {
            if (repo.loading) { return repo.text; }
            return `<p class="m-b-0">${repo.text}</p>`;
        }
    });
}

async function initSelect(input, AddAll = false, callback) {
    /*
     * AddAll : thêm option tất cả
     {
        Element,
        Url,
        Value,
        Id,
        AddAl
     }
     */
    await $.get(ROOT_API + input.Url, {}, function (data) {
        if (data.IsSuccess) {
            $(input).html('');
            let htmlOption = '';
            if (AddAll)
                htmlOption = '<option value="0">Tất cả</option>';
            $.each(data.Result, function (index, item) {
                htmlOption += `<option value="${item[input.Id]}">${item[input.Value]}</option>`;
            })
            $(input.Element).html(htmlOption);
            $(input.Element).select2({ language: 'vi', width: '100%', minimumResultsForSearch: -1 });
            if (callback != undefined)
                callback(data.Result);
        } else {
            alertify.alert(data.Message);
        }
    }, "json");
}

/*init select search product category*/
function initProductCategory(slId, addAll = false, callback) {
    initSelect({
        Element: slId,
        Url: "ProductCategory",
        Value: "CategoryName",
        Id: "Id",
        Placeholder: "Nhập tên danh mục..."
    }, addAll, callback);

}

/*init select search product brand*/
function initProductBrand(slId, addAll = false, callback) {
    initSelectSearch({
        Element: slId,
        Url: "ProductBrand",
        Value: "BrandName",
        Id: "Id",
        Placeholder: "Nhập tên danh mục..."
    }, addAll, callback);
}

/*Binding event khi nhập title, tạo url friendly*/
function initGenerateFriendlyUrl(origin, target) {
    $(origin).on('input', function (e) {
        $(target).val(MakeUrl($(origin).val()));
    });
}