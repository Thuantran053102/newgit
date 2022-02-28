import React  from "react";
import {  useState  } from "react"
import "./Detail.scss"
import default_img from "../../../assets/images/default_image.png"
import imgLeft from "../../../assets/images/beodat.jpg"
import imgRight  from "../../../assets/images//cavoi.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'


function DetailProduct(){

    const product = {
        id:100000,
        imgs:[imgLeft,imgRight],
        name:"máy lạnh nhưng không lạnh",
        category:["máy lạnh",'không biết'],
        brand:"Carrier",
        origin:"Thái lan",
        status:"Đang bán",
        inventory:0,
        ListedPrice:9000000,
        retailPrice:8700000,
        priceAfterPromotion:8700000,
        accessTimes:35603,
        promotionalContents:[
            'Tặng bao công + vật tư ống đồng','Quà tặng hấp dẫn',
            'Bốc thăm trúng thưởng'],
        promotionalBrands:'01/01/0001',
        salient :[
            'Loại máy 1 chiều, 1.0 ngựa(1.0HP)',
            'Công suất 9.000BTU',
            'sử dụng Gas R32',
            'Công nghệ lưới lọc Nano Phôt Copper',
            'Xuất xứ : Thái Lan',
            'Bảo hành :12 tháng',
        ],
        commit:[
            'Lắp đặt miễn phí lúc giao hàng',
            '1 đổi 1 tỏng vòng 7 ngày',
            'giao hàng nhanh trong 4h',
            'Bảo hành nhanh chóng 24h',
            'dịch vụ thu hộ trả góp',
            'miễn phí vận chuyển',
            'ưu đãi thẻ thành viên'

        ],
        specifications:[
        
            {
            propertyName:[
                'Khối lương dàn nóng::',
                'Khối lượng dàn lạnh::',
                'kích thước dàn nóng (RxSxC)::',
                'xuất xứ::',
                'thời gian bảo hành::',
                'cồng nghệ Inverter::',
                'Công suất::',
                'Kích thước dàn lạnh (RxSxC)::',
                'làm lạnh nhanh::',
                'Gas sử dụng ::',
                'phạm vi hiệu quả'

            ],
            value:[
                '26kg',
                '8kg',
                '530x660x240',
                'Thái Lan',
                '12 tháng',
                'Bảo hành chính hãng',
                'không',
                '10Hp',
                '250x740x210',
                'có',
                'R-32',
                '40m3'
            ]
            }

        ]
                                            

    }
    //const imgLeft='../../views/imgs/beodat.jpg'\
    const [imgtop,setImgtop]= useState(imgLeft)
    
    return(
        <>
            
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <a href="/admin/product" className="btn btn-primary"><i className="mdi mdi-arrow-left font-16 mr-1"></i>Trở về trang sản phẩm</a>
                            </div>
                            <h4 className="page-title">Chi tiếtsản phẩm</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {/* <!--Thong tin top--> */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-5">
                                                        {/* <!-- Product image --> */}

                                                        <a href="javascript: void(0);" className="text-center d-block mb-4">
                                                            {/* @if (@Model.ProductImages.Count > 0)
                                                            {
                                                                <img id="img-main" src="/@Model.ProductImages.First().FilePath" onerror="this.src='/images/default-image.png'" className="img-fluid" style="max-width: 280px;" alt="Product-img">
                                                            } */}
                                                             <img className="img-fluid" id="img-main" src={imgtop? imgtop:default_img} style={{maxWidth:'280px'}} alt="Product-img" />
                                                        </a>

                                                        <div className="d-lg-flex d-none justify-content-center" id="div-sub-img">
                                                            {/* @foreach (var item in Model.ProductImages)
                                                            {
                                                                <a href="javascript: void(0);">
                                                                    <img src="/@item.FilePath" onClick="showMainImage(this,'@item.FilePath')" onerror="this.src='/images/default-image.png'" className="img-fluid img-thumbnail p-2 img-review" style="max-width: 75px;" alt="Product-img">
                                                                </a>
                                                            } */}
                                                            {
                                                                product.imgs.map((item)=>{
                                                                    return(
                                                                        <div onClick={()=>{setImgtop(item)}} className='wrapImg'>
                                                                            <img className="img-fluid img-thumbnail p-2 img-review" id="img-main" src={item? item:default_img} style={{maxWidth:'75px'}} alt="Product-img" />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                                
                                                              


                                                        </div>
                                                   </div> {/*  <!-- end col --> */}
                                                    <div className="col-lg-7">
                                                        <form className="pl-lg-4">
                                                            {/* <!-- Product title --> */}
                                                            <h3 className="mt-0">{product.name}</h3>
                                                            <h5 className="mt-0">Mã sản phẩm:{product.id}</h5>
                                                            <h5 className="mt-0 text">
                                                                Đường dẫn sản phẩm:
                                                                {/* @{
                                                                    string urlProduct = String.Format("{0}://{1}/{2}", Html.ViewContext.HttpContext.Request.Scheme, Html.ViewContext.HttpContext.Request.Host, Model.FriendlyUrl);
                                                                    <a target="_blank" className="text-primary" href="@urlProduct"> @urlProduct</a>
                                                                } */}
                                                            </h5>
                                                            {/* <!-- Product stock --> */}
                                                            <div className="mt-3">
                                                                {/* @if (Model.Status)
                                                                {
                                                                    <h4><span className="badge badge-primary-lighten">Đang bán</span></h4>
                                                                }
                                                                else
                                                                {
                                                                    <h4><span className="badge badge-danger-lighten">Đã dừng bán</span></h4>
                                                                } */}

                                                            </div>
                                                            {/* @*<button onClick="showModal('#print-large')" className="btn btn-sm btn-outline-primary"><i className="mdi mdi-cloud-print mr-2"></i>In tem lớn</button> */}
                                                            <button onClick="showModal('#print-small')" className="btn btn-sm btn-outline-primary"><i className="mdi mdi-cloud-print mr-2"></i>{product.status}</button>
                                                            {/* <!-- Product description --> */}
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <h6 className="font-14">Giá bán trả góp:</h6>
                                                                    <h3 className="text-danger">{product.ListedPrice}đ</h3>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h6 className="font-14">Giá niêm yết:</h6>
                                                                    <h3 className="text-danger"> {product.retailPrice}đ</h3>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h6 className="font-14">Giá bán lẻ:</h6>
                                                                    <h3 className="text-danger"> {product.priceAfterPromotion}đ</h3>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h6 className="font-14">Giá giảm khuyến mãi:</h6>
                                                                    {/* @{
                                                                        var giaGiam = 0;
                                                                        foreach (var item in Model.Promotions)
                                                                        {
                                                                            giaGiam += item.PromotionProducts.FirstOrDefault(n => n.ProductId == Model.Id).DiscountQuantity;
                                                                        }
                                                                    } */}
                                                                    <h3 className="text-danger">{product.inventory}đ</h3>
                                                                </div>

                                                            </div>


                                                            {/* <!-- Product information --> */}
                                                            <div className="mt-4">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Số lượng tồn kho:</h6>
                                                                        <p className="text-sm lh-150">@Model.StockNumber</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Số lượng đơn hàng:</h6>
                                                                        <p className="text-sm lh-150">@Model.CountOrder</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Thương hiệu:</h6>
                                                                        <p className="text-sm lh-150">{product.brand}</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Danh mục</h6>
                                                                         {/* <p className="text-sm lh-150">$8,57,014</p> */}
                                                                      
                                                                            {product.category.map((item)=>{
                                                                                return(
                                                                                    
                                                                                    <span className="badge badge-primary-lighten text-sm">
                                                                                    {item}
                                                                                    </span>
                                                                                )
                                                                            })
                                                                        }
                                                                        
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Xuất xứ:</h6>
                                                                        <p className="text-sm lh-150">{product.origin}</p>
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Bảo hành:</h6>
                                                                        <p className="text-sm lh-150">@Model.GurantyTime tháng</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Đơn vị:</h6>
                                                                        <p className="text-sm lh-150">@Model.Unit</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Tổng doanh thu:</h6>
                                                                        <p className="text-sm lh-150">@Global.FormatMoney(Model.TotalSale)</p>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="font-14">Lượt truy cập:</h6>
                                                                        <p className="text-sm lh-150">{product.accessTimes}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                     </div> {/*  <!-- end col --> */}
                                                 </div>  {/* <!-- end row--> */}
                                                <div className="row" style={{whiteSpace: 'pre-line', fontSize:'13px'}}>
                                                    <div className="col-6" >
                                                        <h5 className=" mt-5">Nội dung khuyến mãi</h5>
                                                        {

                                                        }

                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className=" mt-5">Nội dung khuyến mãi thương hiệu</h5>
                                                        <h6>Hết hạn: @Model.PromotionBranchDeadline.GetValueOrDefault().ToString("dd/MM/yyyy")</h6>
                                                        {/* @Html.Raw(@Model.PromotionBranch) */}

                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className=" mt-5">Đặc điểm nổi bật</h5>
                                                        {/* @Html.Raw(Model.HighlightProduct) */}
                                                    </div>

                                                    <div className="col-6">
                                                        <h5 className=" mt-5">Chương trình khuyến mãi đang chạy</h5>
                                                        {/* @foreach (var item in Model.Promotions)
                                                        {
                                                            <p>@item.Name  <span> @item.StartDate - @item.EndDate </span></p>
                                                            <p>Giá giảm:  @Global.FormatMoney(item.PromotionProducts.Where(n => n.ProductId == Model.Id).FirstOrDefault().DiscountQuantity)</p>
                                                        } */}

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 pre-line">

                                                        <h5 className=" mt-5">Cam kết vàng</h5>

                                                            <ul class="policy_new">
                                                                { 
                                                                    product.commit.map((item)=>{
                                                                       
                                                                        return(
                                                                            <li className="commit_item">
                                                                                <span className="commit_icon">
                                                                                    <i class="icofont-tools"><FontAwesomeIcon className="icofont-tools" icon={faScrewdriverWrench} /></i>
                                                                                    {/* <i class="icofont-tools" style=""></i> */}
                                                                                </span>
                                                                                <p className="commit_content_wrap" >
                                                                                    
                                                                                   
                                                                                    <span className="commit_content_firt" >
                                                                                        {item}
                                                                                    </span> <br/>
                                                                                 
                                                                                </p>
                                                                            </li>
                                                                        )
                                                                    })

                                                                }
                                                               
                                                            </ul>
                                                    </div>
                                                    <div className="col-md-6 pre-line">
                                                        <h5 className=" mt-5">Thông số kĩ thuật</h5>
                                                        <div className="widget reviews-section-comment mb18 font-16 pl-2 pr-2" style={{ marginTop:'40px'}}>
                                                            <div className="table-responsive">
                                                                <table className="table table-hover table-striped">
                                                                    <tbody >
                                                                        {
                                                                           product.specifications[0].propertyName.map(function(item,index){
                                                                               return(
                                                                                <tr>
                                                                                    <td className="font-weight-bold specifications_content">
                                                                                        {item}
                                                                                    </td>
                                                                                    <td className="specifications_contentRow2">
                                                                                        {product.specifications[0].value[index]}
                                                                                    </td> 
                                                                                </tr>
                                                                               )
                                                                           
                                                                           })
                                                                           
                                                                            
                                                                        }
                                                                      
                                                                        
                                                                   
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <br />

                                                    </div>
                                                </div>
                                                <h5 className=" mt-5">Mô tả sản phẩm</h5>
                                                <div className="row p-3 pre-line">
                                                    @Html.Raw(Model.Description)
                                                </div>
                                             </div> {/*  <!-- end card-body--> */}
                                         </div>  {/* <!-- end card--> */}
                                    </div>  {/* <!-- end col--> */}
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div id="print-large" className="modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="modal-edit" className="modal-title">In tem lớn</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div id="div-print" className="border border-secondary overflow-hidden m-auto position-relative">
                                <div className="print-card-product-name">
                                    <h4 className="text-center print-product-name m-0 py-1"><b> TỦ LẠNH  SHARP SJ-X346E-DS</b></h4>
                                </div>
                                <div className="print-summernote" style={{marginTop:'20px', fontWeight: 'bold', color: 'black',fontSize:'12px'}}>
                                    @Html.Raw(Model.HighlightProduct)
                                </div>
                                <div style={{marginTop:'40px'}}>
                                    <div className="text-center">
                                        <b className="border py-2 print-price shadow m-auto font-16">Giá ưu đãi:<span className="print-product-name"> @Global.FormatMoney(Model.SaleOffPrice)</span></b>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="w-60" style={{maxWidth:'60%'}}>
                                        <img src="/images/Print/print-tra-gop.png" className=" img-fluid" />
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <img style={{ maxHeight:'60px !important'}} className="print-bank-img col-4 mx-2" src="https://www.acb.com.vn//wps/wcm/connect/f6798828-b0d3-4061-8581-f7ee2b9c1d68/logo-acb.png?MOD=AJPERES&CACHEID=f6798828-b0d3-4061-8581-f7ee2b9c1d68" alt="Alternate Text" />
                                            <img style={{ maxHeight:'60px !important'}}  className="print-bank-img col-4" src="https://www.hdbank.com.vn/static/image/Logo.png" />
                                        </div>
                                        <div className="col-4">
                                            <img className="print-img-tra-gop-0" src="/images/Print/print-0.png" alt="Alternate Text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <div className="w-60" style={{maxWidth:" 60%"}}>
                                        <img src="/images/Print/print-khuyen-mai.png" className=" img-fluid" />
                                    </div>
                                    <div className="print-summernote" style={{fontWeight: 'bold', color: 'black'}}>
                                        {/* @Html.Raw(Model.PromotionContent) */}
                                    </div>
                                </div>
                                <div className="mt-2 position-absolute" style={{bottom:0}}>
                                    <div className="w-60" style={{maxWidth: "60%"}}>
                                        <img src="/images/Print/print-cam-ket.png" className=" img-fluid pring-img-tra-gop" />
                                    </div>
                                    <div className="print-promo print-summernote font-weight-bold" style={{color:'black',background:'#35DCFA',marginBottom:'-22px'}}>
                                        <div>
                                            @Html.Raw(Model.GoldenCommitment)
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button id="btn-close-edit" type="button" className="btn btn-light m-w-100" data-dismiss="modal"><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
                            <button onClick="printOrder();" type="button" className="btn btn-primary ml-1"><i className="mdi mdi-check mr-1"></i>Print</button>

                        </div>

                    </div>



                </div>
            </div>


            <div id="print-small" className="modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="modal-edit" className="modal-title">In tem lớn</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div id="div-print-sm" className="border border-secondary overflow-hidden m-auto position-relative">
                                <div className="print-card-product-name">
                                    <h4 className="text-center print-product-name m-0 py-1"><b> TỦ LẠNH  SHARP SJ-X346E-DS</b></h4>
                                </div>
                                <div className="print-summernote" style={{fontWeight: 'bold', color: 'black'}}>
                                    @Html.Raw(Model.HighlightProduct)
                                </div>
                                @*<div className="mt-1">
                                        <div className="text-center">
                                            <b className="border py-2 print-price shadow m-auto font-16">Giá ưu đãi:<span className="print-product-name"> @Global.FormatMoney(Model.SaleOffPrice)</span></b>
                                        </div>
                                    </div>*@
                                <div className="position-absolute" style={{bottom:0}}>
                                    <div className="w-60" style={{maxWidth: '60%'}}>
                                        <img src="/images/Print/print-khuyen-mai.png" className=" img-fluid pring-img-tra-gop" />
                                    </div>
                                    <div className="font-weight-bold print-summernote" style={{color:'black', background:'#35DCFA',marginBottom:'-22px'}}>
                                        <div className="row  mt-1" style={{paddingTop:'23px', paddingBottom:'10px!important'}}>
                                            <div className="col-5">
                                                @*@Html.Raw(Model.PromotionContent)*@
                                                <ul>
                                                    <li>
                                                        Tặng chảo
                                                    </li>
                                                    <li>
                                                        Tặng chảo
                                                    </li>
                                                    <li>
                                                        Tặng chảo
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-7">
                                                <div className="text-center bg-white">
                                                    <b className="border border-secondary  print-price shadow m-auto font-16">
                                                        Giá ưu đãi:
                                                        <span className="print-product-name">
                                                            @Global.FormatMoney(Model.SaleOffPrice)
                                                        </span>
                                                    </b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button id="btn-close-edit" type="button" className="btn btn-light m-w-100" data-dismiss="modal"><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
                            <button onClick="printOrder();" type="button" className="btn btn-primary ml-1"><i className="mdi mdi-check mr-1"></i>Print</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetailProduct