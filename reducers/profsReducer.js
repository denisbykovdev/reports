import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const profsInitial = {
    profs: [],
    error: null,
}

const profsStatic = [

    'testProf1',

    'testProf2'

]

export const profsReducer = (
    state = profsInitial,
    action
) => {
    switch (action.type) {
        case "UPDATE_PROFS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                profs: action.profs
            })
        case "ERROR_PROFS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            })
        // case "FETCH_PROFS":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             fetching: true,
        //             token: action.token
        //         },
        //         async (state, dispatch) => {
        //             try {
        //                 const response = await axios.get(
        //                     "http://160.153.254.153/api/proffessions/all",
        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.token}`
        //                         }
        //                     }
        //                 )
        //                 dispatch({
        //                     type: "UPDATE_PROFS",
        //                     profs: response.data.data,
        //                 })
        //             } catch (error) {
        //                 dispatch({
        //                     type: "ERROR_PROFS",
        //                     error
        //                 });
        //             }
        //         }
        //     )
        case "FETCH_PROFS":
            return Update({
                ...state,
                token: action.token,
                profs: profsStatic
            })
        case "POST_NEW_PROF":
            console.log(
                "***profsReducer/POST_NEW_PROF", action.newProf
            )
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/profession/store`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                name: action.newProf
                            }
                        )
                        dispatch({
                            type: "UPDATE_PROFS",
                            profs: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_PROFS",
                            error
                        })
                    }
                }
            )

        case "DELETE_PROF":
            return Update({
                ...state,
                profs: state.profs.filter(prof => prof === action.profName)
            })
    }
}