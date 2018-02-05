export default function products(state = [], action)
{
    switch (action.type) {
        case "FETCH_PRODUCTS_SUCCESS":
            return action.payload;
        case "CHANGE_SORT":
            let newState = state.slice();
            let {sortBy, sort} = action.payload;
            sortBy = sortBy.split(".");
            newState.sort((a, b) => {
                if(a[sortBy] > b[sortBy]) return sort === "asc" ? 1 : -1;
                if(a[sortBy] < b[sortBy]) return sort === "asc" ?  -1 : 1;
                return 0;
            });
            return newState;
    }

    return state;
}