export const getProduct = (params) => dispatch => {
    let settings = {
        async: true,
        crossDomain: true,
        method: "GET",
        url: params.url,
    };

    axios(settings).then(response => {
        dispatch({type: "FETCH_PRODUCT_SUCCESS", payload: response.data})
    });
};