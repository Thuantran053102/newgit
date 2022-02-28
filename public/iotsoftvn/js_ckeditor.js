function hideCkeditorPickImage() {
    $('.cke_dialog_background_cover').hide();
    $('.cke_reset_all cke_dialog_container').hide();

    $('.cke_reset_all.cke_dialog_container.cke_1.cke_editor_GoldrenCommitment_dialog').hide();
    $('.cke_reset_all.cke_dialog_container.cke_2.cke_editor_GoldrenCommitment_dialog').hide();
    $('.cke_reset_all.cke_dialog_container.cke_3.cke_editor_GoldrenCommitment_dialog').hide();
    $('.cke_reset_all.cke_dialog_container.cke_4.cke_editor_GoldrenCommitment_dialog').hide();
    $('.cke_reset_all.cke_dialog_container.cke_1.cke_editor_editor_dialog').hide();
}
function showCkeditorPickImage() {
    $('.cke_dialog_background_cover').show();
    $('.cke_reset_all cke_dialog_container').show();

    $('.cke_reset_all.cke_dialog_container.cke_1.cke_editor_GoldrenCommitment_dialog').show();
    $('.cke_reset_all.cke_dialog_container.cke_2.cke_editor_GoldrenCommitment_dialog').show();
    $('.cke_reset_all.cke_dialog_container.cke_3.cke_editor_GoldrenCommitment_dialog').show();
    $('.cke_reset_all.cke_dialog_container.cke_4.cke_editor_GoldrenCommitment_dialog').show();
    $('.cke_reset_all.cke_dialog_container.cke_1.cke_editor_editor_dialog').show();
}
function initCKEDITOR(input,height) {
    CKEDITOR.replace(input, {
        height:height,
        toolbar: [
            { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source'] },
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'] },
            { name: 'links', items: ['Link', 'Unlink',] },
            { name: 'insert', items: ['Image', 'Flash', 'Table', 'Iframe'] },
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
           
        ]
    });
}