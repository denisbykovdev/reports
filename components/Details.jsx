import React from "react";
import { View } from "react-native";
import CommonSubHeader from "../common/CommonSubHeader";
import DetailsTitle from "../icons/DetailsTitle";
import { responsiveWidth } from "../utils/layout";
import TestDetails from "../common/TestDetails";
import StructureTitle from "../icons/StructureTitle";
import StructureDescription from "../common/StructureDescription";
import ResumeDropDown from "../common/ResumeDropDown";

const Details = () => {
    return (
        <View
            style={{ paddingHorizontal: responsiveWidth(28) }}
        >
                <CommonSubHeader
                    title={"פרטי הבדיקה"}
                >
                    <DetailsTitle />
                </CommonSubHeader>
                <TestDetails />

                <CommonSubHeader
                    title={"תיאור המבנה"}
                >
                    <StructureTitle />
                </CommonSubHeader>
                <StructureDescription />

                <ResumeDropDown />
        </View>
    )
}

export default Details;

const detailsTitles = {
    id: "מזהה הבדיקה",
    status: "סטטוס בדיקה",
    //status.name or id / dropDownButtonTitle : בחר סטטוס : Выберите статус
    previous_test_id: "מזהה בדיקה קודמת",
    examination_date: "תאריך הבדיקה",
    test_time: "שעת הבדיקה",
    customer_name: "שם הלקוח",
    tester_name: "שם הבודק",
    // - דחיפות הבדיקה : Актуальность теста / dropDownButtonTitle בחירת דחיפות : Срочность выбора

    // כתובת הבדיקה : Тестовый адрес
    "test_address_city": "עיר",
    "test_address": "כתובת",
    // כתובת למשלוח דו״ח בדואר : Адрес для отправки отчета по почте
    "report_address": "עיר",
    "report_address_city": "כתובת",
    // - טלפון : phone_number 
    // - אימייל : email
    // - אימייל נוסף : other email
    // - נלווה לביקור : Сопровождение визита

    // הסכם שנחתם בין : Соглашение подписано между its a title for:  
    "customer_full_name": "שמו המלא של הלקוח",
    "opposite_side": "הצד הנגדי",
    //company full name

    "customer_logo": "לוגו של הלקוח",
    //buttonTitle הוסף לוגו : Добавить логотип

    // - מסמכים נלווים : Связанные документы - it's a select with 3 items :
    // 1 מפרט : медиатор
    // 2 תוכניות : Планы its default
    // 3 חוזה : договор

    // - (%) מע"מ באחוזים : (%) НДС в процентах its input with default - 17
    "vat_in_percent": 5,



    // NEXT FORM title תיאור המבנה : Описание конструкции

    // - טופס : форма it's a radioButtonsSet with title בחירת טופס : Выберите форму

    // "is_guitar_pick": 1,
    // "is_program": 0,


    "floor": "קומות",
    //it's a select with title 1

    "technical_floor": "קומות טכניות",
    //it's a select with title 0

    // title מערכות שנבדקו בבניין : Системы протестированы в здании 
    // select with title בחירת מערכת : Выбор системы
    "more_systems": "רשום מערכות נוספות כאן",
    //it's an input with placeholder רשום מערכות נוספות כאן

    "number_of_shared_buildings": "כמות בניינים משותפים על אותו החניות",
    //it's a select with default 1

    "parking_levels": "מספר מפלסי חניון תת קרקעי",
    //select with default 0
    "roof_levels": "מפלסי גג",
    //select with default 1
    "upper_reservoir": "מאגר עליון",
    //select with default 0 but in serverData there is "no" mentioned
    "bottom_reservoir": "מאגר תחתון",
    //select with default לא : "no"
    "shared_systems_with_additional_buildings": "מערכות משותפות עם בניינים נוספים",
    //select with default "no"
    "com_areas_in_test": "שטחי מסחר משולבים עם המבנה הנבדק",
    //select with def "no"
    "exam_comm_areas": "בדיקת שטחי המסחר",
    //select with "no"

    "resume": "This description can be a template",

    // "created_at": "2021-02-03T11:16:36.000000Z",

    // buttons bottom 
    //1 עדכון : обновление with icon
    // 2 יצוא קובץ : export
}