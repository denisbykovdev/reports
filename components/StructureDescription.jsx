import React from "react"
import { StyleSheet, View } from "react-native"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import FormField from "../common/FormField"
import FormSelect from "../common/FormSelect"
import ItemTitle from "../common/ItemTitle"
import useType from "../hooks/useType"

const testArray = ['one', 'two', 'three']

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
                    array={testArray}
                    placeholder="בחירת טופס"
                />

                <ItemTitle
                    title="קומות"
                />
                <FormSelect
                    name="floor"
                    array={testArray}
                    placeholder="1"
                />

                <ItemTitle
                    title="קומות טכניות"
                />
                <FormSelect
                    name="technical_floor"
                    array={testArray}
                    placeholder="0"
                />

                {/* // select with title בחירת מערכת : Выбор системы */}
                <ItemTitle
                    title="מערכות שנבדקו בבניין"
                />
                <FormSelect
                    name="systems"
                    array={testArray}
                    placeholder="בחירת מערכת"
                />
                <FormField
                    name="more_systems"
                    placeholder="רשום מערכות נוספות כאן"
                    // inputStyle={styles.input}
                    style={styles.inputContainer}
                />

                <ItemTitle
                    title="כמות בניינים משותפים על אותו החניות"
                />
                <FormSelect
                    name="number_of_shared_buildings"
                    array={testArray}
                    placeholder="1"
                />
            </View>

            <View
                style={{
                    width: type === 2 ? '50%' : '100%',
                    paddingStart: type === 2 ? responsiveWidth(30) : 0
                }}
            >

                <ItemTitle
                    title="מספר מפלסי חניון תת קרקעי"
                />
                <FormSelect
                    name="parking_levels"
                    array={testArray}
                    placeholder="0"
                />

                <ItemTitle
                    title="מפלסי גג"
                />
                <FormSelect
                    name="roof_levels"
                    array={testArray}
                    placeholder="1"
                />

                <ItemTitle
                    title="מאגר עליון"
                />
                <FormSelect
                    name="upper_reservoir"
                    array={testArray}
                    placeholder="0"
                />

                <ItemTitle
                    title="מאגר תחתון"
                />
                <FormSelect
                    name="bottom_reservoir"
                    array={testArray}
                    placeholder="אין"
                />

                <ItemTitle
                    title="מערכות משותפות עם בניינים נוספים"
                />
                <FormSelect
                    name="shared_systems_with_additional_buildings"
                    array={testArray}
                    placeholder="אין"
                />

                <ItemTitle
                    title="שטחי מסחר משולבים עם המבנה הנבדק"
                />
                <FormSelect
                    name="com_areas_in_test"
                    array={testArray}
                    placeholder="אין"
                />

                <ItemTitle
                    title="בדיקת שטחי המסחר"
                />
                <FormSelect
                    name="exam_comm_areas"
                    array={testArray}
                    placeholder="אין"
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