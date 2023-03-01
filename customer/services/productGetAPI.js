const url = "https://63e8641ccbdc565873852dc8.mockapi.io/api/Shops";

function apiGetProducts (searchValue) {
    return axios({
        method: "GET",
        url: url,
        params: {
            itemName: searchValue || undefined,
        }
    });
};


