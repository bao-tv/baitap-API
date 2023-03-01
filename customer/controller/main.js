getProduct();
// tạo mảng để lấy dữ liệu từ API trả về UI
let productsList = [];
let dataUI = false;

function getProduct(searchValue) {
    apiGetProducts(searchValue).then((response) => {
        const products = response.data.map((product) => {
            return new Product(
                product.id,
                product.itemName,
                product.price,
                product.screen,
                product.backCamera,
                product.frontCamera,
                product.img,
                product.des,
                product.type
                );
            });
            // call API thành công
            (!searchValue) ? productsList = products : "";
            renderProducts(products);
    }).catch((error) => {
        alert("API get product Error");
    });
}

function renderProducts(products) {
    let html = products.reduce((result, product, index) => {
        console.log('typeof product.price: ', typeof +product.price.toLocaleString());
        return (
            result + `
            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
                <div class="header__cart-border">
                    <div class="portfolio-imgs">
                        <img src="${product.img}" class="img-fluid img-product" alt="">
                    </div>
                    <div class="portfolio-info">
                        <h4>${product.itemName}</h4>
                        <p class="d-flex align-items-center">${(+product.price).toLocaleString()}<span class="header__cart-vnd ml-2">VND</span></p>
                        
                        <div class="cdt-product__config__param">
                            <div data-title="Màn hình">
                                <i class="mr-2 fa-solid fa-mobile-screen"></i></i>${product.screen}
                            </div>
                            <div data-title="Camera sau">
                                <i class="mr-1 fa-solid fa-camera"></i>${product.backCamera}
                            </div>
                            <div data-title="Camera sau">
                                <i class="mr-1 fa-solid fa-camera-rotate"></i>${product.frontCamera}
                            </div>
                            <div data-title="Mô tả">
                                <i class="mr-1"></i>${product.des}
                            </div>
                        </div>
                    </div>
                    <div class="add-cart-btn text-right">
                        <button class="btn btn-danger " onclick="addCartItem(${product.id})">MUA NGAY</button>
                    </div>
                </div>
            </div>
        `
        );
    },"");
    getEle("#dsProducts").innerHTML = html;
}

getEle("#txtSearch").addEventListener("keydown", (event) => {
    setTimeout(() => {
      const searchValue = event.target.value;
      getProduct(searchValue);
    }, 1000);
  });

//   ẩn hiện thành search
getEle("#iconSearch").addEventListener("click", () => {
    getEle("#txtSearch").classList.toggle("hide-search");
})

getEle("#filter").addEventListener("click", (event) => {
    setTimeout(() => {
      const filterValue = event.target.value;
      getProduct(filterValue);
    }, 1000);
  });

function getEle(selector) {
    return document.querySelector(selector);
};

// ============================ Cart Item ========================
let cartDetails  = getStoreCartDetails();
let totalItemCart;
let totalPriceCart;

renderCart();
  // get data product
// getDataProduct();
function getDataProduct() {
    apiGetProducts().then((response) => {
        const products = response.data.map((product) => {
            return new Product(
                product.id,
                product.itemName,
                product.price,
                product.screen,
                product.backCamera,
                product.frontCamera,
                product.img,
                product.des,
                product.type
                );
            });
            dataUI = true;
            // call API thành công
            productsList = products;
    }).catch((error) => {
        alert("API get product Error");
    });
}

// setTimeout(() => {
//     if (!productsList) {
//         alert("API get product UI Error");
//     } else {
//         dataUI = true;
//         console.log("productsList: ", productsList);
//     }
//   }, 2000);

//   thêm sản phẩm vào cart
function addCartItem(productId) {
    itemAddCart = productsList.find((product) => {
        return product.id == productId;
    });
    let id = itemAddCart.id;
    let itemName = itemAddCart.itemName;
    let price = itemAddCart.price;
    let img = itemAddCart.img;
    let type = itemAddCart.type;
    let quality = 1;
    const cartItem = new CartItem(
        id,
        itemName,
        price,
        img,
        type,
        quality
    );
    // check item đã có tồn tại trong cart chưa? nếu có thì tăng qty, chưa có thì push thêm vào mảng
    if(!cartDetails.some((obj) => obj.id == id)) {
        cartDetails.push(cartItem);
    } else {
        let index = cartDetails.findIndex((cartItem) => {
            return cartItem.id === id;
        });
        cartDetails[index].quality ++;
    } 
    renderCart();
};

// đưa ra giao diện cart
function renderCart() {
    storeCartDetails();
    total();
    let html;
    if(cartDetails.length) {
        getEle('.header__cart-yes').style.display = 'block';
        getEle('.header__cart-no').style.display = 'none';
        html = cartDetails.reduce((output, product) => {
                return (
                    output +
                    `
                    <li class="header__cart-item">
                          <div class="header__cart-item-img">
                            <img src="${product.img}" width="30" alt="" class="header__cart-img">
                          </div>
                          <div class="header__cart-item-info">
                            <div class="header__cart-item-info-heading">
                              <h5 class="header__cart-item-name">${product.itemName}</h5>
                              <div class="header__cart-item-price-wrap">
                                <span class="header__cart-item-price">${(product.price).toLocaleString()}</span>
                                <span class="header__cart-item-multiply">x</span>
                                <span class="header__cart-item-qnt">${product.quality}</span>
                            </div>
                          </div>
                          <div class="header__cart-item-body">
                            <span class="header__cart-item-description">
                                Phân loại: ${product.type}
                            </span>
                            <div class="header__cart-item-body-icon">
                              <span class="header__cart-item-icon btn btn-outline-primary" id="btn-add" onclick="btnAddItem(${product.id})"><i class="fa-solid fa-plus"></i></span>
                              <span class="header__cart-item-icon btn btn-outline-secondary" id='btn-sub' onclick="btnSubItem(${product.id})"><i class="fa-solid fa-minus"></i></span>
                            </div>
                          </div>
                          </div>
                        </li>
                    `
                );
            }, "");
    } else {
        getEle('.header__cart-yes').style.display = 'none';
        getEle('.header__cart-no').style.display = 'block';
    }
    getEle("#tbodyCart").innerHTML = html;
};

// tăng giảm số lượng của return về số lượng
function btnAddItem(productId) {
    let index = cartDetails.findIndex((product) => {
        return product.id == productId;
    });
    cartDetails[index].quality ++;
    renderCart();
}

function btnSubItem(productId) {
    let index = cartDetails.findIndex((product) => {
        return product.id == productId;
    });
    if(cartDetails[index].quality >= 2) {
        cartDetails[index].quality --;
    } else {
        cartDetails.splice(index,1);
    }
    renderCart();
}

// đếm tổng số item đang trong giỏ hàng
function total() {
    totalItemCart = cartDetails.reduce((total, obj) => total + obj.quality, 0);
    totalPriceCart = cartDetails.reduce((total, obj) => total + obj.quality*obj.price, 0);
    getEle("#totalPrice").innerHTML = totalPriceCart.toLocaleString();
    getEle("#totalItem").innerHTML = totalItemCart.toLocaleString();
    (totalItemCart>0) ? getEle("#totalItem").style.opacity = 1 :  getEle("#totalItem").style.opacity = 0;
};

function clearCart() {
    cartDetails = [];
    renderCart();
}

// lưu localstory
function storeCartDetails() {
    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
};

// lấy thông tin giỏ hàng từ local
function getStoreCartDetails() {
    const json = localStorage.getItem('cartDetails');

    if(!json) {
        return []; 
    } else {
        // chuyển Json -> Array
        return JSON.parse(json);
    }
    }

