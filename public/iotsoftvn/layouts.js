$(function () {

})

///** Keep session*/
//setInterval(function () {
//    jQuery.post("/Home/Live", {}, function () { });
//}, 60000);

/** Event click logout */
function logOut() {
    var logOutUrl = "/Home/Logout";
    alertify.confirm("Bạn có chắc muốn đăng xuất?", function () {
        window.location = logOutUrl;
    });
}
