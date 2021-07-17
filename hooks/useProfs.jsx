import React, { useContext } from "react";
import { ProfsContext } from "../providers/ProfsProvider";
// import useReducerWithSideEffects from 'use-reducer-with-side-effects';
// import useAuth from "./useAuth";
// import { profsReducer, profsInitial } from '../reducers/profsReducer'

// export default function useProfs(
// ) {
//     const [profsState, profsDispatch] = useReducerWithSideEffects(
//         profsReducer,
//         profsInitial
//     );

//     const { authState } = useAuth()

//     const { token } = authState;

//     useEffect(() => {
//         console.log(
//             `--- useProfs`
//         )
//         profsDispatch({
//             type: "FETCH_PROFS",
//             payload: token
//         })
//     }, [])

//     // return [
//     //     profsState, profsDispatch
//     // ]


// }

const useProfs = () => useContext(ProfsContext)

export default useProfs