import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';
import { deleteReport, reportsAll, updateReport } from '../constants/api';

export const reportsInitial = {
    reports: null,
    error: null
};

const reportsData = [
    {
        id: "1",
        status: "נבד",
        customer_name: "1", // customer_name
        customer_full_name: "firstClient",//customer_full_name
        report_adress: "planet Earth",//report_adress
        examination_date: "02.03.21",//examination_date
        tester_name: "firstEditor"//tester_name
    },
    {
        id: "2",
        status: "נבד", //положение дел
        customerNumber: "2",
        client: "secondCLient",
        address: "web",
        date: "13.02.21",
        editorsName: "secondEditor"
    }
];

export const reportsReducer = (
    state = reportsInitial,
    action
) => {
    switch (action.type) {
        case "GET_REPORTS":
            return Update({
                ...state,
                fetching: false,
                reports: action.reports
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
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${reportsAll}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "GET_REPORTS",
                            reports: response.data.data,
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_REPORTS",
                            error
                        });
                    };
                }
            );
        case "DELETE_ITEM":
            return UpdateWithSideEffect(
                {
                    ...state,
                    token: action.token,
                    fetching: true
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${deleteReport(action.itemId)}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "GET_REPORTS",
                            reports: [
                                ...state.reports.filter(
                                    report =>
                                        report.id === response.data.data.id
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_REPORTS",
                            error
                        });
                    };
                }
            );
        case "CHANGE_ITEM_VALUE":
            // console.log(
            //     ":::reportsReducer:", 
            //     action.itemId, 
            //     action.itemKey, 
            //     action.itemNewValue
            // );
            return UpdateWithSideEffect(
                {
                    ...state,
                    token: action.token,
                    fetching: true
                },
                async (state, dispatch) => {
                    try {
                        console.log(
                            "--- defectsReducer/ping:UPDATE_REPORT", updateReport(action.itemId), action.data
                        )
                        const response = await axios.post(
                            `${updateReport(action.itemId)}`,
                            {
                                // [action.itemKey]: action.itemNewValue
                                ...action.data
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "GET_REPORTS",
                            users: response.data.data,
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_REPORTS",
                            error
                        });
                    };
                }
            );
    };
};