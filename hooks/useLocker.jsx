import React, { useCallback, useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import useType from "./useType";

export default function useLocker() {
    const { type } = useType()

    // useEffect(
    //     // useCallback(() => {
    //     async function locker() {
    //         try {
    //             if (await type === 1) await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    //         } catch (error) { console.log("--- useLocker/error", error) }
    //     }

    //      locker()
    //     // }, [])

    // );

    useEffect(() => {
        async function locker() {
            try {
                console.log("--- useLocker/type", type)

                if (type === 1) {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                } else if (type === 2) {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                }
            } catch (error) { console.log("--- useLocker/error", error) }
        }

        locker()
    }, [])
}