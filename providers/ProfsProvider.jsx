import React, { useEffect, useMemo } from "react";
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
// import useAuth from "./useAuth";
import { profsReducer, profsInitial } from '../reducers/profsReducer'
import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const ProfsContext = createContext()

export default function ProfsProvider({
    children
}) {
    const [profsState, profsDispatch] = useReducerWithSideEffects(
        profsReducer,
        profsInitial
    );

    const { authState } = useAuth()

    const { token } = authState;

    useEffect(() => {
        console.log(
            `--- useProfs`
        )
        profsDispatch({
            type: "FETCH_PROFS",
            payload: token
        })
    }, [])

    // return [
    //     profsState, profsDispatch
    // ]

    // const contextValue = useMemo(() => {
    //     return { profsState, profsDispatch };
    // }, [profsState, profsDispatch]);

    return <ProfsContext.Provider value={{
        profsState, profsDispatch
    }}>
        {children}
    </ProfsContext.Provider>
}