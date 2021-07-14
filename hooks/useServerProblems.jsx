import React, { useEffect } from "react";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import { serverProblemsReducer, serverProblemsInitial } from "../reducers/serverProblemsReducer";
import useAuth from "./useAuth";

export default function useServerProblems(
) {
    const [problemsState, problemsDispatch] = useReducerWithSideEffects(
        serverProblemsReducer,
        serverProblemsInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    // useEffect(() => {
    //     problemsDispatch({
    //         type: "GET_SERVER_PROBLEMS",
    //         payload: token
    //     })
    // }, [])

    return [
        problemsState, problemsDispatch
    ]
}