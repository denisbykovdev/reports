import React, { useEffect } from "react";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import useAuth from "./useAuth";
import { profsReducer, profsInitial } from '../reducers/profsReducer'

export default function useProfs(
) {
    const [profsState, profsDispatch] = useReducerWithSideEffects(
        profsReducer,
        profsInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    useEffect(() => {
        profsDispatch({
            type: "FETCH_PROFS",
            payload: token
        })
    }, [])

    return [
        profsState, profsDispatch
    ]
}