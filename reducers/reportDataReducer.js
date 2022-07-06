import axios from 'axios';
import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';

export const reportDataInitial = {
  reportData: null,
  error: null
};

export const reportDataReducer = (
  state = reportDataInitial,
  action
) => {
  switch (action.type) {
    case "GET_REPORT_DATA":
      return Update({
        ...state,
        fetching: false,
        reportData: action.reportData
      });
    case "ERROR_REPORT_DATA":
      return Update({
        ...state,
        fetching: false,
        error: action.error,
        reportData: staticReport
      });
    case "FETCH_REPORT_DATA":
      return UpdateWithSideEffect(
        {
          ...state,
          fetching: true,
          token: action.token,
          reportId: action.reportId
        },
        async (state, dispatch) => {
          // console.log(
          //     "*** reportDataReducer/FETCH_REPORT_DATA/async/id", 
          //     action.reportId 
          // );
          try {
            const response = await axios.get(
              `http://160.153.254.153/api/project/${action.reportId}`,
              {
                headers: {
                  'Authorization': `Bearer ${action.token}`
                }
              }

            );
            dispatch({
              type: "GET_REPORT_DATA",
              report: response.data.data
            });
            console.log(
              "*** reportDataReducer/GET_REPORT_DATA:",
              response.data.data, state
            );
          } catch (error) {
            dispatch({
              type: "ERROR_REPORT_DATA",
              error
            });
            console.log(
              "*** reportDataReducer/ERROR_REPORT_DATA:",
              error
            );
          };
        }
      );
  };
};