import React, { useEffect } from "react";
import { usersInitial, usersReducer } from "../reducers/usersReducer";
import useAuth from "./useAuth";

import useReducerWithSideEffects from 'use-reducer-with-side-effects';

export default function useUsers() {
    const [usersState, usersDispatch] = useReducerWithSideEffects(
        usersReducer, 
        usersInitial
    );

    const { authState } = useAuth();

    const { token } = authState;

    useEffect(() =>
        usersDispatch({
            type: "FETCH_USERS",
            payload: token
        })
        , [])

    return [
        usersState, usersDispatch
    ]
}
