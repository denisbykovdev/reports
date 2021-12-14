import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';
import { addNewUser, deleteUser, passChange, updateUser, usersAll } from '../constants/api';

export const usersInitial = {
    users: null,
    error: null,
    confirm: false
}

const userData = [
    {
        id: 1,
        name: "first",
        last_name: "one",
        phone: "1234567",
        email: "first@mail.com",
        password: "123456"
    },
    {
        id: 2,
        name: "second",
        last_name: "two",
        phone: "7654321",
        email: "second@mail.com",
        password: "123456"
    }
]

export const usersReducer = (
    state = usersInitial,
    action
) => {

    switch (action.type) {

        case "UPDATE_USERS":
            return Update({
                ...state,
                fetching: false,
                users: action.users
            });

        case "ERROR_USERS":
            return Update({
                ...state,
                fetching: false,
                error: action.error
            });

        // case "FETCH_USERS":
        //     return Update({
        //         ...state,
        //         users: userData
        //     });

        case "FETCH_USERS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${usersAll}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }

                        );
                        console.log(`--- userReducer/FETCH_USERS:`, )
                        dispatch({
                            type: "UPDATE_USERS",
                            users: response.data.data,
                        })

                    } catch (error) {

                        dispatch({
                            type: "ERROR_USERS",
                            error
                        })
                    }
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
                            `${deleteUser(action.itemId)}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        )

                        dispatch({
                            type: "UPDATE_USERS",
                            users: response.data.data,
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_USERS",
                            error
                        })
                    }
                }
            );

        case "CHANGE_ITEM_VALUE":

            return UpdateWithSideEffect(
                {
                    ...state,
                    token: action.token,
                    fetching: true
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${updateUser(action.itemId)}`,
                            {
                                // key: action.itemKey,
                                // value: action.itemNewValue
                                // [action.itemKey]: action.itemNewValue
                                ...action.data
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        )

                        dispatch({
                            type: "UPDATE_USERS",
                            users: response.data.data,
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_USERS",
                            error
                        })
                    }
                }
            );

        case "ADD_USER":
            return UpdateWithSideEffect(
                {
                    ...state,
                    // token: action.token,
                    fetching: true
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${addNewUser}`,
                            {
                                ...action.user
                            },
                            // {
                            //     headers: {
                            //         'Authorization': `Bearer ${action.token}`
                            //     }
                            // }
                        )

                        dispatch({
                            type: "UPDATE_USERS",
                            users: response.data.data
                        })
                    } catch (error) {

                        dispatch({
                            type: "ERROR_USERS",
                            error
                        })
                    }
                }
            );

        case "CONFIRM":
            return Update({
                ...state,
                confirm: action.confirm,
                fetching: false
            });
        case "PASS_CHANGE":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${passChange}`,
                            {
                                id: action.userId,
                                password: action.password,
                                password_confirmation: action.password_confirmation
                            },
                            // {
                            //     headers: {
                            //         'Authorization': `Bearer ${action.token}`
                            //     }
                            // }
                        );
                        dispatch({
                            type: "CONFIRM",
                            confirm: response.password_update,
                        })

                    } catch (error) {

                        dispatch({
                            type: "ERROR_USERS",
                            error
                        })
                    }
                }
            );
    }
}