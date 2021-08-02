export const watchEditPhoto = (
    token,
    photo,
    layer
) => ({
    type: "WATCH_EDIT_PHOTO",
    payload: {
        token,
        photo,
        layer
    }
})
export const editPhotoStart = () => ({
    type: "EDIT_PHOTO_START"
})
export const editPhotoSuccess = (
    photo
) => ({
    type: "EDIT_PHOTO_SUCCESS",
    payload: {
        photo
    }
})
export const editPhotoFailure = (error) => ({
    type: "EDIT_PHOTO_ERROR",
    payload: {
        error
    }
})