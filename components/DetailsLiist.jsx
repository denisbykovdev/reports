import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonSubHeader from "../common/CommonSubHeader";
import DetailsTitle from "../icons/DetailsTitle";
import { responsiveHeight } from "../utils/layout";

const detailsTitles = {
    id: "מזהה הבדיקה",
    status: "סטטוס בדיקה", //status.name or id
    previous_test_id: "מזהה בדיקה קודמת",
    examination_date: "תאריך הבדיקה",
    test_time: "שעת הבדיקה",
    customer_name: "שם הלקוח",
    tester_name: "שם הבודק",
    "test_address_city": "עיר",
    "test_address": "כתובת",
    "report_address": "עיר",
    "report_address_city": "כתובת",
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
}

const DetailsList = ({details}) => {
    console.log(
        "___DetailsList/props:", details
    )
    return (
        <View>
            <CommonSubHeader 
                title={"פרטי הבדיקה"}
            >
                <DetailsTitle />
            </CommonSubHeader>
            
        </View>
    )
}

export default DetailsList;