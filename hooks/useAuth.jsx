import axios from "axios";
import React, { useReducer, useCallback } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';

export default function useAuth() {
    const [authState, authDispatch] = useReducer(
        authReducer, authInitial
    )
    const { loading, token, error } = authState;

    console.log(
        ":::useAuth/authState:", loading, token, error
    )

    return [
        loading,
        token,
        error,
        useCallback((email, password) => {
            async function logIn() {
                console.log(
                    ":::useAuth/logIn/creds:", email, password
                )

                authDispatch({
                    type: "LOAD_TOKEN"
                })

                var data = new FormData();
                data.append('email', 'admin');
                data.append('password', 'abc123');

                var config = {
                    method: 'post',
                    url: 'http://160.153.254.153/api/login',
                    headers: {
                        'Accept': 'application/json',
                        // ...data.getHeaders()
                    },
                    data: data
                };

                try {
                    const response = await axios(config)
                    console.log(JSON.stringify(response.data));

                    authDispatch({
                        type: "SET_TOKEN",
                        payload: response.data
                    })

                } catch (error) {
                    console.log(error);
                    
                    authDispatch({
                        type: "ERROR_TOKEN",
                        payload: error
                    })
                }

            }
            logIn()
        }, [])
    ]
}