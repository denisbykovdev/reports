import React, { useEffect, useRef, useState } from "react"
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import AvoidingView from "../common/AvoidingView"
import HeaderView from "../common/HeaderView"
import SafeView from "../common/SafeView"
import ShadowView from "../common/ShadowView"
import BottomView from "../common/BottomView"
import Reports from "../icons/Reports"
import layout, { responsiveWidth } from "../utils/layout"
import Details from "../components/Details"
import Defects from "../components/Defects"
import Resume from "../components/Resume"
import Archive from "../components/Archive"
import useMenu from "../hooks/useMenu"
import FormContainer from "../common/FormContainer"
import FormButton from "../common/FormButton"
import CommonButton from "../common/CommonButton"
import Check from "../icons/Check"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import useModal from "../hooks/useModal"
import PrintModal from "../modals/PrintModal"
import useStatusBar from "../hooks/useStatusBar"
import useType from "../hooks/useType"
import useDefects from "../hooks/useDefects"
import useAuth from "../hooks/useAuth"
import FormField from "../common/FormField"
import weights from "../utils/weights"
import useChecked from "../hooks/useChecked"
import { useFormikContext } from "formik"

const ReportScreen = ({ route }) => {

    // const { reportId } = route.params

    const formikRef = useRef({});

    useStatusBar("dark-content", colors.paleGrayBg);

    const [offsetX, setOffsetX] = useState(0)

    const [viewWidth, setViewWidth] = useState(0)

    const [printModalOpen, printModalClose, PrintModalContent] = useModal()

    const { defectsState, defectsDispatch } = useDefects()

    const { authState } = useAuth()

    const { token } = authState

    const [isNameOpen, setIsNameOpen] = useState(false)

    const [isAdressOpen, setIsAdressOpen] = useState(false)

    // const menuTitles = [
    //     {
    //         label: "פרטי הבדיקה",
    //         desc: "details"
    //     },
    //     {
    //         label: "ליקוים",
    //         desc: "defects"
    //     },
    //     {
    //         label: "סיכום",
    //         desc: "resume"
    //     },
    //     {
    //         label: "יומן עדכונים",
    //         desc: "archive"
    //     }
    // ]

    const menuTitles = [
        {
            label: "יומן עדכונים",
            desc: "archive"
        },
        {
            label: "סיכום",
            desc: "resume"
        },
        {
            label: "ליקוים",
            desc: "defects"
        },
        {
            label: "פרטי הבדיקה",
            desc: "details"
        }
    ]

    const [active, Menu] = useMenu(menuTitles, "details", scrollCatcher, layoutCatcher)

    const { type } = useType()

    const { isChecked, setChecked } = useChecked()

    const submitReport = async (values) => {
        console.log(
            "___ReportScreen/submitReport/values", values
        )

        if (defectsState.activeReport === null) {
            defectsDispatch({
                type: "POST_REPORT",
                data: values,
                token
            })
        } else {
            defectsDispatch({
                type: "REPOST_REPORT",
                data: values,
                token,
                reportId: defectsState.activeReport.id
            })
        }

        setChecked(true)
    }

    function layoutCatcher({ nativeEvent: { layout: { x, y, width, height }, target } }) {
        console.log(
            "___ReportScreen/scroll/layout:", width
        )

        setViewWidth(width)
    }

    function scrollCatcher(event) {
        console.log(
            "___ReportScreen/scroll:", event.nativeEvent.contentOffset.x
        )

        setOffsetX(event.nativeEvent.contentOffset.x)
    }

    function scrollComponent() {
        switch (true) {
            case offsetX === 0: return <Details />;
            case offsetX === viewWidth: return <Defects />;
            case offsetX === (viewWidth) * 2: return <Resume />;
            case offsetX >= (viewWidth) * 3: return <Archive />;
        }
    }

    const switchComponent = () => {
        switch (active) {
            case "details": return <Details />;
            case "defects": return <Defects />;
            case "resume": return <Resume />;
            case "archive": return <Archive />;
            default: return <Details />;
        }
    }

    return (
        <SafeView>
            <AvoidingView>
                <FormContainer
                    innerRef={formikRef}
                    initialValues={{ id: "" }}
                    onSubmit={
                        (values, { resetForm }) => submitReport(values, { resetForm })
                    }
                >
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-between'
                        }}
                    >
                        {/* <View style={{
                            flexGrow: 1,

                            justifyContent: 'space-between'
                        }}> */}

                        <HeaderView>
                            <ShadowView
                                shadowStyle={{
                                    paddingHorizontal: 0,
                                    paddingBottom: 0
                                }}
                            >

                                <View
                                    style={{
                                        justifyContent: "flex-end",
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginBottom: responsiveWidth(24),
                                        paddingHorizontal: responsiveWidth(28)
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "100%",
                                            alignItems: "flex-end"
                                        }}
                                    >

                                        <TouchableWithoutFeedback
                                            onPress={() => setIsAdressOpen(!isAdressOpen)}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setIsAdressOpen(!isAdressOpen)}
                                            >
                                                {
                                                    isAdressOpen
                                                        ? <FormField
                                                            // area={true}
                                                            placeholder={"כתובת הבדיקה"}
                                                            style={{
                                                                padding: 0,
                                                                height: responsiveWidth(31),
                                                                borderColor: colors.darkWhite,
                                                                borderWidth: responsiveWidth(2),
                                                                borderRadius: 20,
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            width="80%"
                                                            name="report_adress"

                                                        />
                                                        : <Text
                                                            style={{
                                                                color: colors.darkBlueGray,
                                                                fontSize: fonts.xlarge,
                                                                fontWeight: weights.semiBold,
                                                                textAlign: "right"
                                                            }}
                                                        >
                                                            {
                                                                formikRef.current.values && formikRef.current.values.report_adress
                                                                    ? formikRef.current.values.report_adress
                                                                    :
                                                                    "כתובת הבדיקה"
                                                            }
                                                        </Text>
                                                }
                                            </TouchableOpacity>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback
                                            onPress={() => setIsNameOpen(!isNameOpen)}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setIsNameOpen(!isNameOpen)}
                                            >
                                                {
                                                    isNameOpen
                                                        ? <FormField
                                                            // area={true}
                                                            placeholder={"שם הבדיקה "}
                                                            style={{
                                                                padding: 0,
                                                                height: responsiveWidth(31),
                                                                borderColor: colors.darkWhite,
                                                                borderWidth: responsiveWidth(2),
                                                                borderRadius: 20,
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            width="80%"
                                                            name="report_name"

                                                        />
                                                        : <Text
                                                            style={{
                                                                color: colors.blueGray,
                                                                fontSize: fonts.medium,
                                                                fontWeight: weights.regular,
                                                                textAlign: "right"
                                                            }}
                                                        >
                                                            {
                                                                formikRef.current.values && formikRef.current.values.report_name
                                                                    ? formikRef.current.values.report_name
                                                                    : "שם הבדיקה "
                                                            }
                                                        </Text>
                                                }
                                            </TouchableOpacity>
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <View style={{
                                        marginLeft: responsiveWidth(20)
                                    }}>
                                        <Reports
                                            height={responsiveWidth(46)}
                                        />
                                    </View>

                                </View>

                                <Menu />
                                {
                                    type === 2
                                        ? switchComponent()
                                        : scrollComponent()
                                }
                            </ShadowView>
                        </HeaderView>
                        <BottomView>
                            <FormButton
                                buttonShadow={true}
                                buttonColor={colors.azul}
                                buttonHeight={responsiveWidth(52)}
                                buttonWidth={type !== 2 ? "100%" : "17%"}
                                title={"עדכון"}
                                titleStyle={{
                                    marginEnd: type === 2 && isChecked ? responsiveWidth(10) : 0
                                }}
                                titleColor={colors.white}
                                style={{
                                    marginVertical: responsiveWidth(24),
                                    marginRight: type === 2 ? responsiveWidth(10) : 0,
                                }}
                                titleFontSize={fonts.large}
                                borderRadius={10}
                            >
                                <View style={{
                                    position: type === 2 ? "relative" : "absolute",
                                    right: type === 2 ? 0 : responsiveWidth(10)
                                }}>
                                    {
                                        isChecked === true && <Check />
                                    }
                                </View>

                            </FormButton>
                            <CommonButton
                                onPress={() => printModalOpen()}
                                title={"יצוא קובץ"}
                                titleColor={colors.darkSkyBlue}
                                titleFontSize={fonts.large}
                                buttonColor={colors.white}
                                buttonHeight={responsiveWidth(52)}
                                // buttonWidth={responsiveWidth(300)}
                                buttonWidth={type !== 2 ? "100%" : "17%"}
                                buttonShadow={false}
                                borderColor={colors.darkSkyBlue}
                                borderRadius={10}
                                titleStyle={{ marginEnd: 0 }}
                            />
                        </BottomView>
                        {/* </View> */}

                        <PrintModalContent>

                            <PrintModal
                                close={printModalClose}
                            />

                        </PrintModalContent>

                    </ScrollView>
                </FormContainer>
            </AvoidingView>
        </SafeView>
    )
}

export default ReportScreen;