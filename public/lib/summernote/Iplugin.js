function INIT_FILE_MANAGE(input, callBack) {
    $(input).unbind().on('click', function () {
        var fm = $('<div/>').dialogelfinder({
            url: '/el-finder-file-system/connector',
            baseUrl: "/lib/elfinder/",
            uploadAllow:["image"],
            lang: 'vi',
            width: 840,
            height: 450,
            destroyOnClose: false,
            getFileCallback: function (files, fm) {
                console.log('Toan', files);
                ajaxPost('folder/FileFromPath', files, function (res) {
                    if (res.IsSuccess) {
                        callBack(res.Result)
                    }
                })
            },
            commandsOptions: {
                getfile: {
                    oncomplete: 'close',
                    folders: false
                }
            }
        }).dialogelfinder('instance');
    })
}

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.plugins, {
        // Tạo plugin tên elfinder  
        'elfinder': function (context) {
            var self = this;
            // ui has renders to build ui elements.
            var ui = $.summernote.ui;
            // Tạo nút bấm
            context.memo('button.elfinder', function () {
                var button = ui.button({
                    contents: '<i class="note-icon-picture"/> elFinder',
                    tooltip: 'Quản lý file',
                    click: function () {
                        // Bấm vào nút bấm gọi hàm elfinderDialog   
                        INIT_FILE_SUMMERNOTE(context);
                    }
                });
                // create jQuery object from button instance.
                var $elfinder = button.render();
                return $elfinder;
            });
            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                this.$panel.remove();
                this.$panel = null;
            };
        }

    });
}));

// tạo summernote 
function INIT_SUMMERNOTE(input) {
    $(input).summernote({
        height: 300,
        toolbar: [
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', /*'picture', 'video',*/ 'hr', 'readmore']],
            ['genixcms', ['elfinder']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ],
        onImageUpload: function (files, editor, welEditable) {
            sendFile(files[0], editor, welEditable);
        }
    });
}

// binding event chọn hình ảnh summernote
function INIT_FILE_SUMMERNOTE(editor) {
    var fm = $('<div/>').dialogelfinder({
        url: '/el-finder-file-system/connector',
        baseUrl: "/lib/elfinder/",
        lang: 'vi',
        width: 840,
        height: 450,
        destroyOnClose: true,
        getFileCallback: function (files, fm) {
            editor.invoke('editor.insertImage', files.url);
        },
        commandsOptions: {
            getfile: {
                oncomplete: 'close',
                folders: false
            }
        }
    }).dialogelfinder('instance');
}


function getSummernote(input) {
    return    $(input).summernote('code');
}
function setSummernote(input,value) {
    $(input).summernote('code', value);
}