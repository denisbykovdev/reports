import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useReducer } from "reinspect";
import { usersInitial, usersReducer } from "../reducers/usersReducer";
import axios from "axios";
import useAuth from "./useAuth";
import DropDown from "../common/DropDown";

import useReducerWithSideEffects from 'use-reducer-with-side-effects';

export default function useUsers() {
    const [usersState, usersDispatch] = useReducerWithSideEffects(usersReducer, {
        users: null,
        loading: false,
        error: null,
        usersSearch: null
    });

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
