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
    if(event.key == 'Enter') {
        event.preventDefault();
    } else {
        setTimeout(() => {
          const searchValue = event.target.value;
          getProduct(searchValue.trim());
        }, 1000);
    }
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

