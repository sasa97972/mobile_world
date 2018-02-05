export const getProducts = (params) => dispatch => {
    let settings = {
        async: true,
        crossDomain: true,
        method: "GET",
        url: params.url,
    };

    axios(settings).then(response => {
        dispatch({type: "FETCH_PRODUCTS_SUCCESS", payload: response.data})
    });
};