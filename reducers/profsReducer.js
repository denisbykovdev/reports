import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import { createProfession, deleteProfession, getAllProfessions } from '../constants/api';

export const profsInitial = {
    profs: [],
    error: null
};

const profsStatic = [
    'testProf1',
    'testProf2'
];

export const profsReducer = (
    state = profsInitial,
    action
) => {
    switch (action.type) {
        case "UPDATE_PROFS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                profs: action.profs
            });
        case "ERROR_PROFS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            });
        case "FETCH_PROFS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${getAllProfessions}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        )
                        dispatch({
                            type: "UPDATE_PROFS",
                            profs: response.data.data,
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_PROFS",
                            error
                        });
                    }
                }
            );
        case "POST_NEW_PROF":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${createProfession}`,
                            {
                                name: action.newProf
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_PROFS",
                            profs: [
                                ...state.profs,
                                response.data.data
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_PROFS",
                            error
                        });
                    };
                }
            );
        case "DELETE_PROF":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${deleteProfession(action.profName)}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_PROFS",
                            profs: [
                                ...state.profs.filter(
                                    prof =>
                                        prof.name ===
                                        response.data.data.name
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_PROFS",
                            error
                        });
                    };
                }
            );
    };
};