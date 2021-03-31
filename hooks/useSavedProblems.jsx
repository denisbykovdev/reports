import React, { useEffect } from "react";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import { savedProblemsReducer, savedProblemsInitial } from "../reducers/savedProblemsReducer";
import useAuth from "./useAuth";

export default function useSavedProblems(
) {
    const [problemsState, problemsDispatch] = useReducerWithSideEffects(
        savedProblemsReducer,
        savedProblemsInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    useEffect(() => {
        problemsDispatch({
            type: "FETCH_SAVED_PROBLEMS",
            payload: token
        })
    }, [])

    return [
        problemsState, problemsDispatch
    ]
}