import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const resumesInitial = {
    resumes: [],
    error: null,
};

const resumesStatic = [
    'testResume1',
    'testResume2'
];

export const resumesReducer = (
    state = resumesInitial,
    action
) => {
    switch (action.type) {
        case "UPDATE_RESUMES":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                resumes: action.resumes
            });
        case "ERROR_RESUMES":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            });
        case "FETCH_RESUMES":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            "http://160.153.254.153/api/profession/store/all",
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_RESUMES",
                            resumes: response.data.data
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_RESUMES",
                            error
                        });
                    };
                }
            );
        case "POST_NEW_RESUME":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/profession/store`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                name: action.newResume
                            }
                        );
                        dispatch({
                            type: "UPDATE_RESUMES",
                            resumes: [
                                ...state.resumes,
                                response.data.data
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_RESUMES",
                            error
                        });
                    };
                }
            );
    };
};