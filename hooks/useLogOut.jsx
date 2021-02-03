import React, { useReducer, useCallback } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';

export default function useLogout () {
    const [authState, authDispatch] = useReducer(
        authInitial,
        authReducer
    )
    const logOut = useCallback(() => {
        (async function delToken() {
            const avaliableStore = SecureStore.isAvailableAsync();

            if(avaliableStore)

            authDispatch({
                type: "LOAD_TOKEN"
            })

            try {
                await SecureStore.deleteItemAsync(
                    "userToken"
                );
                authDispatch({
                    type: "DEL_TOKEN",
                    payload: data.token
                });  
            }
            catch(error){
                authDispatch({
                    type: "ERROR_TOKEN",
                    payload: error
                })
            }

        }) ()
        
    }, []) 

    return [
        logOut
    ]
}