export const sagaEditPhotoInitial = {
    photo: null
}

export const sagaEditPhotoReducer = (state = sagaEditPhotoInitial,
    action
) => {
    switch (action.type) {
        case "EDIT_PHOTO_START":
            return {
                ...state,
                posting: true
            }
        case "EDIT_PHOTO_SUCCESS":
            return {
                ...state,
                posting: false,
                photo: action.payload.photo
            }
        case "EDIT_PHOTO_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}