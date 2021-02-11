export const authInitial = {
    token: null,
    isAdmin: false,
    loading: false,
    error: null
}

export const authReducer = (
    state = authInitial,
    action
) => {
    switch (action.type) {
        case "LOAD_TOKEN":
            return {
                ...state,
                loading: true
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload,
                // isAdmin: true,
                loading: false,
            };
        case "SET_ADMIN":
            return {
                ...state,
                isAdmin: action.payload
            };
        case "DEL_TOKEN":
            return {
                ...state,
                loading: false,
                token: null
            }
        case "ERROR_TOKEN":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}