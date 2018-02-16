export default function cart(state = [], action)
{
    switch (action.type) {
        case "FETCH_PRODUCTS_SUCCESS":
            return action.payload;
    }

    return state;
}