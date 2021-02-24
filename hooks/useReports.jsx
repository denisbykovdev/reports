import React, { useEffect } from "react";
import { reportsInitial, reportsReducer } from "../reducers/reportsReducer";
import useAuth from "./useAuth";

import useReducerWithSideEffects from 'use-reducer-with-side-effects';

export default function useReports() {
    const [reportsState, reportsDispatch] = useReducerWithSideEffects(
        reportsReducer,
        reportsInitial
    );

    const { authState } = useAuth();

    const { token } = authState;

    useEffect(() =>
        reportsDispatch({
            type: "FETCH_REPORTS",
            payload: token
        })
        , [])

    return [
        reportsState, reportsDispatch
    ]
}
