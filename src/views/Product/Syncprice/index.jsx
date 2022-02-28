import React from "react";

function SyncPrice(){
    return(

        <>

        
<div className="container-fluid">
    <div id="preloader" style={{display: 'none', opacity:'0.5'}}>
        <div id="status">
            <div className="bouncing-loader"></div>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <div className="page-title-box">
                <div className="page-title-right">
                    <a href="javascript:openTableExport('#div-export', 'xlsx', 'DANH_SACH_DONG_BO')" className="btn btn-primary mr-3"><i className="mdi mdi-file-excel font-16 mr-1"></i>Export Excel</a>
                    <a href="javascript:getSyncPrice()" className="btn btn-primary mr-3"><i className="mdi mdi-download font-16 mr-1"></i>Kiểm tra dữ liệu giá - số tồn </a>
                    <a href="javascript:syncPrice()" className="btn btn-primary"><i className="mdi mdi-sync font-16 mr-1"></i>Đồng bộ tất cả </a>
                </div>
                <h4 className="page-title">Đồng bộ giá - số lượng tồn</h4>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div id="div-export" className="col-lg-12">
                            <table className="table table-hover table-centered">
                                <thead>
                                    <tr>
                                        <th className="text-center px-w-50">#</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th className="money">Giá niêm yết cũ</th>
                                        <th className="money">Giá niêm yết mới</th>
                                        <th className="money">Giá bán lẻ cũ</th>
                                        <th className="money">Giá bán lẻ mới</th>
                                        <th className="money">Số tồn cũ</th>
                                        <th className="money">Số tồn mới</th>
                                        <th className="money">Đặc điểm nổi bật</th>
                                        <th className="">Thông tin khuyến mãi</th>

                                        <th className="">Xuất xứ</th>
                                        <th className="">Bảo hành</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    <tr>
                                        <td className="text-center" colspan="9"><i className="mdi mdi-48px mdi-spin mdi-loading"></i> Đang tải dữ liệu đồng bộ</td>
                                    </tr>
                                    {/* @*@if (Model == null || Model.Count == 0)
                                        {
                                        <tr className="text-muted"><td colspan="9" className="text-center"><div className="text-center text-muted pt-4 pb-4"><p className="mb-0"><i className="mdi mdi-48px mdi-folder-open-outline"></i></p><p>Không có sản phẩm nào chưa đồng bộ</p></div></td></tr>
                                        }
                                        @{ int i = 0;} */}
                                        {/* @foreach (var item in Model)
                                        {
                                            var SttGiaNiemYet = "";
                                            if (item.GiaNiemYet > item.GiaNiemYetCu)
                                                SttGiaNiemYet = @"<span className="" text-success  mdi mdi-arrow-up-bold""></span>";
                                            else if (item.GiaNiemYet < item.GiaNiemYetCu)
                                                SttGiaNiemYet = @"<span className="" text-danger  mdi mdi-arrow-down-bold""></span>";
                                            var SttGiaBanLe = "";
                                            if (item.GiaBanLe > item.GiaBanLeCu)
                                                SttGiaBanLe = @"<span className="" text-success  mdi mdi-arrow-up-bold""></span>";
                                            else if (item.GiaBanLe < item.GiaBanLeCu)
                                                SttGiaBanLe = @"<span className="" text-danger  mdi mdi-arrow-down-bold""></span>";

                                            var SttSoTon = "";
                                            if (item.SoLuongTon > item.SoLuongTonCu)
                                                SttSoTon = @"<span className="" text-success  mdi mdi-arrow-up-bold""></span>";
                                            else if (item.SoLuongTon < item.SoLuongTonCu)
                                                SttSoTon = @"<span className="" text-danger  mdi mdi-arrow-down-bold""></span>";

                                            <tr>
                                                <td className="">@(i += 1)</td>
                                                <td>@item.ProductID</td>
                                                <td>@item.ProductName</td>
                                                <td className="text-right">@Global.FormatMoney(item.GiaNiemYetCu)</td>
                                                <td className="text-right">@Global.FormatMoney(item.GiaNiemYet.GetValueOrDefault()) @Html.Raw(SttGiaNiemYet)</td>
                                                <td className="text-right">@Global.FormatMoney(item.GiaBanLeCu)</td>
                                                <td className="text-right">@Global.FormatMoney(item.GiaBanLe.GetValueOrDefault()) @Html.Raw(SttGiaBanLe)</td>
                                                <td className="text-right">@item.SoLuongTonCu</td>
                                                <td className="text-right">@item.SoLuongTonCu @Html.Raw(SttSoTon)</td>

                                            </tr>
                                        }*@ */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </>
    )
}
export default SyncPrice