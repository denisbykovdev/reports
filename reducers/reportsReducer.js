import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const reportsInitial = {
    reports: null,
    error: null,
    reportsSearch: null
}

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
                reportsSearch: action.reports
            });

        case "ERROR_REPORTS":
            return Update({
                ...state,
                fetching: false,
                error: action.error
            });

        case "FETCH_REPORTS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.payload
                },
                async (state, dispatch) => {
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
                            reports: response.data.data,
                        })

                        console.log("***useReports/GET_REPORTS:", response.data.data);

                    } catch (error) {

                        dispatch({
                            type: "ERROR_REPORTS",
                            error
                        });

                        console.log("***useReports/ERROR_REPORTS:", error);
                    }
                }
            );

        case "DELETE_USER":
            return NoUpdate({
                ...state,
                reportsSearch: state.reports.filter(user => user !== action.userName),
                reports: state.reports.filter(user => user !== action.userName)
            });

        case "CHANGE_REPORT_VALUE":
            return NoUpdate({
                ...state,
                reportsSearch: state.reportsSearch.map(user =>
                    user.name === action.userName ?
                        {
                            ...user,
                            [action.userKey]: action.userKeyValue
                        } :
                        user
                ),
                reports: state.reports.map(user =>
                    user.name === action.userName ?
                        {
                            ...user,
                            [action.userKey]: action.userKeyValue
                        } :
                        user
                )
            });

        case "RESET_REPORTS_SEARCH":
            return NoUpdate({
                ...state,
                reportsSearch: state.reports
            });
    }
}