
INIT_SUMMERNOTE('#editor');
let id = window.location.href.slice(window.location.href.lastIndexOf("\\") - 1)
var BANNER_ID = 0;
var STATUS_ID = 0;

$(document).ready(function () {
    /*khởi tạo pick banner*/
    INIT_FILE_MANAGE('#btn-banner', function (file) {
        BANNER_ID = file.Id;
        $('#img-banner').attr('src', getImagePath(file.FilePath));
    })
    INIT_FILE_MANAGE('#btn-thumbnail-post', function (file) {
        $('#img-thumbnail-edit').attr('src', getImagePath(file.FilePath));
    })
    ajaxGet("Post/" + id, {}, function (res) {
        if (res.IsSuccess) {
            let data = res.Result;
            $('#img-banner').attr('src', `${getImagePath(data.Banner.FilePath)}`)
            $('#ipt-edit-post-title').val(data.Title);
            $('#ipt-edit-post-friendly-url').val(data.FriendlyUrl);
            $('#textarea-edit-post-sub-title').val(data.SubTitle);
            $('#sel-edit-post-type').val(data.Type).trigger("change");
            initGenerateFriendlyUrl('#ipt-edit-post-title', '#ipt-edit-post-friendly-url');
            initSelect({
                Element: '#sel-edit-post-category',
                Url: 'PostCategory',
                Value: 'Name',
                Id: 'Id',
                Placeholder: 'Nhập tên danh mục ...'
            }, false, () => {
                $('#sel-edit-post-category').val(data.PostCategoryId).trigger('change');
            });
            STATUS_ID = data.Status;
            $('#ipt-edit-post-status').val(data.Status).trigger('change');
            $('#ipt-edit-post-note').val(IsNullOrEmpty(data.Note) ? "" : data.Note);
            BANNER_ID = data.BannerId;
            setSummernote('#editor', data.Content);
            $('input[name="Title"]').trigger('input');
            $('[name="Description"]').trigger('input');
        }
        else {
            alertify.alert(data.Message);
        }
    })

    $("#editor").on("summernote.change", function (e) {   // callback as jquery custom event
        let str = $('.note-editable').html().replace(/&nbsp;|<[^>]+>/g, ' ').toLowerCase();
        let count_Keyword_seo = 0;
        if ($('#ipt-keyword-seo').val() == '') {
            count_Keyword_seo = 0;
        } else if (str.match(new RegExp($('#ipt-keyword-seo').val().toLowerCase(), "g")) != null) {
            count_Keyword_seo = str.match(new RegExp($('#ipt-keyword-seo').val(), "g")).length == null ? 0 : str.match(new RegExp($('#ipt-keyword-seo').val(), "g")).length;
        }
        $('#count_keyword_seo').html(`<i class="mdi mdi-circle text-success mr-1"></i> Số lần xuất hiện từ khóa: ${count_Keyword_seo}.`);
        $('#length_desc').html(`<i class="mdi mdi-circle ${str.length < 300 ? "text-danger" : "text-success"} mr-1"></i> Độ dài của văn bản: Văn bản chứa ${str.length} từ.${str.length < 300 ? " Số lượng từ quá ít so với mức tối thiểu 300 từ" : ""}`);
    });
})

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

$('#ipt-keyword-seo').on('input', () => {
    $('#editor').trigger('summernote.change');
})

function UpdatePost() {
    let content = getSummernote('#editor');
    let title = $('#ipt-edit-post-title').val();
    let subTitle = $('#textarea-edit-post-sub-title').val();
    let CategoryId = $('#sel-edit-post-category').val();
    let friendluUrl = $('#ipt-edit-post-friendly-url').val();
    let type = $('#sel-edit-post-type').val();
    let note = $('#ipt-edit-post-note').val();
    if (IsNullOrEmpty(title)) {
        alertify.alert('Tiêu đề không được trống');
    } else if (IsNullOrEmpty(content)) {
        alertify.alert('Chưa nhập nội dung');
    } else if (IsNullOrEmpty(friendluUrl)) {
        alertify.alert('Chưa nhập đường dẫn ');
    } else if (!isValidFriendlyUrl(friendluUrl)) {
        alertify.alert('Đường dẫn chứa kí tự không hợp lệ');
    } else {
        alertify.confirm('Xác nhận cập nhập bài viết', function () {
            ajaxPut('post/' + id, {
                SubTitle: subTitle,
                PostCategoryId: parseInt(CategoryId),
                BannerId: BANNER_ID,
                Title: title,
                Note: note,
                Content: content,
                FriendlyUrl: friendluUrl,
                Status: STATUS_ID,
                Tag: " ",
                Type: parseInt(type),
                ThumbNail: $('#img-banner').attr('src').slice(1, $('#img-banner').attr('src').length),
            }, function (res) {
                if (res.IsSuccess) {
                    alertify.success("Cập nhập bài viết thành công")
                    window.location.href = "/admin/post"
                } else
                    alertify.alert(res.Message)
            })
        })
    }
}