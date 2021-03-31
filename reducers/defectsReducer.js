import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

const staticSavedAreas = [
    {
        name: 'testArea1',
        id: 1,
        problems: [
            {
                name: 'testProblem1',
                id: 1,
                profession_name: 'testProfession1',
                details_of_eclipse: 'testDetails1',
                cost: '1',
                image: 'test',
                solution: 'testSolution1'
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: 'test',
                solution: 'testSolution2'
            }
        ]
    },
    {
        name: 'testArea2',
        id: 2,
        problems: [
            {
                name: 'testProblem3',
                id: 1,
                profession_name: 'testProfession3',
                details_of_eclipse: 'testDetails3',
                cost: '3',
                image: '',
                solution: 'testSolution3'
            },
            {
                name: 'testProblem4',
                id: 2,
                profession_name: 'testProfession4',
                details_of_eclipse: 'testDetails4',
                cost: '4',
                image: '',
                solution: 'testSolution4'
            }
        ]
    }
]

export const defectsInitial = {
    areas: [],
    savedAreas: null,
    error: null,

    notes: [],
    saveNotes: []
}

export const defectsReducer = (
    state = defectsInitial,
    action
) => {

    switch (action.type) {

        case "ADD_DEFAULT_AREA":
            return Update({
                ...state,
                areas: [
                    ...state.areas,
                    // defaultArea
                    {
                        id: state.areas !== null && state.areas.length > 0 ? state.areas.length + 1 : 1,
                        name: "אזור",
                        problems: []
                    }
                ]
            });

        case "ADD_DEFAULT_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(area => area.id === action.areaId ? {
                    ...area,
                    problems: [
                        ...area.problems,

                        {
                            id: area.problems.length > 0 ? area.problems.length + 1 : 1,
                            name: "ליקוי",
                            profession_name: null,
                            details_of_eclipse: null,
                            cost: null,
                            image: null,
                        }
                    ]
                } : area
                )
            });

        case "DELETE_AREA":
            return Update({
                ...state,
                areas: state.areas.filter(area => area.id !== action.areaId)
            });

        case "DELETE_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(area => area.id === action.areaId ? {
                    ...area,
                    problems: area.problems.filter(problem => problem.id === action.problemId)
                } : area)
            });

        case "CHANGE_AREA_VALUE":
            return Update({
                ...state,
                areas: state.areas.map(area =>
                    area.id === action.areaId ?
                        {
                            ...area,
                            [action.areaKey]: action.areaNewValue
                        } :
                        area
                )
            });

        case "CHANGE_PROBLEM_VALUE":
            console.log(
                "***defectsReducer/intersepter callback(prevState):", state
            )
            return Update({
                ...state,
                areas: state.areas.map(area =>
                    area.id === action.areaId ?
                        {
                            ...area,
                            problems: area.problems.map(problem => problem.id === action.problemId ? {
                                ...problem,
                                [action.problemKey]: action.problemNewValue
                            } : problem)
                        } :
                        area
                )
            });

        case "GET_SAVED_AREA":
            return Update({
                ...state,
                fetching: false,
                savedAreas: action.savedAreas
            });

        case "ERROR_SAVED_AREA":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            });

        // case "FETCH_SAVED_AREAS":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             fetching: true,
        //             token: action.token,
        //             // savedAreas: staticSavedAreas
        //         },
        //         async(state, dispatch) => {
        //             try {
        //                 const response = await axios.get(
        //                     `http://160.153.254.153/api/area/`,

        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.token}`
        //                         }
        //                     }

        //                 );

        //                 dispatch({
        //                     type: "GET_SAVED_AREA",
        //                     savedAreas: response.data.data
        //                 })
        //             } catch(error) {
        //                 dispatch({
        //                     type: "ERROR_SAVED_AREA",
        //                     error
        //                 })
        //             }
        //         }
        //     );

        case "FETCH_SAVED_AREAS":
            return Update({
                ...state,
                token: action.token,
                savedAreas: staticSavedAreas
            })

        case "ADD_SAVED_AREAS":
            console.log(
                "*** defectsReducer/ADD_SAVED_AREAS", action.saved
            )
            return Update({
                ...state,
                areas: [
                    ...state.areas,

                    ...action.saved.map((area, i) => {
                        console.log(
                            "*** defectsReducer/test",
                            area
                        )

                        return {
                            ...area,
                            id: state.areas.length === 0 ? 1 + i : state.areas.length + 1 + i,
                            problems: area.problems && area.problems.map(problem =>
                                !problem.flagged
                                    ? {
                                        ...problem,
                                        flagged: true
                                    }
                                    : area
                            )
                        }

                    })
                ]
            });

        case "UPDATE_SAVED_AREAS":
            return Update({
                ...state,
                posting: false,
                savedAreas: action.updatedSavedAreas
            })

        case "POST_SAVED_AREA_TO_DELETE":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/area/store/${action.areaName}`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                area_name: action.areaName
                            }

                        );

                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        })
                    }
                }
            );

        case "POST_PROBLEMS_TO_SAVED_AREA":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/area/store/${action.areaName}`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                area_name: action.areaName,
                                problems: action.areaProblems
                            }
                        );

                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        })
                    }
                }
            )

        case "ADD_PROBLEMS_TO_ARIA":
            return Update({
                ...state,
                areas: state.areas.map(area => area.id === action.areaId ? {
                    ...area,
                    problems: [
                        ...area.problems,

                        ...action.problems.map((problem, i) => {
                            console.log(
                                "*** defectsReducer/test",
                                problem
                            )

                            return {
                                ...problem,
                                id: area.problems.length === 0 ? 1 + i : area.problems.length + 1 + i,
                                flagged: true
                            }

                        })
                    ]
                } : area)
            })

        case "ADD_STANDARTS_TO_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(
                    area => area.id === action.areaId
                        ? {
                            ...area,
                            problems: area.problems.map(
                                problem => problem.id === action.problemId
                                    ? {
                                        ...problem,
                                        standarts: problem.standarts && problem.standarts.length > 0 ? [
                                            ...problem.standarts,
                                            action.standarts
                                        ] : [...action.standarts]
                                    }
                                    : problem
                            )
                        }
                        : area
                )
            })

        case "ADD_NEW_NOTE":
            return Update({
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: state.notes !== null && state.notes.length > 0 ? state.notes.length + 1 : 1,
                        note: ''
                    }
                ]
            })

        case "DELETE_NOTE":
            return Update({
                ...state,
                notes: state.notes.filter(note => note.id !== action.noteId)
            })

        case "ADD_NOTE_TO_SAVENOTES":
            console.log(
                "***defectsDispatch/ADD_NOTE_TO_SAVENOTES/action:", action.saveNote
            )
            return Update({
                ...state,
                saveNotes: [...state.saveNotes, action.saveNote]
            })

        case "DELETE_NOTE_FROM_SAVENOTES":
            console.log(
                "***defectsDispatch/DELETE_NOTE_FROM_SAVENOTES", action.saveNoteId
            )
            return Update({
                ...state,
                saveNotes: state.saveNotes.filter(note => note.id === action.saveNoteId)
            })

        case "POST_REPORT":
            return UpdateWithSideEffect({
                ...state,
                posting: true,
                token: action.token
            },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/area/store/${action.areaName}`,

                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                area_name: action.areaName,
                                problems: action.areaProblems
                            }
                        );

                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        })
                    }
                }
            )
    }
}