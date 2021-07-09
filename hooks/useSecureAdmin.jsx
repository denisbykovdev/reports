import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function useSecureAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        (async function getToken() {
            const admin = await SecureStore.getItemAsync("userIsAdmin");

            console.log(
                "--- useSecureAdmin/getItemAsync/JSON.parse(admin):",
                JSON.parse(admin),
            )

            setIsAdmin(JSON.parse(admin));
        })()
    }, [])

    return isAdmin;
}
