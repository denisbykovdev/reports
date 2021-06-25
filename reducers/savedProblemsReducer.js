import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const savedProblemsInitial = {
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

export const savedProblemsReducer = (
    state = problemsInitial,
    action
) => {

    switch (action.type) {

        case "UPDATE_SAVED_PROBLEMS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                problems: action.problems
            });

        case "ERROR_SAVED_PROBLEMS":
            return Update({
                ...state,
                fetching: false,
                error: action.error,

            });

        // case "FETCH_SAVED_PROBLEMS":
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
        //                     type: "GET_SAVED_PROBLEMS",
        //                     problems: response.data.data,
        //                 })

        //             } catch (error) {

        //                 dispatch({
        //                     type: "ERROR_SAVED_PROBLEMS",
        //                     error
        //                 });
        //             }
        //         }
        //     );
        case "FETCH_SAVED_PROBLEMS":
            return Update({
                ...state,
                token: action.payload,
                problems: problemsStatic
            })

        case "POST_PROBLEM":
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
                            type: "UPDATE_SAVED_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_PROBLEMS",
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
                            type: "UPDATE_SAVED_PROBLEMS",
                            problems: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_PROBLEMS",
                            error
                        })
                    }
                })
    }
}