import { getDeviceTypeAsync } from 'expo-device'
import React, { createContext, useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';

export const TypeContext = createContext()

export default function TypeProvider({
    children
}) {
    const [type, setType] = useState(1)

    useEffect(() => {
        (async function () {
            const deviceType = await getDeviceTypeAsync()
            setType(deviceType)

            if (deviceType === 1) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
            } else if (deviceType === 2) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            }
        })()
    }, [])

    return <TypeContext.Provider value={{
        type
    }}>
        {children}
    </TypeContext.Provider>
}