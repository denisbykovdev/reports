import React from "react"
import { StyleSheet, View } from "react-native"
import AddImage from "../icons/AddImage"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import CommonButton from "../common/CommonButton"
import FormField from "../common/FormField"
import FormImagePicker from "../common/FormImagePicker"
import FormRadioSelect from "../common/FormRadioSelect"
import FormSelect from "../common/FormSelect"
import ItemTitle from "../common/ItemTitle"
import useType from "../hooks/useType"
import fonts from "../utils/fonts"

const testArray = ['one', 'two', 'three']

// const relatedDocumentsObject = {
//     mediator : "מפרט",
//     plans : "תוכניות",
//     contract : "חוזה",
// }

const relatedDocumentsArray = ['מפרט', 'תוכניות', 'חוזה']

const testRelevanceArray = ['גבוהה', 'בינונית', 'נמוכה']

const statusArray = ['נדרש להשלים פרטים', 'נבדק ע"י מהנדס', 'סגור', 'בתהליך']

const TestDetails = () => {
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
                    array={statusArray}
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
                    placeholder="dd . mm . yyyy"
                />

                <ItemTitle
                    title="שעת הבדיקה"
                />
                <FormField
                    name="test_time"
                    inputStyle={styles.input}
                    style={styles.inputContainer}
                    placeholder="10 : 00"
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
                    array={testRelevanceArray}
                />

                <ItemTitle
                    title="כתובת הבדיקה"
                />
                <ItemTitle
                    title="עיר"
                    titleStyle={{
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
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
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
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
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
                    }}
                />
                <FormField
                    name="report_post_address_city"
                    inputStyle={styles.input}
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
                    title="כתובת"
                    titleStyle={{
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
                    }}
                />
                <FormField
                    name="report_post_address"
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
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
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
                        fontWeight: weights.thin,
                        fontSize: fonts.xxsmall
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
                    // placeholder={}
                    name="report_related_documents"
                    array={relatedDocumentsArray}
                />

                <ItemTitle
                    title="מע'מ באחוזים (%)"
                />
                <FormField
                    name="vat_in_percent"
                    placeholder="17"
                    inputStyle={styles.input}
                    style={styles.inputContainer}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        padding: 0,
        paddingStart: responsiveWidth(18),

        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        marginBottom: responsiveWidth(24)
    }
})

export default TestDetails;