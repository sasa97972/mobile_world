export const changeSort = (params) => dispatch => {
    dispatch({type: "CHANGE_SORT", payload: params});
};