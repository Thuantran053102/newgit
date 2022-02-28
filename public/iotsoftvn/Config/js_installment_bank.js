var $formDetail = $('#form-detail');
var LOGO_ADD = "", LOGO_EDIT = "", CURRENT_EIT_ID = 0;
$(function () {
    loadBanks();
    INIT_FILE_MANAGE("#img-logo-detail", function (res) {
        CURRENT_IMG_PATH = res.ThumbNailPath;
        $("#img-logo-detail").attr('src', "/" + res.ThumbNailPath);
        LOGO_EDIT = res.FilePath;
    })
    INIT_FILE_MANAGE("#img-logo-add", function (res) {
        CURRENT_IMG_PATH = res.ThumbNailPath;
        $("#img-logo-add").attr('src', "/" + res.ThumbNailPath)
        LOGO_ADD = res.FilePath;
    })
})


var BANKS = [];

function addSaveChange() {
    var bank = formToObject("#form-add");
    bank.CountMonth = $("#sl-CountMonth-add").val();
    bank.InterestRate = parseFloat(bank.InterestRate);
    bank.MiximumPrepay = parseInt(bank.MiximumPrepay);
    bank.MaximumPrepay = parseInt(bank.MaximumPrepay);
    bank.PhiHoSo = parseInt(bank.PhiHoSo);
    if (bank.PhiHoSo < 1000) bank.PhiHoSo = bank.PhiHoSo * 1000;
    let error = "";
    if (IsNullOrEmpty(bank.BankName))
        error = "Tên không được để trống";
    else if (bank.InterestRate == 0)
        error = "Lãi suất phải lớn hơn 0";
    else if (IsNullOrEmpty(bank.Papers))
        error = "Giấy tờ không được để trống";
    else if (bank.MiximumPrepay < 10)
        error = "Mức trả trước tối thiểu phải lớn hơn 0, nhỏ hơn hoặc bằng 70 và là bội của 10";
    else if (bank.MaximumPrepay >= 100)
        error = "Mức trả trước tối đa phải nhỏ hơn 100 và là bội của 10";
    else if (bank.MaximumPrepay < bank.MiximumPrepay)
        error = "Mức trước tối đa không được nhỏ hơn giá trị trả trước tối thiểu";
    else if (bank.CountMonth.length < 1)
        error = "Chưa chọn số tháng ngân hàng hỗ trợ";
    bank.CountMonth = bank.CountMonth.join("|");
    bank.LogoPath = LOGO_ADD;
    if (error != "") {
        alertify.error(error);
        return;
    }

    ajaxPost("Installmentbank", bank, function (res) {
        if (res.IsSuccess) {
            alertify.success("Thêm thành công");
            $("#form-add").trigger("reset");
            $("#img-logo-add").attr('src', "https://via.placeholder.com/150");
            hideModal("#modal-add");
            LOGO_ADD = "";
            $("#sl-CountMonth-add").val("").trigger("change");
            hideModal("#modal-add");
            loadBanks();

        } else {
            alertify.error(res.Message);
        }

    })

}


function loadBanks() {
    ajaxGet('Installmentbank/get-all', null,
        function (rs) {
            if (rs.IsSuccess) {
                BANKS = rs.Result;
                let html = BANKS.map((n, i) => (`<tr onclick="showModalDetail(${n.Id})">
                   <td>${i + 1}</td>
                    <td class="table-user">
                        <img src="/${n.LogoPath}" class="me-2 rounded-circle" />
                       ${n.BankName}
                    </td>
                    <td> ${n.InterestRate}%</td>
                    <td>${n.MiximumPrepay} % - ${n.MaximumPrepay}%</td>
                    <td>${n.CountMonth.split("|").map((n) => (n + ' Tháng '))}</td>
                    <td>${formatMoney(n.PhiHoSo)}</td>

                </tr>`));
                $('#tableBody').html(html);

            } else {
                alertify.error(rs.Message);
            }
        }
    );
}
function showModalDetail(id) {
    var bank = BANKS.find(n => n.Id == id);
    CURRENT_EIT_ID = id;
    $formDetail.find("input[name='BankName']").val(bank.BankName);
    $formDetail.find("input[name='Papers']").val(bank.Papers);
    $formDetail.find("input[name='InterestRate']").val(bank.InterestRate);
    $formDetail.find("select[name='CountMonth']").val(bank.CountMonth.split("|")).trigger("change");;
    $formDetail.find("input[name='MiximumPrepay']").val(bank.MiximumPrepay);
    $formDetail.find("input[name='MaximumPrepay']").val(bank.MaximumPrepay);
    $formDetail.find("input[name='PhiHoSo']").val(bank.PhiHoSo);
    $formDetail.find("#img-logo-detail").attr("src", "/" + bank.LogoPath);
    LOGO_EDIT = bank.LogoPath;
    showModal("#modal-detail");
    $("#btn-remove").unbind().on('click', function () {
        alertify.confirm("Xác nhận xóa ngân hàng", function () {
            ajaxDelete('Installmentbank/' + id, function (res) {
                if (res.IsSuccess) {
                    alertify.success("Xóa thành công");
                    loadBanks();
                    hideModal("#modal-detail");
                } else {
                    alertify.error(res.Message);
                }
            })

        })
    })
}
$formDetail.on('submit', function (e) {
    e.preventDefault();
    var bank = formToObject("#form-detail");
    bank.Id = CURRENT_EIT_ID;
    bank.CountMonth = $("#sl-CountMonth-detail").val();
    bank.InterestRate = parseFloat(bank.InterestRate);
    bank.MiximumPrepay = parseInt(bank.MiximumPrepay);
    bank.MaximumPrepay = parseInt(bank.MaximumPrepay);
    bank.PhiHoSo = parseInt(bank.PhiHoSo);
    if (bank.PhiHoSo < 1000) bank.PhiHoSo = bank.PhiHoSo * 1000;
    let error = "";
    if (IsNullOrEmpty(bank.BankName))
        error = "Tên không được để trống";
    else if (bank.InterestRate == 0)
        error = "lãi suất phải lớn hơn 0";
    else if (IsNullOrEmpty(bank.Papers))
        error = "Giấy tờ không được để trống";
    else if (bank.MiximumPrepay < 10)
        error = "Mức trả trước tối thiểu phải lớn hơn 0, nhỏ hơn hoặc bằng 70 và là bội của 10";
    else if (bank.MaximumPrepay >= 100)
        error = "Mức trả trước tối đa phải nhỏ hơn 100 và là bội của 10";
    else if (bank.MaximumPrepay < bank.MiximumPrepay)
        error = "Mức trước tối đa không được nhỏ hơn giá trị trả trước tối thiểu";
    else if (bank.CountMonth.length < 1)
        error = "Chưa chọn số tháng ngân hàng hỗ trợ";
    bank.CountMonth = bank.CountMonth.join("|");
    bank.LogoPath = LOGO_EDIT;
    if (error != "") {
        alertify.error(error);
        return;
    }

    ajaxPut("Installmentbank", bank, function (res) {
        if (res.IsSuccess) {
            alertify.success("Cập nhật  thành công");
            hideModal('#modal-detail');
            loadBanks();
        } else {
            alertify.error(res.Message);
        }

    })
})