import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function useToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async function getToken(){
            const token = await SecureStore.getItemAsync("userToken");
            await setToken(token);
        })()
    }, [])

    return token;
}