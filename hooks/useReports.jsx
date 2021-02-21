import React, { useEffect } from "react";
import { useReducer } from "reinspect";
import { reportsInitial, reportsReducer } from "../reducers/reportsReducer";
import axios from "axios";

export default function useReports({token}) {
  const [reportsState, reportsDispatch] = useReducer(reportsReducer, reportsInitial);

  useEffect(() => {

    (async function () {

        reportsDispatch({
            type: "LOADING_REPORTS"
        })

        console.log("***useReports/LOADING_REPORTS:", `Bearer ${token}`);

        try {
            const response = await axios.get(
                "http://160.153.254.153/api/project/all",

                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
             
            )

            reportsDispatch({
                type: "GET_REPORTS",
                reports: response.data.reports
            })

            console.log("***useReports/GET_REPORTS:", response.data);

        } catch (error) {
            console.log("***useReports/ERROR_REPORTS:", error);

            reportsDispatch({
                type: "ERROR_REPORTS",
                error
            })
        }

    })()
    
  }, [])

  return [
    reportsState, reportsDispatch
  ]
}
