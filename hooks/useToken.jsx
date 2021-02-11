import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {useState} from "reinspect"

export default function useToken(id) {
    const [token, setToken] = useState(null, id);

    useEffect(() => {
        (async function getToken(){
            const token = await SecureStore.getItemAsync("userToken");
            setToken(token);
        })()
    }, [])

    return token;
}