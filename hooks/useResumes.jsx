import React, { useEffect } from "react";
import { resumesInitial, resumesReducer } from "../reducers/resumesReducer";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import useAuth from "./useAuth";

export default function useResumes(
) {
    const [resumesState, resumesDispatch] = useReducerWithSideEffects(
        resumesReducer,
        resumesInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    // useEffect(() => {
    //     resumesDispatch({
    //         type: "FETCH_RESUMES",
    //         payload: token
    //     })
    // }, [])

    return [
        resumesState, resumesDispatch
    ]
}