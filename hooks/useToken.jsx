import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
// import {useState} from "reinspect"

export default function useToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async function getToken(){
            const token = await SecureStore.getItemAsync("userToken");
            setToken(token);
        })()
    }, [])

    return token;
}