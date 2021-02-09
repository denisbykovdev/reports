import React, { useReducer, useCallback } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

export default function useLogout () {
    const [authState, authDispatch] = useReducer(
        authReducer, authInitial
    )
    
    const navigation = useNavigation();

    const logOut = useCallback(() => {
        (async function delToken() {
            const avaliableStore = await SecureStore.isAvailableAsync();

            if(avaliableStore)

            authDispatch({
                type: "LOAD_TOKEN"
            })

            try {
                await SecureStore.deleteItemAsync(
                    "userToken"
                );
                authDispatch({
                    type: "DEL_TOKEN"
                });
                navigation.navigate("AuthStack")  
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