export default function products(state = [], action)
{
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return action.payload;
    }

    return state;
}