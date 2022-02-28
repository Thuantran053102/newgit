import React, { useEffect, useRef, useState } from "react"
import { Button, NavItem } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faCaretUp,faFontAwesome,faXmark,faCheck} from '@fortawesome/free-solid-svg-icons'
import "./Product.scss"
import Select from "../../components/Select/Select"
import Arrow from "../../components/ArrowIcon/ArrowIcon"
import Radio from "../../components/Radio/Radio"
import Buttom from "../../components/Buttom"


function Product(){

    const APIProduct=[
        {
            id:100000,
            name:"máy lạnh nhưng không lạnh",
            category:"máy lạnh",
            brand:"Carrier",
            origin:"Thái lan",
            status:"Đang bán",
            inventory:0,
            ListedPrice:9000000,
            retailPrice:8700000,
            priceAfterPromotion:8700000,
            accessTimes:35603
        },
        {
            id:100001,
            name:"máy lạnh nhưng không lạnh",
            category:"máy lạnh",
            brand:"Carrier",
            origin:"Thái lan",
            status:"Đang bán",
            inventory:1,
            ListedPrice:9000000,
            retailPrice:8700000,
            priceAfterPromotion:8700000,
            accessTimes:35603
        },
        {
            id:100002,
            name:"máy lạnh nhưng không lạnh",
            category:"máy lạnh",
            brand:"Carrier",
            origin:"Thái lan",
            status:"Đang bán",
            inventory:2,
            ListedPrice:9000000,
            retailPrice:8700000,
            priceAfterPromotion:8700000,
            accessTimes:35603
        },
        {
            id:100003,
            name:"máy lạnh nhưng không lạnh",
            category:"máy lạnh",
            brand:"Carrier",
            origin:"Thái lan",
            status:"Đang bán",
            inventory:3,
            ListedPrice:9000000,
            retailPrice:8700000,
            priceAfterPromotion:8700000,
            accessTimes:35603
        },
        {
            id:100004,
            name:"máy lạnh nhưng không lạnh",
            category:"máy lạnh",
            brand:"Carrier",
            origin:"Thái lan",
            status:"Dừng bán",
            inventory:4,
            ListedPrice:9000000,
            retailPrice:8700000,
            priceAfterPromotion:8700000,
            accessTimes:35603
        }
    ]

    const categoryList=['Tất cả','Danh mục','Danh mục','Danh mục','Danh mục','Danh mục','Danh mục','Danh mục']
    const statusList=['Tất cả','Trạng thái','Trạng thái','Trạng thái','Trạng thái','Trạng thái','Trạng thái','Trạng thái']
    const trademarkList=['Tất cả','Thương Hiệu','Thương Hiệu','Thương Hiệu','Thương Hiệu','Thương Hiệu','Thương Hiệu','Thương Hiệu']
    const arrangeList=['Giá niêm yết tăng dần','Giá niêm yết giảm dần','Giá bán lẻ tăng dần','Giá bán lẻ giảm dần','Lượt truy cập tăng dần','Lượt truy cập giảm dần',]
    const retailPriceList=[
        { 
            id:0,
            namePrice:'Tất cả'
        },
        {
            id:1,
            namePrice:'Từ 500.000đ-1.000.000đ'
        
        },
        {
            id:2,
            namePrice:'Từ 1.000.000đ - 2.000.000đ',
        
        },
        {
            id:3,
            namePrice:'Từ 2.000.000đ - 3.000.000đ',
        
        },
        {
            id:4,
            namePrice:'Từ 3.000.000đ - 5.000.000đ',
        
        },
        {
            id:5,
            namePrice:'Trên 5.000.000đ',
        
        },
    ]
    const amountList=['20 sản phẩm','30 sản phẩm','50 sản phẩm','100 sản phẩm','200 sản phẩm',]
    const selling='Đang bán', sellend='Dừng bán', openSell='Mở bán'

    const [changstatus,setChangstatus]= useState('')    
    // bộ lọc
    const [category,setCategory]= useState(categoryList[0])
    const [status,setStatus] = useState(statusList[0])
    const [trademark,setTrademark] = useState(trademarkList[0])
    const [arrange,setArrange] = useState(arrangeList[0])
    const [retailPrice,setRetailPrice] = useState()
    const [amount,setAmount] =  useState(amountList[0])
    // biến lưu trữ

    const [listedPriceValue,setlistedPriceValue] =useState(0)
    const [retailPriceValue,setRetailPriceValue] =useState(0)
    const [inventoryValue,setInventoryValue] = useState(0)

    const modalPriceRef = useRef()
    const modalinventoryRef =useRef()

    const ShowModalPrice=(ListedPrice,retailPrice)=>{
        modalPriceRef.current.classList.add('show')
        setlistedPriceValue(ListedPrice)
        setRetailPriceValue(retailPrice)

    }

    const ShowModalStock=(inventory)=>{
        modalinventoryRef.current.classList.add('show')
        setInventoryValue(inventory)
    }
    
    const takeStatus=(status)=>{
        if(status.includes(sellend))
        {
            
        }
    }

    return(
        <>            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <a href="/admin/product/ExportExcel" className="btn btn-primary" style={{marginRight:"5px"}}>
                                    <i className="mdi mdi mdi-file-export font-16 mr-1"></i>Export Excel
                                </a>
                                <a href="/admin/product/add" className="btn btn-primary"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm mới sản phẩm</a>
                            </div>
                            <h4 className="page-title">Quản lý sản phẩm</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-2 col-md-4 col-12 aaaa">
                                        <div className="page-aside-left p-0" >
                                            <button onclick="getDataTable()" type="button" className="btn btn-block btn-primary"><i className="mdi mdi-refresh font-16 mr-1"></i>Làm mới dữ liệu</button>
                                            <div className="mt-4">
                                                <h5 className="text-primary">Tìm kiếm</h5>
                                                <div className="form-group">
                                                    <input id="ipt-text-search" type="text" className="form-control" placeholder="Tìm theo tên, mã sản phẩm..." autocomplete="off" />
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="mt-2">
                                                <h5 className="text-primary">Danh mục</h5>
                                                <div className="form-group arrowFocus" style={{position:'relative'}}>
                                                    <input type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                    <Arrow/>
                                                    <Select  array={categoryList} nameclass={['categoryList','inputList','ulList']} state={[category,setCategory]}/>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="mt-2">
                                                <h5 className="text-primary">Trạng thái</h5>
                                                <div className="form-group" style={{position:'relative'}}>
                                                    <input type="text" value={status} onChange={(e)=>{setStatus(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                    <Arrow/>
                                                    <Select  array={statusList} nameclass={['categoryList','inputList','ulList']} state={[status,setStatus]}/>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="mt-2">
                                                <h5 className="text-primary">Thương hiệu</h5>
                                                <div className="form-group" style={{position:'relative'}}>
                                                    <input type="text" value={trademark} onChange={(e)=>{setTrademark(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                    <Arrow/>
                                                    <Select  array={trademarkList} nameclass={['categoryList','inputList','ulList']} state={[trademark,setTrademark]}/>
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="text-primary">Sắp sếp</h5>
                                            <div className="mt-2" style={{position:'relative'}}>
                                                <input type="text" value={arrange} onChange={(e)=>{setArrange(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                <Arrow/>
                                                <Select  array={arrangeList} nameclass={['categoryList','inputList','ulList']} state={[arrange,setArrange]}/>
                                            </div>
                                            <hr />
                                            <div className="mt-2" id="divFilterPrice">
                                                <h5 className="text-primary">Giá bán lẻ</h5>
                                                {/* {
                                                    retailPriceList.map((item)=>{
                                                        return(
                                                        <div key={item.id}>
                                                            <input type='radio'checked={retailPrice === item.id}onChange={()=>setRetailPrice(item.id)} />
                                                            {item.namePrice}
                                                        </div>
                                                        )
                                                    })
                                                    
                                                } */}
                                                <Radio array={retailPriceList} start={[retailPrice,setRetailPrice]}/>
                                            </div>
                                            <hr />
                                            <div className="mt-2">
                                                <h5 className="text-primary">Số sản phẩm hiển thị</h5>
                                                <div className="form-group">
                                                    <select id="sel-record-search"  className="form-control" data-toggle="select-no-search">
                                                        <option className="hoverItem" value="20">20 sản phẩm</option>
                                                        <option className="hoverItem" value="30">30 sản phẩm</option>
                                                        <option className="hoverItem" value="50">50 sản phẩm</option>
                                                        <option className="hoverItem" value="100">100 sản phẩm</option>
                                                        <option className="hoverItem" value="200">200 sản phẩm</option>
                                                    </select>
                                                    {/* <input type="text" value={amount} onChange={(e)=>{setAmount(e.target.value)}} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder=""/>
                                                    <Arrow/>
                                                    <Select  array={amountList} nameclass={['categoryList','inputList','ulList','ulamount']} state={[amount,setAmount]}/> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-md-8 col-12 table" >
                                        <div className="pageAsideRight page-aside-right">
                                            <p>Tổng sản phẩm: <span className="text-primary" id="total-product">{
                                                APIProduct.length
                                            }</span> sản phẩm</p>
                                            <div className="table-responsive">
                                                <table id="btn-product" className="table table-hover table-centered">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center px-w-50">#</th>
                                                            <th>Mã sản phẩm</th>
                                                            <th >Tên sản phẩm</th>
                                                            <th className="">Danh mục</th>
                                                            <th className="">Thương hiệu</th>
                                                            <th>Xuất xứ</th>
                                                            <th>Tình trạng</th>
                                                            <th className="text-right">Tồn kho</th>
                                                            <th className="money">Giá niêm yết</th>
                                                            <th className="money">Giá bán lẻ</th>
                                                            <th className="money">Giá sau khuyến mãi</th>
                                                            <th className="">Lượt truy cập</th>
                                                            <th className="text-center px-w-50"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbl-body">
                                                        {/* table product */}
                                                        {
                                                            APIProduct.map(function(item,index){
                                                                return(
                                                                        <tr >
                                                                        <td className="text-center">{index}</td>
                                                                        <td style={{paddingTop:"1rem" , paddingBottom:"1rem"}}>{item.id}</td>
                                                                        <td>
                                                                            <div className="row">
                                                                                <div className="col-md-10" >{item.name}</div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-left"><span className="badge badge-primary">{item.category}</span></td>
                                                                        <td className="text-left">{item.brand}</td>
                                                                        <td>{item.origin}</td>
                                                                        <td><span className="badge badge-primary-lighten">{item.status}</span></td>
                                                                        <td className="text-right">{item.inventory}</td>
                                                                        <td className="money">{item.ListedPrice}đ</td>
                                                                        <td className="money">{item.retailPrice}đ</td>
                                                                        <td className="money">{item.priceAfterPromotion}đ</td>
                                                                        <td className="text-right">{item.accessTimes}</td>
                                                                        <td className="text-center px-w-50">
                                                                            <div className="dropdown">
                                                                                <a className="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown" ><i className="mdi mdi-dots-vertical font-18 text-primary" ></i></a>
                                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                                    <a href="/admin/product/detail/1904" className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-window-restore mr-1"></i>Xem chi tiết</a>
                                                                                    <a href="/admin/product/edit/1904" className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-export mr-1"></i>Cập nhật sản phẩm</a>
                                                                                    <a onClick={()=>{ShowModalPrice(item.ListedPrice,item.retailPrice)}} className="a-delete dropdown-item cursor-pointer"><i className="mdi mdi-cash-plus mr-1"></i>Cập nhật giá</a>
                                                                                    <a onClick={()=>{ShowModalStock(item.inventory)}} className="a-delete dropdown-item cursor-pointer"><i className="mdi mdi-cart-plus mr-1"></i>Cập nhật tồn</a>
                                                                                    <a  className="a-delete dropdown-item cursor-pointer" onClick={(e)=>{takeStatus(e.target.innerHTML)}}><i className="mdi mdi-toggle-switch mr-1"></i>{(item.status===selling)?sellend:openSell}</a>
                                                                                    
                                                                                   
                                                                                    <a onClick="showDelete(1904)" className="a-delete dropdown-item cursor-pointer"><i className="mdi mdi-trash-can-outline mr-1"></i>Xóa sản phẩm</a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                            )
                                                            
                                                            })
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div id="div-pagination-info" className="col-6 mt-2"></div>
                                                <div className="col-6"><div id="div-pagination-selection" className="float-right mb-3 mt-1"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/* <!--  Modal thêm giá trị thuộc tính --> */}
            <div className="modal fade  showModal_updatePrics" id="modal-update-price" ref={modalPriceRef}>
                <div className="modal-dialog modal-lg modalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Cập nhật giá</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={()=>{modalPriceRef.current.classList.remove('show')}}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Giá niêm yết<span className="text-danger"> &nbsp;* </span></label>
                                            <input type="text" id="ipt-gia-niem-yet" className="form-control" min="0" value={listedPriceValue} onChange={(e)=>{ e.target.value/2 ?  setlistedPriceValue(e.target.value) : setlistedPriceValue(listedPriceValue) }} name="giaBan" data-toggle="autonumeric-money" placeholder=""  />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Giá bản lẻ<span className="text-danger"> &nbsp;* </span></label>
                                            <input type="text" id="ipt-gia-ban-le" className="form-control" min="0" value={retailPriceValue} onChange={(e)=>{ e.target.value/2 ? setRetailPriceValue(e.target.value) :setRetailPriceValue(retailPriceValue) }} name="giaBan" data-toggle="autonumeric-money" placeholder=""  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btn-update-price" type="button" className="btn btn-primary" onClick={()=>{
                                    console.log('giá niêm yết', listedPriceValue,'giá bán lẻ',retailPriceValue )
                                }}>Cập nhật</button>
                                <button type="button" className="btn btn-light" data-dismiss="modal" onClick={()=>{modalPriceRef.current.classList.remove('show')}}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/* <!--  Modal thêm tồn kho --> */}
            <div className="modal  fade inventoryModal" id="modal-update-stock" ref={modalinventoryRef}>
                <div className="modal-dialog modal-lg modal_inventory">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Cập nhật số lượng tồn</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={()=>{modalinventoryRef.current.classList.remove('show')}}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group mb-3">
                                        <label for="ipt-value"> Nhập số tồn <span className="text-danger"> &nbsp;* </span><span id="modal-label"></span></label>
                                        <div className="input-group">
                                            <input type="text" id="ipt-tock-new" className="form-control" min="0" value={inventoryValue} onChange={(e)=>{ e.target.value/2 ? setInventoryValue(e.target.value):setInventoryValue(inventoryValue)}} name="giaBan" data-toggle="autonumeric-money" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btn-update-stock" type="button" className="btn btn-primary" onClick={()=>{
                                console.log(inventoryValue)
                            }}>Cập nhật</button>
                            <button type="button" className="btn btn-light" data-dismiss="modal" onClick={()=>{modalinventoryRef.current.classList.remove('show')}}>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
             {/* Modal ajs */}
            <div className='ajsMadal '>
                <div className="ajsDialog">
                    <div className="titleDialog ">
                        <h5>Thông Báo</h5>
                        <span className="btn_Close"><FontAwesomeIcon icon={faXmark} /></span>
                    </div>
                    <div className="descriptionBlock">
                            <p>Xác nhận Dừng bán sản phẩm</p>
                    </div>
                    <div className="ajsFooter">
                            <Buttom spanClass={['btn_pri']} iconClass={['mdi-check']}content='đồng ý'/>
                            <Buttom spanClass={['mr-2','ml-2']} iconClass={['mdi-check']}content='hủy bỏ'/>
                              
                    </div>
                </div>
            </div>
        </>
    )


}
export default Product