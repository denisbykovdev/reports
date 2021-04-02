import React, { createContext, useState } from 'react'

export const CheckedContext = createContext()

export default function CheckedProvider({children}){
    const [isChecked, setChecked] = useState(false)

    return <CheckedContext.Provider value={{
        isChecked, setChecked
    }}>
        {children}
    </CheckedContext.Provider>
}