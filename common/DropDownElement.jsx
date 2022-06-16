import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firstLevelTitles from "../constants/firstLevelTitles";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import FormSelect from "./FormSelect";
import FormField from "./FormField";

const testArray = ['לביצוע', 'נבדק']

const DropDownElement = ({
    elementKey,
    elementValue,
    elementIndex
}) => {
    return (
        <View style={styles.itemMain}>
            <View style={{
                marginHorizontal: responsiveWidth(28),
                backgroundColor: colors.whiteTwo,
                height: responsiveWidth(1),
                display: elementIndex === 0 ? 'none' : "flex"
            }}></View>
            <View style={styles.itemElementContainer}>
                <Text style={styles.darkText}>
                    {
                        firstLevelTitles[elementKey]
                            ? firstLevelTitles[elementKey]
                            : elementKey
                    }
                </Text>
                {
                    elementKey === 'status'
                        ? <FormSelect
                            placeholder="לביצוע"
                            array={testArray}
                            name="status"
                            style={{
                                width: '100%'
                            }}
                        />
                        : <FormField
                            style={styles.input}
                            name={elementKey}
                            autoCapitalize="none"
                        />
                }
                <Text style={styles.blueText}>
                    {elementValue}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    itemElementContainer: {
        // width: '100%',
        marginHorizontal: responsiveWidth(28),
        alignItems: 'flex-end'
    },
    input: {
        padding: 0,
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),
        textAlign: "right",
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray
    },
    darkText: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(18)
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
});

export default DropDownElement;