import { setNestedObjectValues } from "formik"

export const domain = `http://eitanperetz.com`
export const api = `${domain}/api`

//auth : POST
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

// default admin object {
//     email: 'admin',
//     password: 'abc123'
// }

// response: two objectcs:
// {
//     token: string
// },
// {
//     is_admin: boolean
// }

// users endpoints
// users store
export const usersStore = `${api}/users/store`

// get all users : GET
export const usersAll = `${api}/users/all`
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
export const updateUser = (userId) => `${usersStore}/${userId}`
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
//     new_user: action.user
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

//reports endpoints
//store
export const reportsStore = `${api}/reports/store/`

//use cases:
//get all reports: GET
export const reportsAll = `${api}/reports/all/`
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
export const updateReport = (reportId) => `${reportsStore}${reportId}`
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
export const areasStore = `eitanperetz.com/api/areas/store/`
//use cases:
//create area: POST
export const createArea = areasStore
//update area(add problems): POST
export const updateArea = (areaId) => `${areasStore}${areaId}/problems/`
//delete area : POST
export const deleteArea = (areaId) => `${areasStore}${areaId}/delete`
//get all areas: GET
export const getAllAreas = `eitanperetz.com/api/areas/all/`

//problems endpoints
//store
export const problemsStore = `eitanperetz.com/api/problems/store/`
//use cases:
//create problem: POST
export const createProblem = problemsStore
//get all problemss: GET
export const getAllProblems = `eitanperetz.com/api/problems/all/`

//professions endpoints
//store
export const professionsStore = `eitanperetz.com/api/professions/store/`
//use cases:
//create profession: POST
export const createProfession = professionsStore
//delete profession: POST
export const deleteProfession = (professionName) => `${professionsStore}${professionName}`
//get all professions: GET
export const getAllProfessions = `eitanperetz.com/api/professions/all/`

//standarts endpoints
//store
export const standartsStore = `eitanperetz.com/api/standarts/store/`
//use cases:
//create standart: POST
export const createStandart = standartsStore
//get all standarts: GET
export const getAllStandarts = `eitanperetz.com/api/standarts/all/`

//notes endpoints
//store
export const notesStore = `${api}notes/store/`
//create note
export const createNote = notesStore
//delete note by text
export const deleteNote = (noteText) => `${notesStore}${noteText}/delete`

//print modal endpoints
export const withProfRegion = `withProfRegion/`
export const withProf = `withProf/`
export const withExpenses = `withExpenses/`
export const withFree = `withFree/`
export const withPdf = `withPdf/`
export const withWord = `withWord/`
