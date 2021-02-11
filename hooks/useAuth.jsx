import axios from "axios";
import React, { useCallback } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';
import {useReducer} from "reinspect"

export default function useAuth(id) {
    const [authState, authDispatch] = useReducer(
        authReducer, authInitial, token, id
    )
    const { loading, token, isAdmin, error } = authState;

    // console.log(
    //     ":::useAuth/authState:", loading, token, error
    // )

    return [
        loading,
        token,
        isAdmin,
        error,
        useCallback((email, password) => {
            async function logIn() {
                console.log(
                    ":::useAuth/logIn/creds:", email, password
                )

                authDispatch({
                    type: "LOAD_TOKEN"
                })

                // var data = new FormData();
                // data.append('email', 'admin');
                // data.append('password', 'abc123');

                // var config = {
                //     method: 'post',
                //     url: "http://160.153.254.153/api/login",
                //     headers: {
                //         'Accept': 'application/json',
                //         // ...data.getHeaders()
                //     },
                //     data: data
                // };

                try {

                    // const response = await axios(config)

                    const response = await axios.post(
                        "http://160.153.254.153/api/login",
                        {
                            "email": email,
                            "password": password
                        },
                        {
                            "Accept" : "application/json",
                            "Content-Type" : "application/json"
                        }
                    )

                    // SecureStore.setItemAsync(
                    //     "userToken",
                    //     response.data.token.token
                    // )

                    authDispatch({
                        type: "SET_ADMIN",
                        payload: response.data.user.is_admin
                    })

                    authDispatch({
                        type: "SET_TOKEN",
                        payload: response.data.token.token
                    })

                    

                    // if (response.data.user.is_admin) {
                    //     authDispatch({
                    //         type: "SET_ADMIN"
                    //     })

                      

                    // } 
                    // else {
                    //     authDispatch({
                    //         type: "SET_TOKEN",
                    //         payload: response.data.token.token
                    //     })
                    // }

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