import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import { createProblem, getAllProblems, updateProblem } from '../constants/api';

export const serverProblemsInitial = {
    problems: [],
    error: null,
};

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
                error: action.error
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

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: response.data,
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        });
                    };
                }
            );
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
                            problems: [
                                ...state.problems,
                                response.data.data
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        });
                    };
                }
            );
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
                            problems: [...state.problems.map(
                                problem =>
                                    problem.name === response.data.data.name
                                        ? response.data.data
                                        : problem
                            )]
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        })
                    }
                }
            );
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
                            }
                        );

                        dispatch({
                            type: "SET_SERVER_PROBLEMS",
                            problems: [...state.problems.map(
                                problem =>
                                    problem.name === response.data.data.name
                                        ? response.data.data
                                        : problem
                            )]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_PROBLEMS",
                            error
                        });
                    };
                });
    };
};