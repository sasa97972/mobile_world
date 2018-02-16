export const getProducts = (params) => dispatch => {
    let settings = {
        url: params.url,
        async: true,
        crossDomain: true,
        method: "GET",
    };

    return axios(settings).then(response => {
        dispatch({type: "FETCH_PRODUCTS_SUCCESS", payload: response.data});
        return Promise.resolve();
    });
};

export const addProduct = (params) => dispatch => {
    let settings = {
        url: params.url,
        async: true,
        crossDomain: true,
        method: "POST",
        data: {
            product_id: params.product_id
        }
    };

    return axios(settings).then(response => {
        dispatch({type: "ADD_PRODUCT_SUCCESS", payload: response.data});
        return Promise.resolve();
    });
};