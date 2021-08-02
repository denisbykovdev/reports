export const sagaReportInitial = {
    reports: null,
    // active: null,
    error: null,
    posting: false
}

export const sagaReportReducer = (state = sagaReportInitial,
    action
) => {
    switch (action.type) {
        case "ADD_REPORT_OFFLINE":
            return {
                ...state,
                reports: [...state.reports, action.payload.report]
            };
        case "UPDATE_REPORT_OFFLINE":
            return {
                ...state,
                reports: state.reports.map(report => report.id !== null && report.id.toString() === action.payload.reportId.toString() ? action.payload.report : report)
            };
            console.log(
                `--- sagaReportReducer`, action
            )
        case "DELETE_REPORT_OFFLINE":
            return {
                ...state,
                reports: state.reports.map(report => report.id !== null && report.id.toString() === action.payload.reportId.toString() ? { ...report, deleted: true } : report)
            };
        case "ADD_REPORTS_OFFLINE":
            return {
                ...state,
                reports: action.payload.reports
            }

        case "GET_REPORTS_START":
            return {
                ...state,
                posting: true
            }
        case "GET_REPORTS_SUCCESS":
            return {
                ...state,
                posting: false,
                reports: action.payload.reports
            }
        case "GET_REPORTS_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }
        case "POST_REPORT_START":
            return {
                ...state,
                posting: true
            }
        case "POST_REPORT_SUCCESS":
            return {
                ...state,
                posting: false,
                reports: action.payload.reports
            }
        case "POST_REPORT_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }
        case "UPDATE_REPORT_START":
            return {
                ...state,
                posting: true
            }
        case "UPDATE_REPORT_SUCCESS":
            return {
                ...state,
                posting: false,
                reports: action.payload.reports
            }
        case "UPDATE_REPORT_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }
        case "DELETE_REPORT_START":
            return {
                ...state,
                posting: true
            }
        case "DELETE_REPORT_SUCCESS":
            return {
                ...state,
                posting: false,
                reports: action.payload.reports
            }
        case "DELETE_REPORT_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }

        case "PRINT_REPORT_START":
            return {
                ...state,
                posting: true
            }
        case "PRINT_REPORT_SUCCESS":
            return {
                ...state,
                posting: false,
                reports: action.payload.reports
            }
        case "PRINT_REPORT_FAILURE":
            return {
                ...state,
                posting: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}