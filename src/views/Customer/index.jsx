import React from "react";

import "./Customer.scss"

function Customer(){
    return(
        <div class="container-fluid">
            <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <h4 class="page-title">Khách hàng</h4>
            </div>
        </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                    <div class="card-body">
                      <div class="page-aside-left p-0">
                        <button onclick="reloadPagination()" type="button" class="btn btn-block btn-primary"><i class="mdi mdi-refresh font-16 mr-1"></i>Làm mới dữ liệu</button>
                      
                        <div class="mt-4">
                            <h5 class="text-primary">Tìm kiếm</h5>
                            <div class="form-group">
                                <input id="ipt-text-search" type="text" class="form-control" placeholder="Tìm theo họ tên, email,số điện thoại..." autocomplete="off" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <h5 class="text-primary">Số khách hàng</h5>
                            <div class="form-group">
                                <select id="sel-record-search" class="form-control" data-toggle="select-no-search">
                                    <option value="20">20 khách hàng</option>
                                    <option value="30">30 khách hàng</option>
                                    <option value="50">50 khách hàng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="page-aside-right">

                        
                        <div class="table-responsive">
                            <table class="table table-centered table-striped dt-responsive nowrap w-100" id="products-datatable">
                                <thead>
                                    <tr>
                                        <th class="text-center px-w-50">
                                            #
                                        </th>
                                        <th>Họ và tên</th>
                                        <th>Điện thoại</th>
                                        <th>Địa chỉ</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody id="tbl-body">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="row">
                            <div id="div-pagination-info" class="col-6 mt-2"></div>
                            <div class="col-6"><div id="div-pagination-selection" class="float-right mb-3 mt-1"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}
export default Customer