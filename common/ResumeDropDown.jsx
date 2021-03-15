import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import ResumeTitle from "../icons/ResumeTitle"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import CommonSubHeader from "./CommonSubHeader"
import FormField from "./FormField"
import Line from "./Line"
import { useFormikContext } from "formik"

const ResumeDropDown = () => {
    const [isOpen, setOpen] = useState(false)

    const [isSaved, setSaved] = useState(false)

    const {
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
    } = useFormikContext();

    const saveHandler = () => {
        setSaved(!isSaved)

        setFieldValue(
            "is_resume_template", isSaved ? 1 : 0
        )
    }
    return (
        <View>
            <Line />
            <CommonSubHeader
                title={"קורות חיים"}
            >
                <ResumeTitle />
                <TouchableOpacity
                    onPress={() => setOpen(!isOpen)}
                    style={{
                        marginStart: responsiveWidth(12)
                    }}
                >
                    {
                        isOpen
                            ? <CircleArrowUp />
                            : <CircleArrowDown />
                    }
                </TouchableOpacity>
            </CommonSubHeader>
            {
                isOpen && (
                    <>
                        <FormField
                            name="resume"
                            area={true}
                            style={{
                                minHeight: responsiveHeight(69),
                                textAlign: 'right'
                            }}
                            inputStyle={{
                                marginEnd: 0
                            }}
                            placeholder="יש למלא קורות חיים"
                        />
                        <View style={styles.radioSelect}>
                            <Text style={styles.radioSelectText}>
                                {'לשמור את קורות החיים כתבנית לכל הבדיקות'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => saveHandler()}
                                style={[styles.tickContainer, {
                                    backgroundColor: isSaved ? colors.paleGrayBg : colors.white
                                }]}
                            >
                                {
                                    isSaved && <Tick />
                                }
                            </TouchableOpacity>

                        </View>

                    </>
                )
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
        height: responsiveWidth(24),
        width: responsiveWidth(24),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: responsiveWidth(12)
    },
    radioSelectText: {
        fontSize: fonts.small,
        fontWeight: weights.regular,
        width: '75%',
        textAlign: 'right'
    }

})

export default ResumeDropDown;