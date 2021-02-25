import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
// import {useState} from "reinspect"

export default function useSecureAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        (async function getToken(){
            const admin = await SecureStore.getItemAsync("userIsAdmin");

            console.log("*******SSisadmin:", admin)
            await setIsAdmin(admin);
        })()
    }, [])

    return isAdmin;
}
