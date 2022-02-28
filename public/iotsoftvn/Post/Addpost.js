var BANNER_ID = 0;

$(document).ready(function () {

    INIT_SUMMERNOTE('#editor');
    /*Khoi tao select chon danh muc*/
    initSelect({
        Element: "#sl-category-add",
        Url: 'PostCategory',
        Value: 'Name',
        Id: "Id",
        Placeholder: "Chọn danh mục tin tức"
    }, false);

    /*khởi tạo pick banner*/
    INIT_FILE_MANAGE('#btn-banner', function (file) {
        BANNER_ID = file.Id;
        $('#img-banner').attr('src', getImagePath(file.FilePath));
    })

    INIT_FILE_MANAGE('#btn-thumbnail-post', function (file) {
        $('#img-thumbnail-add').attr('src', getImagePath(file.FilePath));
    })
    $("#editor").on("summernote.change", function (e) {   // callback as jquery custom event
        let str = $('.note-editable').html().replace(/&nbsp;|<[^>]+>/g, ' ')
        let count_Keyword_seo = 0;
        if ($('#ipt-keyword-seo').val() == '') {
            count_Keyword_seo = 0;
        }else if (str.match(new RegExp($('#ipt-keyword-seo').val(), "g")) != null) {
            count_Keyword_seo = str.match(new RegExp($('#ipt-keyword-seo').val(), "g")).length;
        }
        $('#count_keyword_seo').html(`<i class="mdi mdi-circle text-success mr-1"></i> Số lần xuất hiện từ khóa: ${count_Keyword_seo}.`);
        $('#length_desc').html(`<i class="mdi mdi-circle ${str.length < 300 ? "text-danger" : "text-success"} mr-1"></i> Độ dài của văn bản: Văn bản chứa ${str.length} từ.${str.length < 300 ? " Số lượng từ quá ít so với mức tối thiểu 300 từ" : ""}`);
    });
});

/*Binding event khi nhập title, tạo url friendly*/
$('input[name="Title"]').on('input', function (e) {
    $('input[name="FiendlyUrl"]').val(MakeUrl($('input[name="Title"]').val()));
    $('#preview-url').html(`${document.location.host}/<span class='text-muted'>${MakeUrl($('input[name="Title"]').val())}</span>`)
    $('#preview-title').html($('input[name="Title"]').val());
});
$('[name="Description"]').on('input', function (e) {
    let desc = $('[name="Description"]').val();
    $('#preview-desc').html(desc);
    if (desc.length < 120)
        $('#length_meta_desc').html(`<i class="mdi mdi-circle text-danger mr-1"></i>Độ dài mô tả Meta: Mô tả Meta quá ngắn (dưới 120 ký tự). Có thể lên tới 156 ký tự.`)
    else if (desc.length > 156)
        $('#length_meta_desc').html(`<i class="mdi mdi-circle text-danger mr-1"></i>Độ dài mô tả Meta: Mô tả Meta quá ngắn (dưới 120 ký tự). Có thể lên tới 156 ký tự.`)
    else
        $('#length_meta_desc').html(`<i class="mdi mdi-circle text-success mr-1"></i> Độ dài mô tả Meta: Rất tốt`);
})

$('#ipt-keyword-seo').on('input',() => {
    $('#editor').trigger('summernote.change');
})

$('#btn-save').on('click', function () {

    let content = getSummernote('#editor');
    var post = formToObject('#form-add');
    if (BANNER_ID == 0) {
        alertify.alert('Banner không được trống');
    } else if (IsNullOrEmpty(post.Title)) {
        alertify.alert('Tiêu đề không được trống');
    } else if (IsNullOrEmpty(post.CategoryId)) {
        alertify.alert('Chưa chọn danh mục');
    } else if (IsNullOrEmpty(content)) {
        alertify.alert('Chưa nhập nội dung');
    } else if (IsNullOrEmpty(post.FiendlyUrl)) {
        alertify.alert('Chưa nhập đường dẫn ');
    } else if (!isValidFriendlyUrl(post.FriendlyUrl)) {
        alertify.alert('Đường dẫn chứa kí tự không hợp lệ');
    } else {
        alertify.confirm('Xác nhận tạo bài viết', function () {
            ajaxPost('post', {
                SubTitle: post.Description,
                PostCategoryId: parseInt(post.CategoryId),
                BannerId: BANNER_ID,
                Title: post.Title,
                Content: content,
                FriendlyUrl: $('#FiendlyUrl').val(),
                Status: 1,
                Tag: " ",
                ThumbNail: $('#img-banner').attr('src').slice(1, $('#img-banner').attr('src').length),
                Type: parseInt(post.Type)
            }, function (res) {
                if (res.IsSuccess) {
                    alertify.alert("Tạo bài viết thành công", function () {
                        location.href = '/admin/post/add';

                    })
                } else
                    alertify.alert(res.Message)
            })
        })
    }
});
function reset() {
    BANNER_ID = 0;
    $('#img-banner').attr('src', '');
    $('input[name="Title"]').val('');
    $('input[name="Title"]').val('');
    $('textarea[name="Description"]').val('');
    setSummernote('#edito', '');
}
