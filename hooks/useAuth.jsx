import axios from "axios";
import React, { useLayoutEffect, useReducer } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';
import { useCallback } from "react/cjs/react.production.min";

export default function useAuth () {
    const [authState, authDispatch] = useReducer(
        authInitial,
        authReducer
    )

    const logIn = useCallback(() => {
        (async function setToken(userEmail, userPassword) {
            const avaliableStore = SecureStore.isAvailableAsync();

            if(avaliableStore)

            authDispatch({
                type: "LOAD_TOKEN"
            })

            try {
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");

                const formData = new FormData();
                formData.append("email", userEmail);
                formdata.append("password", userPassword);

                const data = await axios.post(
                    '{{BASE_URL_REPORTS}}/api/login', 
                    formData, 
                    myHeaders
                );

                authDispatch({
                    type: "SET_TOKEN",
                    payload: data.token
                })

                await SecureStore.setItemAsync(
                    "userToken",
                    data.token
                )
            }
            catch(error){
                authDispatch({
                    type: "ERROR_TOKEN",
                    payload: error
                })
            }

        })()

    }, [])

    return [
        authState.loading,
        authState.token,
        authState.error, 
        logIn
    ]
}