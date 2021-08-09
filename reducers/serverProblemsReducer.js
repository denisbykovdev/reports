import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import { createProblem, getAllProblems, updateProblem } from '../constants/api';

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

        case "GET_SERVER_PROBLEMS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${getAllProblems}`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.payload}`
                                }
                            }

                        );
                        // console.log(
                        //     `--- serverProblemsReducer/GET_SERVER_PROBLEMS/response:`, response.data.data
                        // )

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data.data,
                        })

                    } catch (error) {

                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        });
                    }
                }
            );
        // case "GET_SERVER_PROBLEMS":
        //     return Update({
        //         ...state,
        //         token: action.payload,
        //         problems: problemsStatic
        //     })

        case "POST_SERVER_PROBLEM":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },

                async (state, dispatch) => {
                    console.log(
                        `--- serverProblemsReducer/POST_SERVER_PROBLEM/action`, action.problem
                    )
                    try {
                        const response = await axios.post(
                            `${createProblem}`,

                            {
                                ...action.problem
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
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
            console.log(
                `--- serverProblemsReducer/UPDATE_SERVER_PROBLEM/action:`, action
            )
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${updateProblem(action.problemName)}`,
                            {
                                ...action.problem
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
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
            );
        // case "UPDATE_SERVER_PROBLEM_IN_SERVER_AREA":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             posting: true,
        //             token: action.token
        //         },

        //         async (state, dispatch) => {
        //             try {
        //                 const response = await axios.post(
        //                     `${updateAreaProblems(action.areaName)}`,

        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.token}`
        //                         }
        //                     },
        //                     {
        //                         area_name: action.areaName,
        //                         // problem_name: action.problem.problemName,
        //                         problems: action.problem
        //                     }
        //                 );

        //                 dispatch({
        //                     type: "SET_SERVER_PROBLEMS",
        //                     problems: response.data.data
        //                 })
        //             } catch (error) {
        //                 dispatch({
        //                     type: "ERROR_SERVER_PROBLEMS",
        //                     error
        //                 })
        //             }
        //         }
        //     )

        case "POST_STANDARTS_TO_SAVED_PROBLEM":
            return UpdateWithSideEffect({
                ...state,
                token: action.token,
                posting: true
            },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${updateProblem(action.problemName)}`,
                            {
                                ...action.problem
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            // {
                            //     standarts: action.standarts
                            // }
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