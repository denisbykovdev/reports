import React from "react"
import { StyleSheet, View } from "react-native"
import AddImage from "../icons/AddImage"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import CommonButton from "./CommonButton"
import FormField from "./FormField"
import FormImagePicker from "./FormImagePicker"
import FormRadioSelect from "./FormRadioSelect"
import FormSelect from "./FormSelect"
import ItemTitle from "./ItemTitle"

const testArray = ['one', 'two', 'three']

// const relatedDocumentsObject = {
//     mediator : "מפרט",
//     plans : "תוכניות",
//     contract : "חוזה",
// }

const relatedDocumentsArray = ['מפרט', 'תוכניות', 'חוזה']

const TestDetails = () => (
    <>

        <ItemTitle
            title="מזהה הבדיקה"
        />
        <FormField
            name="id"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="סטטוס בדיקה"
        />
        <FormSelect
            name="status"
            array={testArray}
            placeholder="בחר סטטוס"
        />

        <ItemTitle
            title="מזהה בדיקה קודמת"
        />
        <FormField
            name="previous_test_id"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="תאריך הבדיקה"
        />
        <FormField
            name="examination_date"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="שעת הבדיקה"
        />
        <FormField
            name="test_time"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="שם הלקוח"
        />
        <FormField
            name="customer_name"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="שם הבודק"
        />
        <FormField
            name="tester_name"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        {/* // - דחיפות הבדיקה : Актуальность теста / dropDownButtonTitle בחירת דחיפות : Срочность выбора */}
        <ItemTitle
            title="דחיפות הבדיקה"
        />
        <FormSelect
            name="test_relevance"
            placeholder="בחירת דחיפות"
            array={testArray}
        />

        <ItemTitle
            title="כתובת הבדיקה"
        />
        <ItemTitle
            title="עיר"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="test_address_city"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="כתובת"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="test_address"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />


        <ItemTitle
            title="כתובת למשלוח דו״ח בדואר"
        />
        <ItemTitle
            title="עיר"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="report_address_city"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="כתובת"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="report_address"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        {/* // - טלפון : phone_number  */}
        <ItemTitle
            title="טלפון"
        />
        <FormField
            name="phone_number"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        {/* // - אימייל : email */}
        <ItemTitle
            title="אימייל"
        />
        <FormField
            name="email"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        {/* // - אימייל נוסף : other email */}
        <ItemTitle
            title="אימייל נוסף"
        />
        <FormField
            name="other_email"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        {/* // - נלווה לביקור : Сопровождение визита */}
        <ItemTitle
            title="נלווה לביקור"
        />
        <FormField
            name="visit_escort"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="הסכם שנחתם בין"
        />
        <ItemTitle
            title="שמו המלא של הלקוח"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="customer_full_name"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="הצד הנגדי"
            titleStyle={{
                fontWeight: weights.thin
            }}
        />
        <FormField
            name="opposite_side"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />

        <ItemTitle
            title="לוגו של הלקוח"
        />
        <FormImagePicker 
            name="customer_logo"
        />

        {/* <CommonButton
            borderRadius={20}
            buttonHeight={responsiveWidth(33)}
            borderColor={colors.darkSkyBlue}
            style={{
                marginBottom: responsiveWidth(24),
                padding: 0,
                marginTop: responsiveWidth(10),
                marginBottom: responsiveWidth(26)
            }}
            titleStyle={{
                marginRight: 0
            }}
            title="הוסף לוגו"
            titleColor={colors.darkSkyBlue}
            onPress={pickImage}
        >
            <View
                style={{
                    position: 'absolute',
                    right: responsiveWidth(10)
                }}
            >
                <AddImage />
            </View>
        </CommonButton> */}

        {/* // - מסמכים נלווים : Связанные документы */}
        <ItemTitle
            title="מסמכים נלווים"
        />
        <FormRadioSelect
            name="noNameRadioSelect"
            array={relatedDocumentsArray}
        />

        <ItemTitle
            title="(%) מע'מ באחוזים"
        />
        <FormField
            name="vat_in_percent"
            placeholder="17"
            inputStyle={styles.input}
            style={styles.inputContainer}
        />
    </>
)

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

export default TestDetails;