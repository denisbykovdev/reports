export const addReportOffline = (report) => ({
    type: "ADD_REPORT_OFFLINE",
    payload: {
        report
    }
})
export const updateReportOffline = (report, reportId) => ({
    type: "UPDATE_REPORT_OFFLINE",
    payload: {
        report,
        reportId
    }
})
export const deleteReportOffline = (reportId) => ({
    type: "DELETE_REPORT_OFFLINE",
    payload: {
        reportId
    }
})
export const addReportsOffline = (reports) => ({
    type: "ADD_REPORTS_OFFLINE",
    payload: {
        reports
    }
})

export const watchGetReports = (
    token,
    // isConnected
) => ({
    type: "WATCH_GET_REPORTS",
    payload: {
        token,
        // isConnected
    },
    // meta: {
    //     retry: true,
    // }
})
export const getReportsStart = () => ({
    type: "GET_REPORTS_START",
    // meta: {
    //     retry: true,
    // }
})
export const getReportsSuccess = (
    reports
) => ({
    type: "GET_REPORTS_SUCCESS",
    payload: {
        reports
    },
    // meta: {
    //     retry: true,
    // }
})
export const getReportsFailure = (error) => ({
    type: "GET_REPORTS_ERROR",
    payload: {
        error
    },
    // meta: {
    //     retry: true,
    // }
})


export const watchPostReport = (
    token,
    report,
    areas,
    notes,
    // isConnected
) => ({
    type: "WATCH_POST_REPORT",
    payload: {
        token,
        report,
        areas,
        notes,
        // isConnected
    },
    meta: {
        retry: true,
    },
})
export const postReportStart = () => ({
    type: "POST_REPORT_START",
    // meta: {
    //     retry: true,
    // }
})
export const postReportSuccess = (
    reports
) => ({
    type: "POST_REPORT_SUCCESS",
    payload: {
        reports
    },
    // meta: {
    //     retry: true,
    // }
})
export const postReportFailure = (error) => ({
    type: "POST_REPORT_ERROR",
    payload: {
        error
    },
    // meta: {
    //     retry: true,
    // }
})

export const watchUpdateReport = (
    token,
    reportId,
    report,
    areas,
    notes,

) => ({
    type: "WATCH_UPDATE_REPORT",
    payload: {
        token,
        reportId,
        report,
        areas,
        notes
    },
    meta: {
        retry: true,
    }
})
export const updateReportStart = () => ({
    type: "UPDATE_REPORT_START",
    // meta: {
    //     retry: true,
    // }
})
export const updateReportSuccess = (
    reports
) => ({
    type: "UPDATE_REPORT_SUCCESS",
    payload: {
        reports
    },
    // meta: {
    //     retry: true,
    // }
})
export const updateReportFailure = (error) => ({
    type: "UPDATE_REPORT_ERROR",
    payload: {
        error
    },
    // meta: {
    //     retry: true,
    // }
})

export const watchDeleteReport = (
    token,
    reportId
) => ({
    type: "WATCH_DELETE_REPORT",
    payload: {
        token,
        reportId
    },
    meta: {
        retry: true,
    }
})
export const deleteReportStart = () => ({
    type: "DELETE_REPORT_START",
    // meta: {
    //     retry: true,
    // }
})
export const deleteReportSuccess = (
    reports
) => ({
    type: "DELETE_REPORT_SUCCESS",
    payload: {
        reports
    },
    // meta: {
    //     retry: true,
    // }
})
export const deleteReportFailure = (error) => ({
    type: "DELETE_REPORT_ERROR",
    payload: {
        error
    },
    // meta: {
    //     retry: true,
    // }
})
