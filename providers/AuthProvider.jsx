import axios from "axios";
import React, { useCallback } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';
import { useReducer } from "reinspect"
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authState, authDispatch] = useReducer(
        authReducer, authInitial
    )

    console.log(
        "***AuthProvider/authState:", authState
    )

    const logIn = useCallback((email, password) => {

        (async function () {

            console.log(
                ":::useAuth/logIn/creds:", email, password
            )

            authDispatch({
                type: "LOAD_TOKEN"
            })

            console.log(
                "***AuthProvider/LOAD_TOKEN", authState
            )

            try {
                const response = await axios.post(
                    "http://160.153.254.153/api/login",
                    {
                        "email": email,
                        "password": password
                    },
                    {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                )

                authDispatch({
                    type: "SET_TOKEN",
                    token: response.data.token.token,
                    isAdmin: response.data.user.is_admin
                })

                console.log(
                    "***AuthProvider/SET_TOKEN", authState
                )

                await SecureStore.setItemAsync(
                    "userToken",
                    response.data.token.token
                )

            } catch (error) {
                console.log(error);

                authDispatch({
                    type: "ERROR_TOKEN",
                    payload: error
                })
            }

        })()
        
    }, [])



    return (
        <AuthContext.Provider value={{authState, logIn}}>
            {children}
        </AuthContext.Provider>
    )
}