import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';

export const serverProblemsInitial = {
    problems: [],
    error: null,
}

const problemsStatic = [
    {
        id: 1,
        name: "first",
        profession_name: 'firstProfession1',
        details_of_eclipse: 'firstDetails1',
        cost: '1',
        // image: 'https://reactnative.dev/img/tiny_logo.png',
        image: [
            'https://reactnative.dev/img/tiny_logo.png',

            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        ],
        solution: 'firstSolution1',
        timeStamp: 'Jul 14, 2020 5:34:02 PM',
        standarts: []
    },
    {
        id: 2,
        name: "second",
        profession_name: 'secondProfession1',
        details_of_eclipse: 'secondDetails1',
        cost: '1',
        image: [],
        solution: 'secondSolution1',
        timeStamp: 'Jul 14, 2020 5:34:02 PM',
        standarts: []
    }
]

export const serverProblemsReducer = (
    state = serverProblemsInitial,
    action
) => {

    switch (action.type) {

        case "SET_SERVER_PROBLEMS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                problems: action.problems
            });

        case "ERROR_SERVER_PROBLEMS":
            return Update({
                ...state,
                fetching: false,
                error: action.error,

            });

        // case "GET_SERVER_PROBLEMS":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             fetching: true,
        //             token: action.payload,
        //             problems: problemsStatic
        //         },
        //         async (state, dispatch) => {
        //             try {
        //                 const response = await axios.get(
        //                     "http://160.153.254.153/api/problems/all",

        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.payload}`
        //                         }
        //                     }

        //                 );

        //                 dispatch({
        //                     type: "SET_SERVER_PROBLEMS",
        //                     problems: response.data.data,
        //                 })

        //             } catch (error) {

        //                 dispatch({
        //                     type: "ERROR_SERVER_PROBLEMS",
        //                     error
        //                 });
        //             }
        //         }
        //     );
        case "GET_SERVER_PROBLEMS":
            return Update({
                ...state,
                token: action.payload,
                problems: problemsStatic
            })

        case "POST_SERVER_PROBLEM":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },

                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/problems/store`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                problem: action.problem
                            }
                        );

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        })
                    }
                }
            )
        case "UPDATE_SERVER_PROBLEM":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },

                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/problems/store`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                problem_name: action.problem.problemName,
                                problem: action.problem
                            }
                        );

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        })
                    }
                }
            )
        case "UPDATE_SERVER_PROBLEM_IN_SERVER_AREA":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },

                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/problems/store`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                area_name: action.areaName,
                                problem_name: action.problem.problemName,
                                problem: action.problem
                            }
                        );

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        })
                    }
                }
            )

        case "POST_STANDARTS_TO_SAVED_PROBLEM":
            return UpdateWithSideEffect({
                ...state,
                token: action.token,
                posting: true
            },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/problems/store/${action.problemName}`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                standarts: action.standarts
                            }
                        );

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        })
                    }
                })
    }
}