import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';
import { areasAll, deleteArea, createArea, updateAreaProblems, updateAreaProblem } from '../constants/api';

const staticSavedAreas = [
    {
        area_name: 'testArea1',
        id: 1,
        samples: [],
        problems: [
            {
                name: 'testProblem1',
                id: 1,
                profession_name: 'testProfession1',
                details_of_eclipse: 'testDetails1',
                cost: '1',
                image: [],
                standarts: [],
                solution: 'testSolution1'
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2'
            }
        ]
    },
    {
        area_name: 'testArea2',
        id: 2,
        problems: [
            {
                name: 'testProblem3',
                id: 1,
                profession_name: 'testProfession3',
                details_of_eclipse: 'testDetails3',
                cost: '3',
                image: [],
                standarts: [],
                solution: 'testSolution3'
            },
            {
                name: 'testProblem4',
                id: 2,
                profession_name: 'testProfession4',
                details_of_eclipse: 'testDetails4',
                cost: '4',
                image: [],
                standarts: [],
                solution: 'testSolution4'
            }
        ]
    }
];

export const defectsInitial = {
    areas: [],
    savedAreas: [],
    error: null,
    notes: [],
    saveNotes: [],
    activeReport: null
};

export const defectsReducer = (
    state = defectsInitial,
    action
) => {
    switch (action.type) {
        case "CLEAR_AREAS":
            return Update({
                ...state,
                areas: []
            });
        case "ADD_DEFAULT_AREA":
            return Update({
                ...state,
                areas: [
                    ...state.areas,
                    // defaultArea
                    {
                        // id: state.areas !== null && state.areas.length > 0 ? state.areas.length + 1 : 1,
                        id: state.areas !== null
                            && state.areas.length > 0
                            && state.areas.filter(
                                area =>
                                    area.isSavedToReport === true
                            ).length > 0
                            ? state.areas.filter(
                                area =>
                                    area.isSavedToReport == true
                            ).length + 1
                            : 1,
                        area_name: "אזור",
                        problems: [],
                        samples: [],
                        isSavedToReport: true
                    }
                ]
            });
        case "ADD_DEFAULT_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(
                    area =>
                        area.id === action.areaId
                            ? {
                                ...area,
                                problems: [
                                    ...area.problems,
                                    {
                                        id: area.problems.length > 0
                                            ? area.problems.length + 1
                                            : 1,
                                        name: "ליקוי",
                                        profession_name: null,
                                        details_of_eclipse: null,
                                        cost: null,
                                        // image: null,
                                        image: [],
                                        standarts: [],
                                        isSavedToReport: true,
                                        solution: null
                                    }
                                ]
                            }
                            : area
                )
            });
        case "DELETE_AREA":
            return Update({
                ...state,
                areas: state.areas.filter(
                    area =>
                        area.id !== action.areaId
                ).map(
                    (area, i) =>
                        area.id + 1 !== i
                            ? {
                                ...area,
                                id: i + 1
                            }
                            : area
                )
            });
        case "DELETE_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(
                    area =>
                        area.id === action.areaId
                            ? {
                                ...area,
                                problems:
                                    area.problems.filter(
                                        problem =>
                                            problem.id !== action.problemId
                                    ).map(
                                        (problem, i) =>
                                            problem.id + 1 !== i
                                                ? {
                                                    ...problem,
                                                    id: i + 1
                                                }
                                                : problem
                                    )
                            }
                            : area)
            });
        case "CHANGE_AREA_VALUE":
            console.log(
                `--- CHANGE_AREA_VALUE/action:`, action
            )
            return Update({
                ...state,
                areas:

                    state.areas.map(area =>
                        area.id === action.areaId ?
                            {
                                ...area,
                                [action.areaKey]: action.areaNewValue

                            } :
                            area
                    )
            });
        case "PUSH_AREA_FROM_PRINT":
            console.log(
                `--- PUSH_AREA_FROM_PRINT/action:`,
                action,
                state.areas.length,
                `::: false:`,
                state.areas.filter(
                    area =>
                        area.isSavedToReport === false
                ).length,
                `::: true:`,
                state.areas.filter(
                    area =>
                        area.isSavedToReport === true
                ).length
            )
            return Update({
                ...state,
                areas: state.areas.map(
                    (area, index) =>
                        area.id !== action.areaId &&
                            area.isSavedToReport === true
                            ?
                            {
                                ...area,
                                id: area.id >= action.areaId
                                    ? area.id - 1
                                    : area.id
                            }
                            : area.id !== action.areaId &&
                                area.isSavedToReport === false
                                ? area
                                :
                                {
                                    ...area,
                                    isSavedToReport: false,
                                    id: state.areas.filter(
                                        area =>
                                            area.isSavedToReport === false
                                    ).length > 0
                                        ? Number(
                                            `0.${state.areas.filter(area =>
                                                area.isSavedToReport === false).length + 1}`
                                        )
                                        : 0.1
                                }
                )
            });
        case "PUSH_AREA_FOR_PRINT":
            console.log(
                `--- PUSH_AREA_FROM_PRINT/action:`,
                action,
                state.areas.length,
                `::: false:`,
                state.areas.filter(area => area.isSavedToReport === false).length,
                `::: true:`,
                state.areas.filter(area => area.isSavedToReport === true).length
            )
            return Update({
                ...state,
                areas: state.areas.map(
                    (area, index) =>
                        area.id !== action.areaId
                            && area.isSavedToReport === true
                            ? area
                            : area.id !== action.areaId
                                && area.isSavedToReport === false
                                ?
                                {
                                    ...area,
                                    id: area.id >= action.areaId
                                        ? Number((area.id - 0.1).toFixed(1))
                                        : area.id
                                }
                                :
                                {
                                    ...area,
                                    isSavedToReport: true,
                                    id: state.areas.filter(
                                        area =>
                                            area.isSavedToReport === true
                                    ).length > 0
                                        ? state.areas.filter(
                                            area =>
                                                area.isSavedToReport === true
                                        ).length + 1
                                        : 1
                                }


                )
            });
        case "CHANGE_PROBLEM_VALUE":
            return Update({
                ...state,
                areas: state.areas.map(area =>
                    area.id === action.areaId
                        ?
                        {
                            ...area,
                            problems: area.problems.map(
                                problem =>
                                    problem.id === action.problemId
                                        ? {
                                            ...problem,
                                            [action.problemKey]: action.problemNewValue
                                        }
                                        : problem)
                        }
                        :
                        area
                )
            });
        case "PUSH_FROM_PRINT":
            return Update({
                ...state,
                areas: state.areas.map(
                    (area, index) => {
                        return {
                            ...area,
                            isSavedToReport: false,
                            id: Number(`0.${index + 1}`),
                            problems: area.problems.map(problem => {
                                return {
                                    ...problem,
                                    isSavedToReport: false
                                }
                            })
                        }
                    }
                )
            });
        case "PUSH_TO_PRINT":
            return Update({
                ...state,
                areas: state.areas.map(
                    (area, index) => {
                        return {
                            ...area,
                            isSavedToReport: true,
                            id: index + 1,
                            problems: area.problems.map(
                                problem => ({
                                    ...problem,
                                    isSavedToReport: true
                                })
                            )
                        }
                    }
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
        case "FETCH_SAVED_AREAS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${areasAll}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: response.data
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        });
                    };
                }
            );
        case "ADD_REPORT_AREAS":
            return Update({
                ...state,
                areas: [
                    ...action.reportAreas.map(
                        ({
                            report_id,
                            ...rest
                        }) =>
                        ({
                            ...rest,
                            isSavedToReport: true,
                            problems: rest.problems
                                ? rest.problems
                                : [],
                            samples: rest.samples
                                ? rest.samples
                                : []
                        })
                    )
                ]
            });
        case "ADD_SERVER_AREAS":
            return Update({
                ...state,
                areas: [
                    ...state.areas,
                    ...action.serverAreas.map(
                        (
                            {
                                report_id,
                                ...rest
                            },
                            i
                        ) => ({
                            ...rest,
                            id: state.areas.length === 0
                                ? 1 + i
                                : state.areas.length + 1 + i,
                            isSavedToReport: true,
                            problems: rest.problems
                                ? rest.problems
                                : [],
                            samples: rest.samples
                                ? rest.samples
                                : []
                        })
                    )
                ]
            });
        case "UPDATE_SAVED_AREAS":
            return Update({
                ...state,
                posting: false,
                savedAreas: action.savedAreas
            });
        case "POST_NEW_AREA":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${createArea}`,
                            {
                                area_name: action.areaName,
                                problems: [],
                                samples: []
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: [
                                ...state.savedAreas,
                                response.data.data
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        })
                    }
                }
            );
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
                            `${deleteArea(action.areaName)
                            }`,
                            {
                                area_name: action.areaName
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: [
                                ...state.savedAreas.filter(
                                    saved =>
                                        saved.name === response.data.data.name
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        });
                    };
                }
            );
        case "POST_SERVER_PROBLEMS_TO_SERVER_AREA":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${updateAreaProblems(action.areaName)
                            }`,
                            {
                                // problems: [...action.problems]
                                samples: [...action.problems]
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token} `
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: [
                                ...state.savedAreas.map(
                                    saved =>
                                        saved.name === response.data.data.name
                                            ? response.data.data
                                            : saved
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        })
                    }
                }
            );
        case "UPDATE_PROBLEM_IN_SERVER_AREA":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${updateAreaProblem(action.areaName, action.problemName)} `,
                            {
                                samples: [{ ...action.areaProblem }]
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token} `
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_SAVED_AREAS",
                            savedAreas: [
                                ...state.savedAreas.map(
                                    saved =>
                                        saved.name === response.data.data.name
                                            ? response.data.data
                                            : saved
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SAVED_AREA",
                            error
                        });
                    };
                }
            );
        case "ADD_PROBLEMS_TO_ARIA":
            return Update({
                ...state,
                areas: state.areas.map(
                    area =>
                        area.id === action.areaId
                            ? {
                                ...area,
                                problems: [
                                    ...area.problems,
                                    ...action.problems.map(
                                        (problem, i) =>
                                        ({
                                            ...problem,
                                            id: area.problems.length === 0
                                                ? 1 + i
                                                : area.problems.length + 1 + i
                                        })
                                    )
                                ]
                            }
                            : area)
            });
        case "ADD_SERVER_PROBLEMS_TO_DEFAULT_ARIA":
            return Update({
                ...state,
                areas: state.areas.map(
                    area =>
                        area.id === action.areaId
                            ? {
                                ...area,
                                samples: [
                                    ...area.samples,
                                    ...action.problems.map(
                                        (problem, i) =>
                                        ({
                                            ...problem,
                                            id: area.problems.length === 0
                                                ? 1 + i
                                                : area.problems.length + 1 + i
                                        })
                                    )
                                ]
                            }
                            : area)
            });
        case "ADD_SERVER_PROBLEM_AS_DEFAULT_PROBLEM_TO_DEFAULT_ARIA":
            return Update({
                ...state,
                areas: state.areas.map(
                    area =>
                        area.id === action.areaId
                            ? {
                                ...area,
                                problems: [
                                    ...area.problems,
                                    {
                                        ...action.serverProblem,
                                        id: area.problems.length > 0
                                            ? area.problems.length + 1
                                            : 1
                                    }
                                ]
                            }
                            : area
                )
            });
        case "ADD_STANDARTS_TO_PROBLEM":
            return Update({
                ...state,
                areas: state.areas.map(
                    area => area.id === action.areaId
                        ? {
                            ...area,
                            problems: area.problems.map(
                                problem =>
                                    problem.id === action.problemId
                                        ? {
                                            ...problem,
                                            standarts: problem.standarts
                                                && problem.standarts.length >= 0
                                                ? [
                                                    ...problem.standarts,
                                                    ...action.standarts
                                                ]
                                                : [...action.standarts]
                                        }
                                        : problem
                            )
                        }
                        : area
                )
            });
        case "ADD_NEW_NOTE":
            return Update({
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: state.notes !== null
                            && state.notes.length > 0
                            ? state.notes.length + 1
                            : 1,
                        note: '',
                        isSavedToReport: false
                    }
                ]
            });
        case "ADD_SERVER_NOTES":
            return Update({
                ...state,
                notes: [...action.notes]
            });
        case "DELETE_NOTE":
            return Update({
                ...state,
                notes: state.notes.filter(
                    note =>
                        note.id !== action.noteId
                )
            });
        case "CHANGE_NOTE_VALUE":
            return Update({
                ...state,
                notes: state.notes.map(
                    note =>
                        note.id === action.noteId
                            ?
                            {
                                ...note,
                                note: action.noteNewValue
                            }
                            :
                            note
                )
            });
        case "SAVE_NOTE_TO_REPORT":
            return Update({
                ...state,
                notes: state.notes.map(
                    note => note.id === action.noteId
                        ? {
                            ...note,
                            isSavedToReport: true
                        }
                        : note
                )
            });
        case "REMOVE_NOTE_FROM_REPORT":
            return Update({
                ...state,
                notes: state.notes.map(
                    note => note.id === action.noteId
                        ? {
                            ...note,
                            isSavedToReport: false
                        }
                        : note
                )
            });
    };
};