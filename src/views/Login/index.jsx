import React from 'react';
// import PropTypes from 'prop-types';
// import bootstrap from 'bootstrap'
import $ from 'jquery';
import alertify from 'alertifyjs';
import { Link, Route, Routes, Navigate } from 'react-router-dom';


Login.propTypes = {

};

function Login(props) {
     alertify.alert().setting({
          'label': '<i class="mdi mdi-check mr-1"></i>Xác nhận',
          'title': 'Thông báo'
     });

     $(function () {
          $('#ipt-username, #ipt-password').on('keydown', function (e) {
               if (e.keyCode === 13) {
                    login();
               }
          })
     })


     /** Ajax post function */
     function ajaxPost(url, data, successCallback, errorCallback = undefined) {

          $.ajax({
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               type: 'POST',
               url: url,
               data: JSON.stringify(data),
               dataType: 'json',
               success: successCallback,
               error: errorCallback
          });
     }

     function login() {
          let user = $('#ipt-username').val();
          let pass = $('#ipt-password').val();
          if (user == '') {
               alertify.alert('Tài khoản không được để trống')
          } else if (pass == '') {
               alertify.alert('Mật khẩu không được để trống')
          } else {

               let d = {
                    UserName: user,
                    Password: pass,
               }
               ajaxPost('/api/login', d, function (res) {
                    if (res.IsSuccess) {
                         if (res.Result.RoleName == "Intem") {
                              window.location.href = "/admin/product/printlabel";
                              // dùng route -> link
                         } else {
                              window.location.href = "/admin/dashboard";

                         }
                         localStorage.setItem('us_name', res.Result.FullName);
                         localStorage.setItem('us_role', res.Result.RoleName);
                    } else {
                         alertify.alert(res.Message);
                    }
               })

          }
     }
     return (
          <div className="authentication-bg">
               <div className="account-pages pt-5 mb-5">
                    <div className="container">
                         <div className="row justify-content-center">
                              <div className="col-lg-4">
                                   <div className="card">
                                        <div className="card-header pt-2 pb-2 text-center">
                                             <a href="/admin"><span><img src="/images/logo.png" alt='' className="w-100" /></span></a>
                                        </div>
                                        <div className="card-body p-4">
                                             <div className="text-center w-75 m-auto">
                                                  <h4 className="mb-2">Đăng nhập</h4>
                                             </div>
                                             <div>
                                                  <div className="form-group">
                                                       <label>Tài khoản</label>
                                                       <input id="ipt-username" className="form-control" tabIndex={1} type="text" placeholder="Tài khoản" autoFocus />
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Mật khẩu</label>
                                                       <input id="ipt-password" type="password" tabIndex={2} className="form-control" placeholder="Mật khẩu" autoComplete="off" />
                                                  </div>

                                                  <div className="form-group mb-0 w-100 mt-3 text-center">
                                                       {/* <button onClick={login} className="btn btn-primary" tabIndex={4}>
                                                            <i className="mdi mdi-login mr-1"></i>
                                                            Đăng nhập
                                                            <Routes>
                                                                 <Route path="/dashboard" element={login ? <Navigate to="/dashboard" /> : <DashBoard />} />
                                                            </Routes>

     </button> */}
                                                       
                                                       <button href="" className="btn btn-primary" tabIndex={4}><i className="mdi mdi-login mr-1"></i>Đăng nhập </button>


                                                  </div>

                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="footer footer-alt">2021 &copy; Công ty TNHH Giải pháp Công nghệ Phần mềm kết nối số Việt Nam IOT Software</div>

               {/* <script src="/assets/js/vendor.min.js"></script>
               <script src="/assets/js/i18n/vi.js"></script>
               <script src="/plugins/alertify/alertify.min.js"></script>
               <script src="~/lib/jquery/jquery.js"></script> */}
          </div>
     );
}

export default Login;