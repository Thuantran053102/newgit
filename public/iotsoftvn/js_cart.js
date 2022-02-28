

$(document).ready(function () {
    renderCountCart();
	
    $('#btn-my-cart').on('click', function () { location.href = '/cart' })
});

/*Render count số lượng trên giỏ hanhg, vs dropwdow danh sách sản phẩm khi click vao gio hang*/
function renderCountCart() {
    let myCart = getMyCart();
    // Render dropdow list
    let Count = 0;// số lượng sp trong giỏ
    for (var i = 0; i < myCart.length; i++) {
        Count += myCart[i].Quantity;
    }
    if (Count > 0) {
        $(".cart-count").removeClass("d-none ");
        if (Count > 99)
            Count = "99+";
        $('.cart-count').html(Count);
        $('.cart-count').show();
    }
    else {
        $('.cart-count').hide();
    }
}

/*Thêm sản phẩm vào giỏ hàng*/
/*Trương hợp thêm trong trang chi tiết sản phẩm có số lượng quantity*/
function AddToCart(productId, quantity = null) {
    showLoading();
    let myCart = getMyCart();
    let isExist = false;

    // Sản phẩm có trong giỏ
    for (var i = 0; i < myCart.length; i++) {
        if (myCart[i].ProductId == productId) {
            myCart[i].Quantity = (myCart[i].Quantity + (quantity == null ? 1 : quantity));
            isExist = true;
        }
    }

    if (!isExist) {// Nếu sản phẩm chưa có trong giỏ
        ajaxGet('Product/ById/' + productId, null, function (res) {
            if (res.IsSuccess) {
                var data = res.Result;
                console.log(data);
                var item = {
                    ProductId: data.Id,
                    ThumbNail: data.ThumbNail,
                    ProductName: data.ProductName,
                    Quantity: quantity == null ? 1 : quantity,
                    OriginPrice: data.OriginPrice,
                    SaleOffPrice: data.SaleOffPrice,
                    SalePrice: data.SalePrice,
                    FriendlyUrl : data.FriendlyUrl
                }
                myCart.push(item);
            }
        }, null, false);
    }
    setMyCart(myCart);
    renderCountCart();
    hideLoading();
}



/*Lấy giỏ hàng*/
function getMyCart() {
    let myCartJson = localStorage.getItem("myCart");
    if (myCartJson == "" || myCartJson == null || myCartJson == 'null')
        return [];
    else {
        return JSON.parse(myCartJson);
    }
}

/*Thêm hàng giỏ hàng*/
function setMyCart(myCart) {
    localStorage.setItem('myCart', JSON.stringify(myCart));
}