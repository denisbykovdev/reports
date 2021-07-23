import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function useSecureToken() {
    const [secureToken, setSecureToken] = useState();

    useEffect(() => {
        (async function getToken() {
            const token = await SecureStore.getItemAsync("userToken");

            console.log(
                "--- useSecureToken/getItemAsync/token:",
                typeof token
            )

            setSecureToken(token);
        })()

    }, [])

    return secureToken;
}
