import React, { useEffect } from "react";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import { standartsInitial, standartsReducer } from "../reducers/standartsReducer";
import useAuth from "./useAuth";

export default function useStandarts(
) {
    const [standartsState, standartsDispatch] = useReducerWithSideEffects(
        standartsReducer,
        standartsInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    useEffect(() => {
        standartsDispatch({
            type: "FETCH_STANDARTS",
            token
        })
    }, [])

    return [
        standartsState, standartsDispatch
    ]
}