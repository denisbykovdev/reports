import React, { createContext, useEffect } from "react";
import { usersInitial, usersReducer } from "../reducers/usersReducer";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import useSecureToken from "../hooks/useSecureToken";
import useAuth from "../hooks/useAuth";

export const UsersStateContext = createContext({})
export const UsersDispatchContext = createContext({})

export default function UsersProvider({children}) {
    const [usersState, usersDispatch] = useReducerWithSideEffects(
        usersReducer, 
        usersInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    // const token = useSecureToken();

   

    useEffect(() => {
        console.log(
            "---UsersProvider/token", token
        )
        usersDispatch({
            type: "FETCH_USERS",
            payload: token
        })
    }, [])

    return (
        <UsersStateContext.Provider value={usersState}>
            <UsersDispatchContext.Provider value={usersDispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}