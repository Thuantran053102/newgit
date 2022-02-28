var CALLBACKS = [];
var CURRENT_KEY = "";
function INIT_FILE_MANAGE(input, callBack) {
        CALLBACKS.push({ name: input, callback: callBack });
    $(input).unbind().on('click', function () {
        CURRENT_KEY = input;
        if ($('.elfinder.dialogelfinder').length > 0) {
            $('.elfinder.dialogelfinder').css({ top: $(input).offset().top })
            $('.elfinder.dialogelfinder').show();
        } else {

            var option = getOption();
            option.commandsOptions = {
                getfile: {
                    oncomplete: 'close',
                    folders: false
                }
            };
            option.getFileCallback = function (files, fm) {
                if (!['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(files.mime)) {
                    alertify.error("Định dang không hợp lệ, vui lòng chọn lại")
                    return;
                }
                ajaxPost('folder/FileFromPath', files, function (res) {
                    if (res.IsSuccess) {
                        let callBackResult = CALLBACKS.find(n => n.name == CURRENT_KEY).callback;
                        callBackResult(res.Result)
                    }
                })
            };
            option.width = 840;
            option.height = 450;
            option.destroyOnClose = false;

            var fm = $('<div/>').dialogelfinder(option).dialogelfinder('instance');
        }
    })
}
/*Su kien khi them 1 file le hay folder*/
function fsAdded(ev, instan) {
    //if (ev.data.redo.cmd == "rename") {
    //    alertify.alert("Bạn không thể đổi tên tập tin hoặc thư mục !");
    //    ev.data.added = [];
    //}
    let count = ev.data.added.length;
    if (count > 0 && ev.data.added[0].mime != "directory") {
        ev.data.added = ev.data.added.filter(n => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(n.mime));
        if (count > ev.data.added.length) {
            alertify.alert("Tệp không đúng định dạng, chỉ hỗ trợ định dạng hình ảnh png, jpg, jpeg, gif");
        }
    }
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
    try {
        $.extend($.summernote.plugins, {
            // Tạo plugin tên elfinder  
            'elfinder': function (context) {
                var self = this;
                // ui has renders to build ui elements.
                var ui = $.summernote.ui;
                // Tạo nút bấm
                context.memo('button.elfinder', function () {
                    var button = ui.button({
                        contents: '<i class="note-icon-picture"/>',
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
    } catch (e) {

    }
}));

// tạo summernote 
function INIT_SUMMERNOTE(input) {
    $(input).summernote({
        height: 300,
        popover: {
            image: [
                ['custom', ['imageAttributes']],
                ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
        },
        toolbar: [
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'unlink', 'video', 'hr', 'readmore']],
            ['genixcms', ['elfinder']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ],
        imageAttributes: {
            linkHref: 'URL',
            linkTarget: 'Target',
            icon: '<i class="note-icon-pencil"/>',
            removeEmpty: false, // true = remove attributes | false = leave empty if present
            disableUpload: false // true = don't display Upload Options | Display Upload Options
        },
        onImageUpload: function (files, editor, welEditable) {
            sendFile(files[0], editor, welEditable);
        },
        tabSize: 4
    });

}

// binding event chọn hình ảnh summernote
function INIT_FILE_SUMMERNOTE(editor) {
    //if ($('.elfinder.dialogelfinder').length > 0) {
    //    $('.elfinder.dialogelfinder').css({ top: $(editor.$note[0]).offset().top})
    //    $('.elfinder.dialogelfinder').show();
    //} else {

    let option = getOption();
    option.getFileCallback = function (files, fm) {
        editor.invoke('editor.insertImage', files.url);
    };
    option.commandsOptions = {
        getfile: {
            oncomplete: 'close',
            folders: false
        }
    };
    option.width = 840;
    option.height = 450;
    option.destroyOnClose = false;
    var fm = $('<div/>').dialogelfinder(option).dialogelfinder('instance');
    //  }
}


function getSummernote(input) {
    return $(input).summernote('code');
}
function setSummernote(input, value) {
    $(input).summernote('code', value);
}

/*Init trong page quản lý file, ko có callback get file*/
function initFileManager(input) {
    var myCommands = elFinder.prototype._options.commands;
    // Not yet implemented commands in elFinder.NetCore
    var disabled = ['callback', 'chmod', 'editor', 'netmount', 'ping', 'search', 'zipdl', 'help'];
    elFinder.prototype.i18.en.messages.TextArea = "Edit";

    $.each(disabled, function (i, cmd) {
        (idx = $.inArray(cmd, myCommands)) !== -1 && myCommands.splice(idx, 1);
    });
    var options = getOption();
    options.commands = myCommands;
    $(input).elfinder(options).elfinder('instance');


}

function getOption() {
    var option = {
        baseUrl: "/lib/elfinder/",
        url: "/el-finder-file-system/connector",
        rememberLastDir: false,
        lang: 'vi',
        //fileFilter: /.*\.(png|jpg|jpeg|gif)$/i,
        onlyMimes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        uploadAllow: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        uploadOrder: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        //commandsOptions: {
        //    edit: ['image/png', 'image/jpg', 'image/jpeg'],
        //},
        handlers: {
            add: function (ev, instan) {
                fsAdded(ev, instan)
            },
            upload: function (event, instance) {
                var uploadedFiles = event.data.added;
                console.log(uploadedFiles);
                var archives = ['application/zip', 'application/x-gzip', 'application/x-tar', 'application/x-bzip2'];
                for (i in uploadedFiles) {
                    //var file = uploadedFiles[i];
                    //file.name = MakeUrl(file.name.replace(/\.[^/.]+ $/, ""));
                    if (jQuery.inArray(file.mime, archives) >= 0) {
                        instance.exec('extract', file.hash);
                    }
                }
            }
        },
        showFiles: 20,
        uiOptions: {
            //toolbar: [

            //    ['rename', 'edit'],
            //    ['view', 'sort']
            //]
        },
        //validName: /^[a-z0-9_]+$/i,
        validName: /^[^\s]+$/i,// ko cho đấu space
        height: $(window).height() - 100,
        onlyMimes: ["image"],// Get files of requested mime types only
        lang: 'vi',
        disabled: ["rename"]
    }
    return option;
}
//$('*').draggable({ disabled: true });