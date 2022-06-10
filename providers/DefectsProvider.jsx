import React, { createContext, useCallback, useMemo } from "react"
import { State } from "react-native-gesture-handler"
import useReducerWithSideEffects from 'use-reducer-with-side-effects'
import useAuth from "../hooks/useAuth"
import {defectsReducer, defectsInitial} from "../reducers/defectsReducer"

export const DefectsContext = createContext()

export default function DefectsProvider({children}) {
    const [defectsState, defectsDispatch] = useReducerWithSideEffects(
        defectsReducer,
        defectsInitial
    )

    return <DefectsContext.Provider 
        value={{
            defectsState,
            defectsDispatch
        }}
    >
        {children}
    </DefectsContext.Provider>
}