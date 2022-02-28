import React from "react";

function ExportExcel(){
    return(
        <>
                        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <button onclick="openTableExport('#div-export', 'xlsx', 'DANH_SACH_SAN_PHAM');" className="btn btn-primary"><i className="mdi mdi mdi-file-export font-16 mr-1"></i>Export Excel</button>
                            </div>
                            <h4 className="page-title">Export Excel</h4>
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
                                                    <th className="">Danh mục</th>
                                                    <th className="">Thương hiệu</th>
                                                    <th>Xuất xứ</th>
                                                    <th>Tình trạng</th>
                                                    <th>ĐVT</th>
                                                    <th>Bảo hành</th>
                                                    <th>Nội dung khuyến mãi</th>
                                                    <th className="money">Giá niêm yết</th>
                                                    <th className="money">Giá bán lẻ</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbody-export-product">
                                                <tr>
                                                    <td className="text-center" colspan="15"><i className="mdi mdi-48px mdi-spin mdi-loading"></i></td>
                                                </tr>
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

export default ExportExcel