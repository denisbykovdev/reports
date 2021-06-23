import { getDeviceTypeAsync } from 'expo-device'
import React, { createContext, useEffect, useState } from 'react'

export const TypeContext = createContext()

export default function TypeProvider({
    children
}) {
    const [type, setType] = useState(1)

    useEffect(() => {
        (async function () {
            const deviceType = await getDeviceTypeAsync()
            setType(deviceType)
        })()
    }, [])

    return <TypeContext.Provider value={{
        type
    }}>
        {children}
    </TypeContext.Provider>
}