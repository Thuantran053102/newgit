import React from 'react';
import { Route, Routes,a, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Navbar.scss'


function Navbar(){
    return(
       <>
         <div className="topnav">
                    <div className="container-fluid fa">
                        <nav className="navbar navbar-dark navbar-expand-lg topnav-menu">
                            <div className="collapse navbar-collapse active" id="topnav-menu-content">
                                <ul className="navbar-nav mr-auto">
                                            <li className="nav-item">
                                                <Link className="nav-link cursor-pointer arrow-none" to="/admin/dashboard"><i className="mdi mdi-monitor-dashboard mr-1 font-16"></i>Tổng quan</Link>
                                            </li>

                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle cursor-pointer arrow-none" data-toggle="dropdown"><i className="mdi mdi-archive-outline mr-1"></i>Sản phẩm<div className="arrow-down"></div></a>
                                                <div className="dropdown-menu">
                                                    <Link to="/admin/product" className="dropdown-item"><i className="mdi mdi-file-cabinet mr-1 font-16"></i>Quản lý sản phẩm</Link>
                                                    <a href="/admin/product-group" className="dropdown-item"><i className="mdi mdi-group mr-1 font-16"></i>Nhóm sản phẩm</a>
                                                    <a href="/admin/product/printlabel" className="dropdown-item"><i className="mdi mdi-printer mr-1 font-16"></i>In Tem</a>
                                                    <a href="/admin/product/syncprice" className="dropdown-item"><i className="mdi mdi-sync mr-1 font-16"></i>Đồng bộ giá - Tồn kho</a>
                                                    <a href="/admin/product/category" className="dropdown-item"><i className="mdi mdi-image-filter-none mr-1 font-16"></i>Danh mục sản phẩm</a>
                                                    <a href="/admin/product/properties" className="dropdown-item"><i className="mdi mdi-tag mr-1 font-16"></i>Danh mục thuộc tính</a>
                                                    <a href="/admin/product/brand" className="dropdown-item"><i className="mdi mdi-ticket mr-1 font-16"></i>Danh mục thương hiệu</a>
                                                    <a href="/admin/product/filter" className="dropdown-item"><i className="mdi mdi-select-search mr-1 font-16"></i>Tùy chỉnh bộ lọc</a>
                                                    <a href="/admin/ProductPrice" className="dropdown-item"><i className="mdi mdi-chart-tree mr-1 font-16"></i>Lịch sử cập nhật giá</a>
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link cursor-pointer arrow-none" href="/admin/purchaseorder"><i className="mdi mdi-file-star-outline mr-1 font-16"></i>Đơn hàng<span id="sp-count-po" className="badge badge-primary mt-0">0</span></a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle cursor-pointer arrow-none" data-toggle="dropdown"><i className="mdi mdi-archive-outline mr-1"></i>Chương trình <div className="arrow-down"></div></a>
                                                <div className="dropdown-menu">
                                                    <a href="/admin/promotion" className="dropdown-item"><i className="mdi mdi-file-cabinet mr-1 font-16"></i>Chương trình khuyến mãi</a>
                                                    <a href="/admin/promotion/installment" className="dropdown-item"><i className="mdi mdi-credit-card-multiple-outline mr-1 font-16"></i>Chương trình trả góp 0%</a>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link cursor-pointer arrow-none" to="/admin/customer"><i className="mdi mdi-account-tie mr-1 font-16"></i>Thông tin khách hàng</Link>
                                            </li>



                                            <li className="nav-item">
                                                <a className="nav-link cursor-pointer arrow-none" href="/admin/post"><i className="mdi mdi-file-document-edit-outline mr-1 font-16"></i>Tin tức</a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle cursor-pointer arrow-none" data-toggle="dropdown"><i className="mdi mdi-database mr-1"></i>Hệ thống<div className="arrow-down"></div></a>
                                                <div className="dropdown-menu">

                                                            <a href="/admin/filemanager" className="dropdown-item"><i className="mdi mdi-folder-edit-outline mr-1 font-16"></i>Quản lý tập tin</a>
                                                            <a href="/admin/config/installmentbank" className="dropdown-item"><i className="mdi mdi-credit-card-multiple-outline mr-1 font-16"></i>Ngân hàng trả góp</a>
                                                            <a href="/admin/config" className="dropdown-item"><i className="mdi mdi-tools mr-1 font-16"></i>Thiết lập hệ thống</a>
                                                            <a href="/admin/popup" className="dropdown-item"><i className="mdi mdi-window-restore mr-1 font-16"></i>Banner quảng cáo</a>
                                                            <a href="/admin/advertise" className="dropdown-item"><i className="mdi mdi-arrow-left-right-bold mr-1 font-16"></i>Hình ảnh quảng cáo</a>
                                                            <a href="/admin/account" className="dropdown-item"><i className="mdi mdi-account-plus mr-1 font-16"></i>Tài khoản</a>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link cursor-pointer arrow-none" href="/admin/contact"><i className="mdi mdi-email-outline mr-1 font-16"></i>Liên hệ<span id="sp-count-contact" className="badge badge-primary mt-0">0</span></a>
                                            </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="dropdown notification-list pr-2">
                                        <a className="nav-link dropdown-toggle nav-user arrow-none mr-0 nav-user-custom cursor-pointer" data-toggle="dropdown">
                                            <span className="account-user-avatar">
                                                <img id="img-avatar" src="/images/default-avatar.jpg" onError="this.onerror = null; this.src = '/images/default-avatar.jpg'" className="rounded-circle"/>
                                            </span>
                                            <span>
                                                <span className="account-user-name" id="sp-user-name">guess</span>
                                                <span className="account-position" id="sp-user-role">guess</span>
                                            </span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                                            <a href="javascript:showModal('#modal-profile')" className="cursor-pointer dropdown-item notify-item"><i className="mdi mdi-account mr-1 font-16"></i><span>Cá nhân</span></a>
                                            <a href="javascript:logOut()" className="dropdown-item notify-item cursor-pointer"><i className="mdi mdi-logout mr-1 font-16"></i><span>Đăng xuất</span></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <Routes>
                    <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
                    <Route path='/admin/product' element={<Product/>}></Route>
                    <Route path='/admin/customer' element={<Customer/>}></Route>
                </Routes>
       </>
    )
}
export default Navbar