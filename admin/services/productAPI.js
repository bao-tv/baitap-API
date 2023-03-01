const url = "https://63e8641ccbdc565873852dc8.mockapi.io/api/Shops";

function apiGetProducts(searchValue) {
    return axios({
        method: "GET",
        url: url,
        params: {
            itemName: searchValue || undefined,
        }
    });
};

function apiCreatedProduct(product) {
    return  axios({
        method: 'post',
        url: url,
        data: product
    });
};

function apiDeleteProduct(productID) {
    return  axios({
        method: 'DELETE',
        url: `${url}/${productID}`
    });
}

function apiSelectProduct(productID) {
    return axios({
        method: "GET",
        url: `${url}/${productID}`
    }); 
}

function apiUpdateProduct(productID, product) {
    return axios({
        method: "PUT",
        url: `${url}/${productID}`,
        data: product
    }); 
}
