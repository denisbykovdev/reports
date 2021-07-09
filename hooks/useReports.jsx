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

    // console.log(
    //     "*** useReports/init/token:", typeof token
    // )

    useEffect(() =>
        reportsDispatch({
            type: "FETCH_REPORTS",
            token
        })
        , [])

    // useEffect(() => {
    //     // console.log(
    //     //     "*** useReports/effectUpdate:", reportsState.reports
    //     // )
    // }
    //     // reportsDispatch({
    //     //     type: "FETCH_REPORTS",
    //     //     token
    //     // })
    //     , [reportsState.reports])

    return [
        reportsState, reportsDispatch
    ]
}
