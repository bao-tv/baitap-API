getProduct();
// lấy danh sách sản phảm từ API
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
        renderProducts(products);
    }).catch((error) => {
        alert("API get product Error");
    });
}

// hiển thị ra table
function renderProducts(products) {
    let html = products.reduce((result, product, index) => {
        return (
            result + `
            <tr>
                <td>${index + 1}</td>
                <td>${product.itemName}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>${product.des}</td>
                <td>
                    <img src="${product.img}" with= "70" height= "70" />
                </td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-primary" onclick="selectProduct('${product.id}')">Sửa
                    </button>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Xoá
                    </button>
                </td>
            </tr>
            `
        );
    },"");
    getEle("#tblDanhSachSP").innerHTML = html;
}

function createdProduct () {
    const product = {
        itemName : getEle("#TenSP").value,
        price : getEle("#GiaSP").value,
        screen : getEle("#screenSP").value,
        backCamera : getEle("#backCameraSP").value,
        frontCamera : getEle("#frontCameraSP").value,
        img : getEle("#imgSP").value,
        des : getEle("#descSP").value,
        type : getEle("#loaiSP").value
    }

    apiCreatedProduct(product).then((response) => {
        getProduct();
        // console.log(product.itemName);
        alert(`Tạo mới sản phẩm ${product.itemName} thành công`);
        $('#myModal').modal('hide');
    }).catch((error) => {
        console.log(error);
        alert(`Tạo mới sản phẩm ${product.itemName} thất bại`);
        $('#myModal').modal('hide');
    })
}

// hàm xóa sản phẩm: 
function deleteProduct(productID) {
    apiDeleteProduct(productID)
    .then((response) => {
        getProduct();
        alert(`Xoá sản phẩm ${response.data.itemName} thành công`);
    }).catch((error) => {
        alert("Xoá sản phẩm thất bại");
    });
}

// select san pham
function selectProduct(productID) {
    apiSelectProduct(productID).then((response) => {
        const product = response.data;
        getEle("#TenSP").value = product.itemName;
        getEle("#GiaSP").value = product.price;
        getEle("#screenSP").value = product.screen;
        getEle("#backCameraSP").value = product.backCamera;
        getEle("#frontCameraSP").value = product.frontCamera;
        getEle("#imgSP").value = product.img;
        getEle("#descSP").value = product.des;
        getEle("#loaiSP").valu = product.type;
        // mo UI
        getEle(".modal-title").innerHTML = "Cập nhật sản phẩm";
        getEle(".modal-footer").innerHTML = `
            <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button class="btn btn-success" onclick="updateProduct('${product.id}')">Cập nhật</button>
            `
            $('#myModal').modal('show');
            
        }).catch((error) => {
            alert("Lấy thông tin sản phẩm thất bại");
    })
};

// hàm update sp
function updateProduct(productID) {
    const product = {
        itemName : getEle("#TenSP").value,
        price : getEle("#GiaSP").value,
        screen : getEle("#screenSP").value,
        backCamera : getEle("#backCameraSP").value,
        frontCamera : getEle("#frontCameraSP").value,
        img : getEle("#imgSP").value,
        des : getEle("#descSP").value,
        type : getEle("#loaiSP").value,
    };
    apiUpdateProduct(productID, product).then((response) => {
        getProduct();
        alert(`Cập nhật sản phẩm ${product.itemName} thành công`);
        $('#myModal').modal('hide');
    }).catch((error) => {
        alert("Cập nhật sản phẩm thất bại");
        $('#myModal').modal('hide');
    });
}

// DOM
getEle("#btnThemSP").addEventListener("click", () => {
    getEle(".modal-title").innerHTML = "Thêm sản phẩm";
    getEle(".modal-footer").innerHTML = `
      <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
      <button class="btn btn-success" onclick="createdProduct()">Thêm</button>
    `
  });

  getEle("#txtSearch").addEventListener("keydown", (event) => {
    setTimeout(() => {
      const searchValue = event.target.value;
      getProduct(searchValue);
    }, 1000);
  });

// ================ Helpers ===================
function getEle(selector) {
    return document.querySelector(selector)
};
