import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useEffect } from "react/cjs/react.development"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import { useFormikContext } from "formik"
import useChecked from "../hooks/useChecked"

const FormRadioSelect = ({ name, array }) => {

    const {
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
    } = useFormikContext();

    const {isChecked, setChecked} = useChecked()

    // useEffect(() => {
    //     setFieldValue(name, array[0])
    // }, [])

//maybe with callback within array in deps
    const radioSelectHandler = (radioValue) => {
        setFieldTouched(name)
        setFieldValue(name, radioValue)
        isChecked && setChecked(false)
    }

    return (
        <View>
            {
                array && array.map((element, i) =>
                (
                    <View
                        key={i}
                        style={styles.radioSelectsContaner}
                    >
                        <View
                            style={styles.radioSelect}
                        >
                            <Text style={styles.radioSelectText}>
                                {element}
                            </Text>
                            <TouchableOpacity
                                onPress={() => radioSelectHandler(element)}
                                style={[styles.tickContainer, {
                                    backgroundColor: values[name] === element ? colors.paleGrayBg : colors.white
                                }]}
                            >
                                {
                                    values[name] === element && <Tick />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    radioSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: responsiveWidth(26)
    },
    tickContainer: {
        height: responsiveWidth(26),
        width: responsiveWidth(26),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: responsiveWidth(12)
    },
    radioSelectText: {
        fontSize: fonts.small,
        fontWeight: weights.regular
    }

})

export default FormRadioSelect;
