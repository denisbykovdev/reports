import React, { useEffect } from "react";
import useAuth from "./useAuth";

import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import { reportDataInitial, reportDataReducer } from "../reducers/reportDataReducer";

export default function useReportData(reportId) {
    const [reportDataState, reportDataDispatch] = useReducerWithSideEffects(
        reportDataReducer,
        reportDataInitial
    );

    const { authState } = useAuth();

    const { token } = authState;

    console.log(
        "*** useReportData/init:",
        reportId,
        token
    )

    useEffect(() => 
        reportDataDispatch({
            type: "FETCH_REPORT_DATA",
            token,
            reportId
        })
    , [])

    return [
        reportDataState, reportDataDispatch
    ]
}
