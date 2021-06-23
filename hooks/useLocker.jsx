import React, { useCallback, useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import useType from "./useType";

export default function useLocker() {
    const { type } = useType()

    console.log("--- Router/locker/type", type)

    useEffect(
        useCallback(() => {
            async function locker() {
                try {
                    type === 1 && await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                } catch (error) { console.log("--- Router/locker/error", error) }
            }
            locker()
        }, [])

    );
}