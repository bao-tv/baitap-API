const arrNotif = [
    'Tên sản phẩm không được để trống',
    'Giá sản phẩm không được để trống',
    'Màn hình sản phẩm không được để trống',
    'Camera trước sản phẩm không được để trống',
    'Camera sau sản phẩm không được để trống',
    'Hình ảnh sản phẩm không được để trống',
    'Loại sản phẩm không được để trống',

    'Giá sản phẩm phải là số'
];


function validate() {
    let isValid = true;
    // check tên SP
    if(!getEle("#TenSP").value) {
        isValid = false;
        getEle("#tbTenSP").innerHTML = arrNotif[0];
    } else {
        getEle("#tbTenSP").innerHTML = "";
    }

    // check giá
    if (!getEle("#giaSP").value) {
        isValid = false;
        getEle("#tbgiaSP").innerHTML = arrNotif[1];
    } else if(isNaN(getEle("#giaSP").value)) {
        isValid = false;
        getEle("#tbgiaSP").innerHTML = arrNotif[7];
    } else {
        getEle("#tbgiaSP").innerHTML = "";
    }

    // check màn hình ...
    if(!getEle("#screenSP").value) {
        isValid = false;
        getEle("#tbscreenSP").innerHTML = arrNotif[2];
    } else {
        getEle("#tbscreenSP").innerHTML = "";
    }

    if(!getEle("#frontCameraSP").value) {
        isValid = false;
        getEle("#tbfrontCameraSP").innerHTML = arrNotif[3];
    } else {
        getEle("#tbfrontCameraSP").innerHTML = "";
    }
    
    if(!getEle("#backCameraSP").value) {
        isValid = false;
        getEle("#tbbackCameraSP").innerHTML = arrNotif[4];
    } else {
        getEle("#tbbackCameraSP").innerHTML = "";
    }

    if(!getEle("#imgSP").value) {
        isValid = false;
        getEle("#tbimgSP").innerHTML = arrNotif[5];
    } else {
        getEle("#tbimgSP").innerHTML = "";
    }

    if(!getEle("#loaiSP").value) {
        isValid = false;
        getEle("#tbloaiSP").innerHTML = arrNotif[6];
    } else {
        getEle("#tbloaiSP").innerHTML = "";
    }
    return isValid;
};

function resetFrom() {
    getEle("#TenSP").value = '';
    getEle("#giaSP").value = '';
    getEle("#screenSP").value = '';
    getEle("#backCameraSP").value = '';
    getEle("#frontCameraSP").value = '';
    getEle("#imgSP").value = '';
    getEle("#descSP").value = '';
    getEle("#loaiSP").value = '';

    getEle("#tbTenSP").innerHTML = '';
    getEle("#tbgiaSP").innerHTML = '';
    getEle("#tbscreenSP").innerHTML = '';
    getEle("#tbbackCameraSP").innerHTML = '';
    getEle("#tbfrontCameraSP").innerHTML = '';
    getEle("#tbimgSP").innerHTML = '';
    getEle("#tbdescSP").innerHTML = '';
    getEle("#tbloaiSP").innerHTML = '';
}
