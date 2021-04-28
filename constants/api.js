export const domain = `eitanperetz.com`
export const api = `eitanperetz.com/api/`

export const auth = `eitanperetz.com/api/auth`

//users endpoints
//users store
export const usersStore = `${api}users/store/`
//update user info node : POST
export const updateUser  = (userId) => `${usersStore}${userId}`
//delete user: POST
export const deleteUser = (userId) => `${usersStore}${userId}/delete`
//get all users
export const usersAll = `${api}users/all`

//reports endpoints
//store
export const reportsStore = `eitanperetz.com/api/reports/store/`
//use cases:
//create report: POST
export const createReport = reportsStore
//update report: POST
export const updateReport = (reportId) => `${reportsStore}${reportId}`
//get all reports: GET
export const getAllReports = `eitanperetz.com/api/reports/all/`

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
export const withProfRegion = `withProfRegion`
export const withProf = `withProf`
export const withExpenses = `withExpenses`
export const withFree = `withFree`
export const withPdf = `withPdf`
export const withWord = `withWord`
