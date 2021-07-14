import React, { useEffect } from "react";
import useAuth from "./useAuth";
import useDefects from "./useDefects";

export default function useServerAreas() {
    const { defectsState, defectsDispatch } = useDefects()

    const { authState } = useAuth();

    const { token } = authState;

    useEffect(() => {
        () => defectsDispatch({
            type: "FETCH_SAVED_AREAS",
            token
        })
    }, [])

    return [
        defectsState, defectsDispatch
    ]
}
