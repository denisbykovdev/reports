import React, { useEffect } from "react";
import { usersInitial, usersReducer } from "../reducers/usersReducer";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import useAuth from "./useAuth";

export default function useUsers(
) {
    const [usersState, usersDispatch] = useReducerWithSideEffects(
        usersReducer,
        usersInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    useEffect(() => {
        usersDispatch({
            type: "FETCH_USERS",
            token
        })
    }, [])

    return [
        usersState, usersDispatch
    ]
}