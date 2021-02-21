import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import useAuth from '../hooks/useAuth';

// export const usersInitial = {
//     users: null,
//     loading: false,
//     error: null,
//     usersSearch: null
// }

export const usersReducer = (
    state,
    action
) => {

    switch (action.type) {
        case "LOADING_USERS":
            return {
                ...state,
                loading: true
            };
        case "GET_USERS":
            return Update({
                ...state,
                // loading: false,
                fetchingUsers: false,
                users: action.users,
                usersSearch: action.users
            });
        case "ERROR_USERS":
            return Update({
                ...state,
                // loading: false,
                fetchingUsers: false,
                error: action.error
            })

        case "FETCH_USERS": 
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetchingUsers: true,
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
                            users: response.data,
                        })
        
                        console.log("***useUsers/GET_USERS:", response.data, state);
        
                    } catch (error) {
                        console.log("***useUsers/ERROR_USERS:", error);
        
                        dispatch({
                            type: "ERROR_USERS",
                            error
                        });
                    }
                }
            );

        case "DELETE_USER":
            return {
                ...state,
                usersSearch: state.users.filter(user => user !== action.userName)
            };
        case "CHANGE_USER_VALUE":
            return {
                ...state,
                usersSearch: state.usersSearch.map(user =>
                    user.name === action.userName ?
                        {
                            ...user,
                            [action.userKey]: action.userKeyValue
                        } :
                        user
                )
            };
        case "RESET_REPORTS_SEARCH":
            return {
                ...state,
                usersSearch: state.users
            };
    }
}