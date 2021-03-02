import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const reportsInitial = {
    reports: null,
    error: null,
    // reportsSearch: null
}

const reportsData = [
    {
        testId: "1",
        status: "inDeveloping", //положение дел
        customerNumber: "1",
        client: "firstClient",
        address: "planet Earth",
        date: "02.03.21",
        editorsName: "firstEditor"
    },
    {
        testId: "2",
        status: "done", //положение дел
        customerNumber: "2",
        client: "secondCLient",
        address: "web",
        date: "13.02.21",
        editorsName: "secondEditor"
    }
]

export const reportsReducer = (
    state = reportsInitial,
    action
) => {

    switch (action.type) {

        case "GET_REPORTS":
            return Update({
                ...state,
                fetching: false,
                reports: action.reports,
                // reportsSearch: action.reports
            });

        case "ERROR_REPORTS":
            return Update({
                ...state,
                fetching: false,
                error: action.error,
                reports: reportsData
            });

        case "FETCH_REPORTS":

            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.payload
                },
                async (state, dispatch) => {
                    console.log(
                        "***ReportsReducer/FETCH_REPORTS/async/token", typeof action.payload
                    );
                    try {
                        const response = await axios.get(
                            "http://160.153.254.153/api/project/all",

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.payload}`
                                }
                            }

                        );

                        dispatch({
                            type: "GET_REPORTS",
                            reports: response.data.data.length > 0 ? response.data.data : userData,
                        })

                        console.log("***reportsReducer/GET_REPORTS:", response.data.data, state);

                    } catch (error) {

                        dispatch({
                            type: "ERROR_REPORTS",
                            error
                        });

                        console.log("***reportsReducer/ERROR_REPORTS:", error, state);
                    }
                }
            );

        case "DELETE_ITEM":
            console.log(
                ":::reportsReducer:", action.itemId
            );
            return Update({
                ...state,
                reports: state.reports.filter(user => user.id !== action.itemId)
            });

        case "CHANGE_ITEM_VALUE":
            console.log(
                ":::reportsReducer:", action.itemId, action.itemKey, action.itemNewValue
            );
            return Update({
                ...state,
                reports: state.reports.map(report =>
                    report.id === action.itemId ?
                        {
                            ...report,
                            [action.itemKey]: action.itemNewValue
                        } :
                        report
                )
            });
    }
}