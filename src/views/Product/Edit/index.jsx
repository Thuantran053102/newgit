import React from "react";

function Edit(){
    return(
        <>
            {/* @if (Model == null)
                return; */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <a href="/admin/product" className="btn btn-primary"><i className="mdi mdi-arrow-left font-16 mr-1"></i>Trở về trang sản phẩm</a>
                                </div>
                                <h4 className="page-title">Cập nhật sản phẩm</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form id="form-add">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-inline-flex justify-content-between w-100  mb-4">
                                            <h4 className="header-title">Thông tin</h4>
                                            <div className="custom-control d-flex flex-row align-self-center float-right">
                                                <input id="IshowPrice" /*(Model.IsShowPrice ? "checked" : "")*/ type="checkbox"/>
                                                <label for="#IshowPrice">Hiển thị giá ưu đãi</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group text-center">
                                                    <label>Hình đại diện<span className="text-danger">* (200x200)</span></label>
                                                    <br />
                                                    <img className="img-fluid" id="img-thumbnail-edit" src="/@Model.ThumbNail"/>
                                                    <button className=" btn btn-primary form-control m-w-100 mt-1" id="btn-thumbnail-product" type="button">Chọn hình đại điện</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label>Mã sản phẩm <span className="text-danger">*</span></label>
                                                            <input type="text" value="@Model.ProductCode" name="productCode" className="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="form-group">
                                                            <label>Tên sản phẩm <span className="text-danger">*</span></label>
                                                            <input type="text" value="@Model.ProductName" name="productName" id="ipt-product-name" className="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label>Danh mục <span className="text-danger">*</span></label>
                                                            <select name="CategoryId" id="sl-category" className="select2 form-control select2-multiple" data-toggle="select" multiple="multiple">
                                                                @foreach (var item in Model.ProductCategories)
                                                                {
                                                                    <option selected value="@item.Id">@item.CategoryName</option>
                                                                }
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="form-group">
                                                            <label>Đường dẫn sản phẩm <span className="text-danger">*</span></label>
                                                            <input value="@Model.FriendlyUrl" type="text" name="FriendUrl" id="ipt-product-url-Friendly" className="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label>Thương hiệu</label>
                                                            <select className="form-control" name="BrandId" id="sl-brand" data-toggle="select">
                                                                <option value="@Model.ProductBrand.Id">@Model.ProductBrand.BrandName</option>

                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="form-group">
                                                            <label>Xuất xứ</label>
                                                            <input value="@Model.Origin" className="form-control" name="origin" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>
                                                        Hiển thị  Sticker
                                                        <input id="cb-sticker" type="checkbox" value="" className="form-check-inline" />
                                                    </label><br />
                                                    <button id="btn-sticker" type="button" className="btn btn-primary btn-sm ">Chọn Sticker</button>
                                                </div>
                                                <div>
                                                    <img id="img-sticker" style={{maxHeight:'100px'}} onerror="this.src='/images/default-image.png'" className="img-fluid" src="#" />
                                                </div>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="form-group">
                                                    <label>Đơn vị <span className="text-danger">*</span></label>(@Model.Unit)
                                                    <input className="form-control" value="@Model.Unit" name="unit" />
                                                </div>
                                            </div>
                                            <div className="col-md-1">
                                                <div className="form-group">
                                                    <label>Số lượng tồn</label>
                                                    <input type="text" className="form-control" min="0" value="@Model.StockNumber" name="stocNumber" data-toggle="autonumeric-money" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Giá niêm yết</label>
                                                    <input type="text" className="form-control text-right" min="0" value="@Model.OriginPrice" name="giaNiemYet" data-toggle="autonumeric-money" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Giá bán lẻ</label>
                                                    <input type="text" className="form-control text-right" min="0" value="@Model.GiaBanLe" name="giaBan" data-toggle="autonumeric-money" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Giá bán trả góp</label>
                                                    <input type="text" className="form-control text-right" min="0" value="@Model.InstallmentPrice" name="InstallmentPrice" data-toggle="autonumeric-money" placeholder="" />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Bảo hành</label>
                                                    <select className="form-control" name="baoHanh" data-toggle="select">
                                                        {/* @{
                                                            string[] GurantyTime = { "Không bảo hành", "1 tháng", "3 tháng", "6 tháng", "12 tháng", "18 tháng", "24 tháng", "36 tháng", "48 tháng", "60 tháng" };
                                                            foreach (string p in GurantyTime)
                                                            {
                                                                if (p == Model.GurantyTime)
                                                                {
                                                                    <option selected value="@p">@p</option>
                                                                }
                                                                else
                                                                {
                                                                    <option value="@p">@p</option>
                                                                }
                                                            }
                                                        } */}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Quà tặng</label>
                                                    <select className="form-control" name="IsGift" data-toggle="select-no-search">
                                                        <option value="0">Không</option>
                                                        <option value="1">Có</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Mô tả ngắn (Description SEO)</label>
                                                    <input type="text" name="Note" value="@Model.Note" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <div className="form-group">
                                                    <label>Cam kết vàng</label>
                                                    <textarea type="text" rows="4" id="GoldrenCommitment" className="form-control" placeholder="">@Model.GoldenCommitment</textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-12 mt-2">
                                                <div className="form-group">
                                                    <label>Đặc điểm nổi bật</label>
                                                    <textarea type="text" rows="4" id="hightlightProduct" className="form-control" placeholder="">@Model.HighlightProduct</textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <div className="form-group">
                                                    <label>Nội dung khuyến mãi</label>
                                                    <textarea type="text" id="promoContent" name="promoContent" className="form-control" placeholder="Nội dung khuyến mãi" rows="15">@Model.PromotionContent</textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <label>Hết hạn khuyến mãi</label>
                                                    <br />
                                                    <input id="dtpk-promo-deadline" value="@Model.PromotionBranchDeadline.GetValueOrDefault().Date.ToBinary()" type="text" className="form-control" data-toggle="datepicker" placeholder="" />
                                                    <label>Nội dung khuyến mãi thương hiệu</label>
                                                    <textarea type="text" rows="4" name="promoBranch" id="promoBranch" className="form-control" placeholder="">@Model.PromotionBranch</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-4">Hình ảnh<button type="button" id="btn-img-add" className="btn btn-primary btn-sm float-right"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button></h4>
                                    <div className="row" id="divImage">
                                        @foreach (var item in @Model.ProductImages)
                                        {
                                            <div id="product-img-@item.Id" className="col-md-2 container-image">
                                                <img className="img-auto-size" src="/@item.FilePath" onerror="this.src='/images/default-image.png'" />
                                                <button onclick="removeImg(@item.Id)" type="button" className="btn btn-danger btn-remove-image d-none"><i className="mdi mdi-trash-can font-16"></i></button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-2">
                                        Thuộc tính
                                    </h4>
                                    <div className="row">
                                        <div className="col-md-4 ">
                                            <div className="form-group">
                                                <label>Chọn mẫu thuộc tính <span className="text-danger">*</span></label>
                                                <select className="form-control float-right col-md-4" data-toggle="select-no-search" id="sl-template">
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 ">

                                        </div>
                                        <div className="col-md-4">
                                            <br />
                                            <button id="btn-property-add" type="button" className="btn-sm float-right btn btn-primary btn-sm ml-1 ">
                                                <i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm thuộc tính
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-12">
                                            <div className="table-responsive mt-4">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <td className="w-25">Thuộc tính</td>
                                                            <td style={{width:'65%!important'}}>Giá trị</td>
                                                            <td className="font-weight-bold" style={{width:'10%!important'}}>
                                                                <i onclick="addPropertyRow()" style={{fontSize:'40px!important'}}className=" mdi mdi-plus cursor-pointer text-success"></i>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-Properties">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-4">Nội dung</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea id="editor"> @Model.Description</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="button" id="btn-save" className="btn btn-primary float-right"><i className="mdi mdi-check-bold font-16 mr-1"></i>Lưu sản phẩm</button>
                        </div>
                    </div>
                </div>
                {/* <!--  Modal thêm giá trị thuộc tính -->  */}
                <div className="modal fade" id="modal-add-value">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Tạo thuộc tính</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3" id="div-modal-property-add">
                                            <label for="ipt-value"><span className="text-danger"> &nbsp;* </span><span> Chọn danh mục</span></label>
                                            <div className="input-group">
                                                <select id="sl-modal-category" className="form-control" data-toggle="select"></select>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label for="ipt-value"><span className="text-danger"> &nbsp;* </span><span id="modal-label"></span></label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="ipt-value"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btn-add" type="button" className="btn btn-primary">Thêm mới</button>
                                <button type="button" className="btn btn-light" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>{/* <!-- /.modal-content --> */}
                   </div>  {/*<!-- /.modal-dialog --> */}

                </div>
                {/* <!-- /.modal --> */}
        </>
    )
}
export default Edit