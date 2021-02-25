import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const usersInitial = {
    users: null,
    error: null,
    // usersSearch: null
}

export const usersReducer = (
    state = usersInitial,
    action
) => {

    switch (action.type) {

        case "GET_USERS":
            return Update({
                ...state,
                fetching: false,
                users: action.users,
                // usersSearch: action.users
            });

        case "ERROR_USERS":
            return Update({
                ...state,
                fetching: false,
                error: action.error
            });

        case "FETCH_USERS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.payload
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            "http://160.153.254.153/api/user/get",

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.payload}`
                                }
                            }

                        );

                        dispatch({
                            type: "GET_USERS",
                            users: response.data.data,
                        })

                        console.log("***usersReducer/GET_USERS:", response.data.data);

                    } catch (error) {

                        dispatch({
                            type: "ERROR_USERS",
                            error
                        });

                        console.log("***useUsers/ERROR_USERS:", error, state);
                    }
                }
            );

        case "DELETE_ITEM":
            console.log(
                ":::usersReducer:", action.itemId
            );
            return Update({
                ...state,
                users: state.users.filter(user => user.id !== action.itemId)
            });

        case "CHANGE_ITEM_VALUE":
            console.log(
                ":::usersReducer:", action.itemId, action.itemKey, action.itemNewValue
            );
            return Update({
                ...state,
                users: state.users.map(user =>
                    user.name === action.itemId ?
                        {
                            ...user,
                            [action.itemKey]: action.itemNewValue
                        } :
                        user
                )
            });
    }
}