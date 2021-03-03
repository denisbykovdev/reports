import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

const staticReport = {
    "data": {
      "id": 2,
      "form": {
        "id": 1,
        "name": "sdfasdfasdf"
      },
      "status": {
        "id": 1,
        "name": "לא סגור"
      },
      "test_speed": null,
      "system": {
        "id": 1,
        "name": "מיזוג אויר"
      },
      "previous_test_id": "150666",
      "examination_date": "2020-06-22",
      "test_time": "16:33:00",
      "customer_name": "John",
      "tester_name": "Jack",
      "test_address_city": "Jack's address city",
      "test_address": "Jack's address",
      "report_address": "Report address",
      "report_address_city": "Report address city",
      "customer_full_name": "Customers full name",
      "opposite_side": "Opposite side",
      "customer_logo": null,
      "is_guitar_pick": 1,
      "is_program": 0,
      "vat_in_percent": 5,
      "floor": 23,
      "technical_floor": 15,
      "more_systems": "More systems",
      "number_of_shared_buildings": 10,
      "parking_levels": 5,
      "roof_levels": 5,
      "upper_reservoir": "אין",
      "bottom_reservoir": "אין",
      "shared_systems_with_additional_buildings": "לא",
      "com_areas_in_test": "לא",
      "exam_comm_areas": "לא",
      "resume": "This description can be a template",
      "created_at": "2021-02-03T11:16:36.000000Z",
      "areas": [
        {
          "id": 1,
          "name": "בניין 1 - גג עליון",
          "created_at": "2021-02-03T11:16:36.000000Z",
          "problems": [
            {
              "id": 1,
              "profession": {
                "id": 1,
                "name": "asdasdasdasd"
              },
              "details_of_eclipse": "test test",
              "cost": 115.2,
              "image": "/storage/problems/1612350996.png",
              "created_at": "2021-02-03T11:16:36.000000Z"
            }
          ]
        }
      ]
    }
  }

export const reportDataInitial = {
    reportData: null,
    error: null
}


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
                    console.log(
                        "*** reportDataReducer/FETCH_REPORT_DATA/async/id", action.reportId 
                    );
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
                        })

                        console.log("*** reportDataReducer/GET_REPORT_DATA:", response.data.data, state);

                    } catch (error) {

                        dispatch({
                            type: "ERROR_REPORT_DATA",
                            error
                        });

                        console.log("*** reportDataReducer/ERROR_REPORT_DATA:", error, state);
                    }
                }
            );
    }
}