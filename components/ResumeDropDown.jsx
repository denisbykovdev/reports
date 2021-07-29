import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import ResumeTitle from "../icons/ResumeTitle"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import CommonSubHeader from "../common/CommonSubHeader"
import FormField from "../common/FormField"
import Line from "../common/Line"
import { useFormikContext } from "formik"
import useResumes from "../hooks/useResumes"
import useAuth from "../hooks/useAuth"

const ResumeDropDown = () => {
    const [isOpen, setOpen] = useState(false)

    const [isSaved, setSaved] = useState(false)

    // const [resumesState, resumesDispatch] = useResumes()

    const {
        setFieldValue,
        setFieldTouched,
        values
    } = useFormikContext();

    const { authState } = useAuth()

    const { token } = authState

    const saveHandler = () => {
        setSaved(!isSaved)
        // isSaved === true &&
        //     resumesDispatch({
        //         type: "POST_NEW_RESUME",
        //         token,
        //         newResume: values.resume
        //     })
        setFieldTouched("is_resume_template")
        setFieldValue(
            "is_resume_template", !isSaved ? 1 : 0
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
                                minHeight: responsiveWidth(69),
                                textAlign: 'right',
                                marginVertical: responsiveWidth(20)
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
                                    isSaved === true && <Tick />
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