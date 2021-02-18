import React, { createContext, useEffect } from "react";
import { useReducer } from "reinspect";
import useAuth from "../hooks/useAuth";
import { reportsInitial, reportsReducer } from "../reducers/reportsReducer";

export const ReportsStateContext = createContext();
export const ReportsDispatchContext = createContext();

export default function ReportsProvider({children}) {
  const [reportsState, reportsDispatch] = useReducer(reportsReducer, reportsInitial);

  const [authState] = useAuth();

  const {token} = authState;

  console.log("***ReportsProvider/test useAuth:", token);

  useEffect(() => {

    (async function () {

        reportsDispatch({
            type: "LOADING_REPORTS"
        })

        try {
            const response = await axios.get(
                "http://160.153.254.153/api/project/all",
                {},
                {
                    'Authorization': `Bearer ${token}`
                }
            )

            reportsDispatch({
                type: "GET_REPORTS",
                reports: response.data.reports
            })

            console.log("***ReportsProvider/GET_REPORTS:", response);

        } catch (error) {
            console.log("***ReportsProvider/ERROR_REPORTS:", error);

            reportsDispatch({
                type: "ERROR_REPORTS",
                error
            })
        }

    })()
    
  }, [])

  return (
    <ReportsDispatchContext.Provider value={reportsDispatch}>
      <ReportsStateContext.Provider value={reportsState}>
        {children}
      </ReportsStateContext.Provider>
    </ReportsDispatchContext.Provider>
  );
}