import React, { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import AvoidingView from "../common/AvoidingView"
import CommonHeader from "../common/CommonHeader"
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
import { loginSchema } from "../constants/validationSchema"
import DefectsProvider from "../providers/DefectsProvider"
import { DeviceType } from 'expo-device'
import useType from "../hooks/useType"
import useDefects from "../hooks/useDefects"
import useAuth from "../hooks/useAuth"
import FormField from "../common/FormField"
import weights from "../utils/weights"

const ReportScreen = ({ route }) => {

    // const { reportId } = route.params

    useStatusBar("dark-content", colors.paleGrayBg);

    const [offsetX, setOffsetX] = useState(0)

    const [viewWidth, setViewWidth] = useState(0)

    const [printModalOpen, printModalClose, PrintModalContent] = useModal()

    const { defectsState, defectsDispatch } = useDefects()

    const { authState } = useAuth()

    const { token } = authState

    const [isNameOpen, setIsNameOpen] = useState(false)

    const [isAdressOpen, setIsAdressOpen] = useState(false)

    const menuTitles = [
        {
            label: "פרטי הבדיקה",
            desc: "details"
        },
        {
            label: "ליקוים",
            desc: "defects"
        },
        {
            label: "סיכום",
            desc: "resume"
        },
        {
            label: "יומן עדכונים",
            desc: "archive"
        }
    ]

    const [active, Menu] = useMenu(menuTitles, "details", scrollCatcher, layoutCatcher)

    const { type } = useType()

    useEffect(() => {
        console.log(
            "___ReportScreen/activeReport", defectsState.activeReport
        );
    }, [defectsState.activeReport])

    const submitReport = async (values, { resetForm }) => {
        console.log(
            "___ReportScreen/submitReport/values", values
        )

        defectsDispatch({
            type: "POST_REPORT",
            data: values,
            token
        })
    }

    function layoutCatcher({ nativeEvent: { layout: { x, y, width, height }, target } }) {
        // console.log(
        //     "___ReportScreen/scroll/layout:", x, width,
        // )

        setViewWidth(width)
    }

    function scrollCatcher(event) {
        // console.log(
        //     "___ReportScreen/scroll:", event.nativeEvent.contentOffset.x
        // )

        setOffsetX(event.nativeEvent.contentOffset.x)
    }

    function scrollComponent() {
        switch (offsetX) {
            case 0: return <Details />;
            case viewWidth: return <Defects />;
            case viewWidth * 2: return <Resume />;
            case viewWidth * 3: return <Archive />;
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
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                >
                    <FormContainer
                        initialValues={{ id: "" }}
                        onSubmit={
                            (values, { resetForm }) => submitReport(values, { resetForm })
                        }
                    // validationSchema={loginSchema}
                    >
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
                                                        // interSepter={interSepter}
                                                        />
                                                        : <Text
                                                            style={{
                                                                color: colors.darkBlueGray,
                                                                fontSize: fonts.xlarge,
                                                                fontWeight: weights.semiBold,
                                                                textAlign: "right"
                                                            }}
                                                        >
                                                            {"כתובת הבדיקה"}
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
                                                        // interSepter={interSepter}
                                                        />
                                                        : <Text
                                                            style={{
                                                                color: colors.blueGray,
                                                                fontSize: fonts.medium,
                                                                fontWeight: weights.regular,
                                                                textAlign: "right"
                                                            }}
                                                        >
                                                            {"שם הבדיקה "}
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
                                buttonWidth={layout.width < 600 ? "100%" : "37.5%"}
                                title={"עדכון"}
                                titleStyle={{ marginEnd: 0 }}
                                titleColor={colors.white}
                                style={{
                                    marginVertical: responsiveWidth(24),
                                    marginRight: type === 2 ? responsiveWidth(10) : 0,
                                }}
                                titleFontSize={fonts.large}
                                borderRadius={10}
                            >
                                <View style={{
                                    position: "absolute",
                                    right: responsiveWidth(10)
                                }}>
                                    <Check />
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
                                buttonWidth={layout.width < 600 ? "100%" : "37.5%"}
                                buttonShadow={false}
                                borderColor={colors.darkSkyBlue}
                                borderRadius={10}
                                titleStyle={{ marginEnd: 0 }}
                            />
                        </BottomView>
                        <PrintModalContent>

                            <PrintModal
                                close={printModalClose}
                            />

                        </PrintModalContent>
                    </FormContainer>
                </ScrollView>
            </AvoidingView>
        </SafeView>
    )
}

export default ReportScreen;