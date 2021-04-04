import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const usersInitial = {
    users: null,
    error: null
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
            })

        case "ERROR_USERS":
            return Update({
                ...state,
                fetching: false,
                error: action.error
            })

        case "FETCH_USERS":
            return Update({
                ...state,
                users: userData
            })

        // case "FETCH_USERS":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             fetching: true,
        //             token: action.payload
        //         },
        //         async (state, dispatch) => {
        //             try {
        //                 const response = await axios.get(
        //                     "http://160.153.254.153/api/user/get",

        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.payload}`
        //                         }
        //                     }

        //                 );

        //                 dispatch({
        //                     type: "UPDATE_USERS",
        //                     users: response.data.data,
        //                 })

        //                 console.log("***usersReducer/UPDATE_USERS:", response.data.data);

        //             } catch (error) {

        //                 dispatch({
        //                     type: "ERROR_USERS",
        //                     error,
        //                     // users: userData
        //                 });

        //                 console.log("***useUsers/ERROR_USERS:", error, state);
        //             }
        //         }
        //     )

        case "DELETE_ITEM":
            console.log(
                ":::usersReducer:", action.itemId
            );
            return Update({
                ...state,
                users: state.users.filter(user => user.id !== action.itemId)
            })

        case "CHANGE_ITEM_VALUE":
            console.log(
                ":::usersReducer:", action.itemId, action.itemKey, action.itemNewValue
            );
            return Update({
                ...state,
                users: state.users.map(user =>
                    user.id === action.itemId ?
                        {
                            ...user,
                            [action.itemKey]: action.itemNewValue
                        } :
                        user
                )
            })

        case "ADD_USER":
            return Update({
                ...state,
                users: [...state.users, action.user]
            })

        case "ADD_USER":
            return UpdateWithSideEffect(
                {
                    ...state,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            "http://160.153.254.153/api/user/store",
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.payload}`
                                }
                            },
                            {
                                user: action.user
                            }

                        );
                        dispatch({
                            type: "UPDATE_USERS",
                            users: response.data.data
                        })
                    } catch (error) {

                        dispatch({
                            type: "ERROR_USERS",
                            error
                        });
                    }
                }
            )
    }
}