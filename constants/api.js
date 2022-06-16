export const domain = `http://eitanperetz.com`
// export const domain = `https://immense-beyond-42663.herokuapp.com`

export const api = `${domain}/api`

const nodeDomain = `https://reports-server.herokuapp.com`;

//auth : POST
// export const auth = `${api}/auth/register`
export const auth = `${api}/auth/login`

// request:
// {
//     "email": string,
//     "password": string
// }
// {
//     "Accept": "application/json",
//     "Content-Type": "application/json"
// }

// example default admin object {
//     email: 'admin',
//     password: 'abc123'
// }

// response: [
// {
//     token: string
// },
// {
//     is_admin: boolean
// }
// ]

// users endpoints
// users store
export const usersStore = `${api}/users/store`

// get all users : GET
export const usersAll = `${usersStore}/all`
// request:
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: number,
//         name: string,
//         last_name: string,
//         phone: string,
//         email: string,
//         password: string
//     }
// ]

//update user object's key : POST
export const updateUser = (userId) => `${usersStore}/${userId}/update`
// request:
// {
//     key: string
//     value: string
// },
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: number,
//         name: string,
//         last_name: string,
//         phone: string,
//         email: string,
//         password: string
//     }
// ]

//delete user: POST
export const deleteUser = (userId) => `${usersStore}/${userId}/delete`
// request:
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: number,
//         name: string,
//         last_name: string,
//         phone: string,
//         email: string,
//         password: string
//     }
// ]

// add new user : POST
export const addNewUser = usersStore
// request:
// {
//         name: string,
//         last_name: string,
//         phone: string,
//         email: string,
//         password: string
// },
// {
//     headers: {
//         'Authorization': `Bearer ${action.payload}`
//     }
// }
// response: array of objects called data
// data: [
//     {
//         id: number,
//         name: string,
//         last_name: string,
//         phone: string,
//         email: string,
//         password: string
//     }
// ]
export const passChange = `${usersStore}/password/reset`

//reports endpoints
//store
export const reportsStore = `${api}/reports/store`

//use cases:
//get all reports: GET
// export const reportsAll = `${reportsStore}/all`
export const reportsAll = `${nodeDomain}/reports`
// request:
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: string,
//         status: string,
//         customerNumber: string,
//         client: string,
//         address: string,
//         date: string,
//         editorsName: string
//     }
// ]

//delete report: POST
export const deleteReport = (reportId) => `${reportsStore}/${reportId}/delete`
// request:
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: string,
//         status: string,
//         customerNumber: string,
//         client: string,
//         address: string,
//         date: string,
//         editorsName: string
//     }
// ]

//update report: POST
export const updateReport = (reportId) => `${reportsStore}/${reportId.toString()}/update`
// request:
// {
//     key: string
//     value: string
// }
// or it could be the all report object:
// {
//      key: value,
//      ...,
//      areas: Array of objects,
//      notes: Array of objects,
// },

// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }

// if the object includes one key:
// response: array of objects called data
// data: [
//     {
//         id: string,
//         status: string,
//         customerNumber: string,
//         client: string,
//         address: string,
//         date: string,
//         editorsName: string
//     }
// ]

// if the object includes the all report in response we need to get the same report object but updated on the server side yet

//create report: POST
export const createReport = reportsStore
// request:
// {
//      key: value,
//      ...,
//      areas: Array of objects,
//      notes: Array of objects,
// },
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
// data: [
//     {
//         id: string,
//         status: string,
//         customerNumber: string,
//         client: string,
//         address: string,
//         date: string,
//         editorsName: string
//     }
// ]


//areas endpoints
//store
export const areasStore = `${api}/area/store`
//use cases:

//get all areas: GET
// export const areasAll = `${areasStore}/all`
export const areasAll = `${nodeDomain}/areas`
// request:
// {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }
// response: array of objects called data
data: [
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
                image: [],
                standarts: [],
                solution: 'testSolution1',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            }
        ]
    }
]

//delete area : POST
export const deleteArea = (areaName) => `${areasStore}/${areaName}/delete`
// request:
// {
//     area_name: string
// },
// {
//     headers: {
//         'Authorization': `Bearer ${action.token}`
//     }
// }
// response:
data: [
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
                image: [],
                standarts: [],
                solution: 'testSolution1',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            }
        ]
    }
]

//update area(add problems): POST
export const updateAreaProblems = (areaName) => `${areasStore}/${areaName}/update`
// request:
// {
//     problems: Array
// },
// {
//     headers: {
//         'Authorization': `Bearer ${action.token}`
//     }
// }
// response:
data: [
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
                image: [],
                standarts: [],
                solution: 'testSolution1',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            }
        ]
    }
]

//update area(add problems): POST
export const updateAreaProblem = (areaName, problemName) => `${areasStore}/${areaName}/${problemName}/updateAreaProblem`
// request:
// {
//     area_problem: object
// },
// {
//     headers: {
//         'Authorization': `Bearer ${action.token}`
//     }
// }
// response:
data: [
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
                image: [],
                standarts: [],
                solution: 'testSolution1',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            }
        ]
    }
]

//create area: POST
export const createArea = areasStore
// request:
// {
//     area_name: string,
//     problems: array
// },
// {
//     headers: {
//         'Authorization': `Bearer ${action.token}`
//     }
// }
// response:
data: [
    {
        name: 'testArea1',//area_name
        id: 1,
        problems: [
            {
                name: 'testProblem1',//problem_name
                id: 1,
                profession_name: 'testProfession1',
                details_of_eclipse: 'testDetails1',
                cost: '1',
                image: [],
                standarts: [],
                solution: 'testSolution1',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            },
            {
                name: 'testProblem2',
                id: 2,
                profession_name: 'testProfession2',
                details_of_eclipse: 'testDetails2',
                cost: '2',
                image: [],
                standarts: [],
                solution: 'testSolution2',
                timeStamp: 'Jul 14, 2020 5:34:02 PM',
            }
        ]
    }
]

//problems endpoints
//store
export const problemsStore = `${api}/problems/store`
//use cases:
//create problem: POST
export const createProblem = problemsStore
//get all problemss: GET
// export const getAllProblems = `${problemsStore}/all`
export const getAllProblems = `${nodeDomain}/problems`
export const updateProblem = (problemName) => `${problemsStore}/${problemName}/update`

//professions endpoints
//store
export const professionsStore = `${api}/profession/store`
//use cases:
//create profession: POST
export const createProfession = professionsStore
//delete profession: POST
export const deleteProfession = (professionName) => `${professionsStore}/${professionName}/delete`
//get all professions: GET
export const getAllProfessions = `${professionsStore}/all`

//standarts endpoints
//store
export const standartsStore = `${api}/standart/store`
//use cases:
//create standart: POST
export const createStandart = standartsStore
//get all standarts: GET
// export const getAllStandarts = `${standartsStore}/all`
export const getAllStandarts = `${nodeDomain}/standarts`
export const deleteStandart = (standartId) => `${standartsStore}/${standartId}/delete`
export const updateStandart = (standartId) => `${standartsStore}/${standartId}/update`

export const printEndpoint = (reportId, endpoint) => `${api}/export_report/${reportId}/${endpoint}`

//print modal endpoints
export const byProfWithout = `by_profession_without_money`
export const byProfWith = `by_profession_with_money`
export const byAreasWith = `by_areas_with_money`
export const byAreasWithout = `by_areas_without_money`

export const editPhoto = `${api}/editPhoto`