import React from "react"
import { StyleSheet, View } from "react-native"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import FormField from "../common/FormField"
import FormSelect from "../common/FormSelect"
import ItemTitle from "../common/ItemTitle"
import useType from "../hooks/useType"

const testArray = ['one', 'two', 'three']

const yesNoArray = ['לא', 'כן']

const formArray = ['מבנה משרדים', 'בית לפני קנייה', 'בדק בית שטחים משותפים']

const systemsArray = [
    'אוורור ושחרור עשן',
    'מיזוג אוויר',
    'מערכת יניקה ופינוי גזים C/O מחניונים',
    'אוויר צח CO/2',
    'ביוב ניקוז',
    'אינסטלציה',
    'שוט אשפה',
    'מערכת הסעת אשפה',
    'מערכת דחיסת אשפה',
    'הפרדת שמנים ושומנים (בעיקר במגורים משולבים עם שטחים מסחריים)',
    'בינוי וגמרים',
    'איטום וגג',
    'כללי',
    'אספקת מים בלחץ',
    'מאגרי מים',
    'הסקה מרכזית סולאריות וטרמוסולארית',
    'מערכת חשמל ח"ח',
    'מתקן חשמלי להזנת מכוניות חשמליות',
    'מערכת תאורה',
    'גנרציה וחשמל חירום',
    'לוחות חשמל',
    'גילוי אש ועשן',
    'ניהול עשן UUKL',
    'כריזה',
    'כיבוי אש בגז/אבקה',
    'מערכות ספרינקלרים והידרנטים',
    'מנדפים',
    'אוורור שירותים',
    'הגנת ברקים /הזהרת מטוסים',
    'אינטגרצית מערכות',
    'חדרי ביטחון, מ"מדים ומ"מקים',
    'בריכות שחייה',
    'בריכות נוי',
    'בטיחות והגנה מאש',
    'ביטחון ואבטחה',
    'תקשורת',
    'מיזוג אוויר מרכזי',
    'משאבות טבולות',
    'חדרי קירור'
]

const StructureDescription = () => {
    const { type } = useType()

    return (
        <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row'
        }}>
            <View style={{
                width: type === 2 ? '50%' : '100%',
                paddingEnd: type === 2 ? responsiveWidth(30) : 0
            }}>

                <ItemTitle
                    title="טופס"
                />
                <FormSelect
                    name="form"
                    array={formArray}
                    placeholder="בחירת טופס"
                />

                <ItemTitle
                    title="קומות"
                />
                {/* <FormSelect
                    name="floor"
                    array={testArray}
                    placeholder="1"
                /> */}
                <FormField
                    name="floor"
                    placeholder="1"
                    style={styles.inputContainer}
                />

                <ItemTitle
                    title="קומות טכניות"
                />
                {/* <FormSelect
                    name="technical_floor"
                    array={testArray}
                    placeholder="0"
                /> */}
                <FormField
                    name="technical_floor"
                    placeholder="0"
                    style={styles.inputContainer}
                />

                {/* // select with title בחירת מערכת : Выбор системы */}
                <ItemTitle
                    title="מערכות שנבדקו בבניין"
                />
                {/* //FormMultiSelect */}
                <FormSelect
                    multi={true}
                    name="systems"
                    array={systemsArray}
                    placeholder="בחירת מערכת"
                />
                <FormField
                    name="more_systems"
                    placeholder="רשום מערכות נוספות כאן"
                    // inputStyle={styles.input}
                    style={styles.inputContainer}
                />

                <ItemTitle
                    // title="כמות בניינים משותפים על אותו החניות"
                    title="כמות בניינים על אותו חניון"
                />
                {/* <FormSelect
                    name="number_of_shared_buildings"
                    array={testArray}
                    placeholder="1"
                /> */}
                <FormField
                    name="number_of_shared_buildings"
                    placeholder="1"
                    style={styles.inputContainer}
                />
            </View>

            <View
                style={{
                    width: type === 2 ? '50%' : '100%',
                    paddingStart: type === 2 ? responsiveWidth(30) : 0
                }}
            >

                <ItemTitle
                    // title="מספר מפלסי חניון תת קרקעי"
                    title="מספר מפלסי חניון"
                />
                {/* <FormSelect
                    name="parking_levels"
                    array={testArray}
                    placeholder="0"
                /> */}
                <FormField
                    name="parking_levels"
                    placeholder="0"
                    style={styles.inputContainer}
                />

                <ItemTitle
                    // title="מפלסי גג"
                    title="מספר מפלסי גג"
                />
                {/* <FormSelect
                    name="roof_levels"
                    array={testArray}
                    placeholder="1"
                /> */}
                <FormField
                    name="roof_levels"
                    placeholder="1"
                    style={styles.inputContainer}
                />

                <ItemTitle
                    title="מאגר עליון"
                />
                {/* <FormSelect
                    name="upper_reservoir"
                    array={testArray}
                    placeholder="0"
                /> */}
                <FormField
                    name="upper_reservoir"
                    placeholder="0"
                    style={styles.inputContainer}
                />

                <ItemTitle
                    title="מאגר תחתון"
                />
                <FormSelect
                    name="bottom_reservoir"
                    array={yesNoArray}
                    placeholder="לא"
                />

                <ItemTitle
                    title="מערכות משותפות עם בניינים נוספים"
                />
                <FormSelect
                    name="shared_systems_with_additional_buildings"
                    array={yesNoArray}
                    placeholder="לא"
                />

                <ItemTitle
                    title="שטחי מסחר משולבים עם המבנה הנבדק"
                />
                <FormSelect
                    name="com_areas_in_test"
                    array={yesNoArray}
                    placeholder="לא"
                />

                <ItemTitle
                    title="בדיקת שטחי המסחר"
                />
                <FormSelect
                    name="exam_comm_areas"
                    array={yesNoArray}
                    placeholder="לא"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        marginBottom: responsiveWidth(24)
    }
})

export default StructureDescription;