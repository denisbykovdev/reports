export const reportsInitial = {
    reports: null,
    loading: false,
    error: null,
    reportsSearch: null
}

export const reportsReducer = (
    state = reportsInitial,
    action
) => {
    switch (action.type) {
        case "LOADING_REPORTS":
            return {
                ...state,
                loading: true
            };
        case "GET_REPORTS":
            return {
                ...state,
                loading: false,
                reports: action.reports,
                reportsSearch: action.reports
            }
        case "ERROR_REPORTS":
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case "DELETE_REPORT":
            return {
                ...state,
                reportsSearch: state.reports.filter(report => report !== action.reportName)
            };
        case "CHANGE_REPORT_VALUE":
            return {
                ...state,
                reportsSearch: state.reportsSearch.map(report =>
                    report.name === action.reportName ?
                        {
                            ...report,
                            [action.reportKey]: action.reportKeyValue
                        } :
                        report
                )
            };
        case "RESET_REPORTS_SEARCH":
            return {
                ...state,
                reportsSearch: state.reports
            };
    }
}