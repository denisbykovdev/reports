export const authInitial = {
    token: null,
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
                loading: false,
                token: action.payload
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