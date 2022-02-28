import React from "react"
import clsx from "clsx"

import style from "./Addproduct.module.scss"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState ,useRef } from "react"
import default_img from "../../../assets/images/default_image.png"
import Select from "../../../components/Select/Select"
import Arrow from "../../../components/ArrowIcon/ArrowIcon"


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Addproduct()
{
    
    const unitList=['cái','chiếc','đôi','cặp']
    const categoryList=["helo",'tôi là thuận',"helo",'tôi là thuận',"helo",'tôi là thuận',"helo",'tôi là thuận',"helo",'tôi là thuận',]
    const brandlist=["dark","blue","green","red","blue","blue","blue","blue","blue","blue","blue","blue","blue","blue","blue","blue","blue","blue",]
    const insuranceList=[
        '1 tháng',
        '3 tháng',
        '6 tháng',
        '12 tháng',
        '18 tháng',
        '24 tháng',
        '36 tháng',
        '48 tháng', 
        '60 tháng',]
    const giftarray=['có','không']
    // nhớ tạm 

    
   


    const [idProduct,setIdProduct] = useState('')
    const [nameProduct,setNameProduct] = useState('')
    const [categoryValue,setCategoryValue] =useState('')
    const [linkProduct,setLinkProduct] = useState('')
    const [inputBrand,setInputBrand] = useState('')
    const [origin, setOrigin] = useState('')
    const [unit,setUnit] = useState('cái')
    const [insurance,setInsurance] = useState('không')
    const [gift,setGift] = useState('không')


    const [avatarimg,setAvatarimg] = useState('')
    const [stickerimg,setTickerimg] = useState('')
    

    const [brandvalue,setBrandvalue] =useState('')
    const [brandValueItem,setBrandValueItem] = useState([])

    const wrapbrandContentRef = useRef()
    const brandContentRef = useRef()
    // thương hiệu
    useEffect(()=>{
        if(brandvalue.length>=1)
        {
            wrapbrandContentRef.current.classList.remove('avtive')
            if(brandlist.find((item)=> item.includes(brandvalue)?? item) )
            {
                setBrandValueItem ( brandlist.filter( function(item,index){
                    return (item.includes(brandvalue)?? item)
                }))
            }
            else{
                brandContentRef.current.innerHTML="Không tìm thấy thương hiệu này"
                setBrandValueItem ( brandlist.filter( function(item,index){
                    return (item.includes(' ')?? item)
                }))
                wrapbrandContentRef.current.classList.add('avtive')
            }
        }
        else {
            brandContentRef.current.innerHTML="vui lòng nhập tên thương hiệu"
            setBrandValueItem ( brandlist.filter( function(item,index){
                return (item.includes(' ')?? item)
            }))
            wrapbrandContentRef.current.classList.add('avtive')
        }
        console.log(wrapbrandContentRef)
        setInputBrand(brandvalue)
    },[brandvalue])
    
    useEffect(()=>{
        return()=>{
            URL.revokeObjectURL(stickerimg.review)
        }
    },[stickerimg])

    const handlePreviewStickerimg = (e)=>{
            const file = e.target.files[0]
            file.review= URL.createObjectURL(file)// file đang là 1 obj nên có có thể tùy ý thêm 1 thuộc tính cho nó
            setTickerimg(file)
    }
    
    useEffect(()=>{
        return()=>{
            URL.revokeObjectURL(avatarimg.review)
        }
    },[avatarimg])

    const handlePreviewAvatar = (e)=>{
        const file = e.target.files[0]
        file.review= URL.createObjectURL(file)// file đang là 1 obj nên có có thể tùy ý thêm 1 thuộc tính cho nó
        setAvatarimg(file)
    }
    const handle= ()=>{
    }
    return(
        <>
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <a href="/admin/product" className="btn btn-primary"><i className="mdi mdi-arrow-left font-16 mr-1"></i>Trở về trang sản phẩm</a>
                        </div>
                        <h4 className="page-title">Thêm mới sản phẩm</h4>
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
                                <input id="IshowPrice" checked type="checkbox" onChange={e=>{handle}}/>
                                <label htmlFor="#IshowPrice">Hiển thị giá ưu đãi</label>
                            </div>
                        </div>
                    
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <div className="form-group text-center">
                                    <label>Hình đại diện<span className="text-danger">* (200x200)</span></label>
                                    <br />
                                    <img className="img-fluid" id="img-thumbnail-add" src={avatarimg.review? avatarimg.review:default_img} />
                                    
                                    <button className=" btn btn-primary form-control m-w-100 mt-1" type="button" id="btn-thumbnail-product" style={{position:"relative"}}>
                                        <span style={{position:"absolute",width:"100%", left:"0",right:"0"}}>Chọn hình đại điện</span>
                                        <input type="file" onChange={handlePreviewAvatar} style={{opacity:"0",width:'100%',height:"100%",cursor:"pointer"}}/>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Mã sản phẩm <span className="text-danger">*</span></label>
                                            <input type="text" value={idProduct}  onChange={(e)=>{setIdProduct(e.target.value)}} name="productCode"  className="form-control" placeholder="" /> {/**/}
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Tên sản phẩm <span className="text-danger">*</span></label>
                                            <input type="text" name="productName" value={nameProduct} onChange={(e)=>{setNameProduct(e.target.value)}} id="ipt-product-name" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor='slCategory'>Danh mục <span className="text-danger">*</span></label>
                                            <div style={{position:"relative"}}>
                                                <input type="text" value={categoryValue} onChange={(e)=>{setCategoryValue(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                <Select  array={brandlist} nameclass={['categoryList','inputList','ulList']} state={[categoryValue,setCategoryValue]}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Đường dẫn sản phẩm <span className="text-danger">*</span></label>
                                            <input type="text" name="FriendUrl" value={linkProduct} onChange={e =>{setLinkProduct(e.target.value)}} id="ipt-product-url-Friendly" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Thương hiệu</label>
                                            <div style={{position:"relative"}} className='containerBrand arrowWrap'>
                                                <input type="text" value={inputBrand} onChange={(e)=>{setInputBrand(e.target.value)}} name="BrandId" id="sl-brand" className="form-control" placeholder="" style={{width:"100%"}} />
                                                {/* <span className="iconbrands" style={{position:"absolute",right:"10px", top:"50%", transform:"translateY(-50%)"}}>
                                                   <i className="icondown"> <FontAwesomeIcon icon={faCaretDown} /></i> 
                                                   <i className="iconup"> <FontAwesomeIcon icon={faCaretUp} /></i> 
                                                </span>  */}
                                                <Arrow/>
                                                <div className="inputList wrapBrandflist" style={{position:"absolute" ,top:"100%", left:"0",right:"0",zIndex:"1"}}>
                                                    <input  type="text" value={brandvalue} onChange={(e)=>{setBrandvalue(e.target.value)}} className="form-control search_brand" onChange={(e)=>{setBrandvalue(e.target.value)}} />
                                                    <ul className="brandList ulList" >
                                                        <li className="li_content_brand avtive" style={{padding:"6px 6px",textAlign:'center'}} ref={wrapbrandContentRef}>
                                                            <span className="content_brand" style={{width:'100%' }} ref={brandContentRef}>vui lòng nhập tên thương hiệu
                                                            </span>
                                                        </li>
                                                        {brandValueItem.map( function(item,index){   
                                                             return  <li className="liItem" onClick={()=>{setInputBrand(item)}} key={index}>{item}</li>                                                           
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Xuất xứ</label>
                                            <input className="form-control" value={origin} onChange={e=>{setOrigin(e.target.value)}} name="origin" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 pb-md-3" >
                                <div className="form-group">
                                    <label>
                                        Hiển thị  Stickerimg
                                        <input id="cb-stickerimg" type="checkbox" value="" className="form-check-inline" />
                                    </label><br />
                                    <button id="btn-stickerimg" type="button" className="btn btn-primary btn-sm " style={{position:"relative"}}>
                                        <span style={{position:"absolute", left:"0",right:"0",top:"0",bottom:"0",lineHeight:"2rem",fontSize:"0.8rem"}}>Chọn Stickerimg</span>
                                        <input type="file" onChange={handlePreviewStickerimg} style={{opacity:"0",width:"100%",height:"100%",cursor:"pointer"}}/>
                                    </button>
                                </div>
                                <div>
                                    <img id="img-stickerimg"  className={"imgstiker  img-fluid"}   src={stickerimg.review? stickerimg.review:default_img} />
                                    
                                </div>
                            </div>

                            {/* row 2 */}
                            <div className="col-md-2 col-lg-1 col_padding" >
                                <div className="form-group" style={{position:"relative"}}>
                                    <label>Đơn vị <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control " value={unit} style={{textAlign:'end'}} />
                                    <Select  array={unitList} nameclass={['a']} state={[unit,setUnit]}/>
                                </div>
                            </div>
                            <div className="col-md-2  col-lg-1 col_padding" >
                                <div className="form-group">
                                    <label>Số lượng tồn</label>
                                    <input type="text" className="form-control" min="0" value="0" name="stocNumber" data-toggle="autonumeric-money" placeholder="" />
                                </div>
                            </div>

                            <div className="col-md-4 col-lg-2 col_padding" >
                                <div className="form-group">
                                    <label>Giá niêm yết</label>
                                    <input type="text" className="form-control text-right" min="0" value="0" name="giaNiemYet" data-toggle="autonumeric-money" placeholder="" />
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-2 col_padding" >
                                <div className="form-group">
                                    <label>Giá bán lẻ</label>
                                    <input type="text" className="form-control text-right" min="0" value="0" name="giaBan" data-toggle="autonumeric-money" placeholder="" />
                                </div>
                            </div>
                            <div className="col-md-4  col-lg-2 col_padding" >
                                <div className="form-group">
                                    <label>Giá bán trả góp</label>
                                    <input type="text" className="form-control text-right" min="0" value="0" name="InstallmentPrice" data-toggle="autonumeric-money" placeholder="" />
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-2 col_padding" >
                                <div className="form-group" style={{position:"relative"}}>
                                    <label>Bảo hành</label>
                                    <input type="text" className="form-control inputInsurance" value={insurance} style={{textAlign:'end'}} />
                                    <Select  array={insuranceList} nameclass={['insuranceList']} state={[insurance,setInsurance]}/>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-2 col_padding" >
                                <div className="form-group" style={{position:"relative"}}>
                                    <label>Quà tặng</label>
                                    <input type="text" className="form-control inputInsurance" value={gift} style={{textAlign:'end'}} />
                                    <Select  array={giftarray} nameclass={['a']} state={[gift,setGift]}/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Mô tả ngắn (Description SEO)</label>
                                    <input type="text" name="Note" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Cam kết vàng</label>
                                    <textarea type="text" rows="4" id="GoldrenCommitment" className="form-control" placeholder=""></textarea>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Đặc điểm nổi bật</label>
                                    <textarea type="text" rows="4" id="hightlightProduct" className="form-control" placeholder=""></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Nội dung khuyến mãi</label>
                                    <textarea type="text" rows="4" name="promoContent" id="promoContent" className="form-control" placeholder=""></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Hết hạn khuyến mãi</label>
                                    <br />
                                    <input id="dtpk-promo-deadline" value="@Model.PromotionBranchDeadline.GetValueOrDefault().Date.ToBinary()" type="text" className="form-control" data-toggle="datepicker" placeholder="" />

                                    <label>Nội dung khuyến mãi thương hiệu</label>
                                    <textarea type="text" rows="4" name="promoBranch" id="promoBranch" className="form-control" placeholder=""></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
    <div className="col-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">Hình ảnh <span className="text-danger">*</span><button type="button" id="btn-img-add" className="btn btn-primary btn-sm float-right"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button></h4>
                <div className="row" id="divImage">
                </div>
            </div>
        </div>
    </div>

    <div className="col-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">
                    Thuộc tính
                </h4>
                <div className="row">
                    <div className="col-md-4 ">
                        <div className="form-group">
                            <label>Danh mục thuộc tính <span className="text-danger">*</span></label>
                            <select className="form-control float-right col-md-4" data-toggle="select-no-search" id="sl-category-property">
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="form-group">
                            <label>Chọn mẫu thuộc tính</label>
                            <select className="form-control float-right col-md-4" data-toggle="select-no-search" id="sl-template">
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <br />
                        <button id="btn-property-add" type="button" className="btn-sm float-right btn btn-primary btn-sm ml-1 ">
                            <i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm thuộc tính
                        </button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="table-responsive mt-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <td className="w-25 font-18 font-weight-bold">Thuộc tính</td>
                                        <td className={ clsx(style.pricestyle," font-18 font-weight-bold")} >Giá trị</td>
                                        <td className={clsx(style.widthstyle,"font-weight-bold")} >
                                            <i onClick={handle}  className={clsx(style.text_success," mdi mdi-plus cursor-pointer text-success")}></i>
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
                        <textarea id="editor"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="col-12">
        <button type="button" id="btn-save" className="btn btn-primary float-right"><i className="mdi mdi-check-bold font-16 mr-1"></i>Lưu sản phẩm</button>
    </div>
            </div>
            {/*<!--  Modal thêm giá trị thuộc tính --> */}
            <div className="modal fade" id="modal-add-value">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-title">Tạo thuộc tính</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group mb-3" id="div-modal-property-add">
                                        <label htmlFor="ipt-value"><span className="text-danger"> &nbsp;* </span>Chọn danh mục <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <select id="sl-modal-category" className="form-control" data-toggle="select"></select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="ipt-value"><span className="text-danger"> &nbsp;* </span><span id="modal-label"></span></label>
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
                    </div>{/*<!-- /.modal-content -->*/}
                </div>{/*<!-- /.modal-dialog -->*/}
            </div>
            {/* <!-- /.modal --> */}

            <div id="div-hiden-btn" style={{visibility:'hidden'}} className="col-md-12">
                <button id="btn-hiden-upload" type="button" className="btn btn-primary btn-sm float-right"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button>
            </div>
        </>
    )
}
export default Addproduct