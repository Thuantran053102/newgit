import React from "react";

function PrintLabe()
{
    return(
        <>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right ">
                                <button onClick="showPrintSmallLabel()" class="btn btn-primary"><i class="mdi mdi mdi-printer font-16 mr-1"></i>In tem nhỏ</button>
                                <button onClick="showPrintLargeLabel()" class="btn btn-primary mr-2"><i class="mdi mdi mdi-printer font-16 mr-1"></i>In tem lớn </button>
                            </div>
                            <h4 class="page-title">Danh sách sản phẩm in tem</h4>
                        </div>
                    </div>
                </div>

                <div class="row mt-3 mb-3">
                    <div class="col-md-9">
                        <div class="card mb-0">
                            <div class="card-header">
                                <h5 class="card-title text-uppercase">Chọn sản phẩm cần in tem</h5>
                            </div>
                        
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Chọn từ nhóm</label>
                                            <p class="font-10 text-muted"><span class="text-danger">*</span> Chọn sản phẩm từ danh sách nhóm</p>
                                            <select id="sl-group" class="select2 form-control " data-toggle="select">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Chọn từ chương trình khuyễn mãi </label>
                                            <p class="font-10 text-muted"><span class="text-danger">*</span> Chọn sản phẩm từ danh sách chương trình khuyễn mãi</p>
                                            <select id="sl-promo" class="select2 form-control " data-toggle="select">
                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Chọn sản phẩm</label>
                                            <p class="font-10 text-muted"><span class="text-danger">*</span> Chọn các sản phẩm thêm vào danh sách in</p>
                                            <select id="sl-product" class="select2 form-control " data-toggle="select">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-3">
                        <div class="card mb-0 h-100">
                            <div class="card-header">
                                <h5 class="card-title">Hình ảnh mặc định (% Trả góp)</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-7">
                                        <button id="btn-image-default" class="w-100 btn btn-primary" data-toggle="tooltip" data-placement="top" title="Chọn hình trả góp 0% hoặc trả trước 0đ được in trên tem, kích thước yêu cầu 80x80"> <i class="mdi mdi-folder-multiple-image mr-1"></i>Chọn hình  </button>
                                        <button id="btn-image-remove" class="mt-1 w-100 btn btn-danger"><i class="mdi  mdi-18px mdi-delete"></i> Xóa hình</button>
                                    </div>
                                    <div class="col-md-5">
                                        <img id="img-default" src="https://via.placeholder.com/80" style={{width:'80px',height:'80px'}} onerror="this.src='https://via.placeholder.com/80'" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title text-uppercase">Danh sách sản phẩm in tem</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div id="div-export" class="col-lg-12">
                                        <table class="table table-hover table-centered">
                                            <thead>
                                                <tr>
                                                    <th class="text-center px-w-50">#</th>
                                                    <th>Mã sản phẩm</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Giá niêm yết</th>
                                                    <th>Giá bán lẻ</th>
                                                    <th class="">Tồn kho</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl-product">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            {/* @*Print Tem Lớn*@ */}
            <div id="print-large" class="modal">
                <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="modal-edit" class="modal-title">In tem lớn</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body">
                            <div id="div-print-large">
                                <div class="print-page"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="btn-close-edit" type="button" class="btn btn-light m-w-100" data-dismiss="modal"><i class="mdi mdi-block-helper mr-1"></i>Đóng</button>
                            <button onClick="printLargeStart();" type="button" class="btn btn-primary ml-1"><i class="mdi mdi-printer mr-1"></i>Print</button>

                        </div>

                    </div>
                </div>
            </div>


            {/* @*Print Tem nhỏ*@ */}
            <div id="print-small" class="modal">
                <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="modal-edit" class="modal-title">In tem nhỏ</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body m-auto">
                            <div id="div-print-small">
                                <div class="print-page-sm mt-2">
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <div id="qrcode"></div>
                            <button id="btn-close-edit" type="button" class="btn btn-light m-w-100" data-dismiss="modal"><i class="mdi mdi-block-helper mr-1"></i>Đóng</button>
                            <button onClick="printSmallStart();" type="button" class="btn btn-primary ml-1"><i class="mdi md-18px mdi-printer mr-1"></i>Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PrintLabe
