import React, { useState } from "react"
import { ScrollView, View } from "react-native"
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
import PrintModal from "../common/PrintModal"
import useStatusBar from "../hooks/useStatusBar"
import { loginSchema } from "../constants/validationSchema"

const ReportScreen = ({ route }) => {
    // const { reportId } = route.params
    useStatusBar("dark-content", colors.paleGrayBg);

    const [offsetX, setOffsetX] = useState(0)

    const [printModalOpen, printModalClose, PrintModalContent] = useModal();

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

    const [active, Menu] = useMenu(menuTitles, "details", scrollCatcher)

    function activeComponent() {
        switch (active) {
            case "details": return <Details />;
            case "defects": return <Defects />;
            case "resume": return <Resume />;
            case "archive": return <Archive />;
            default: return <Details />;
        }
    }

    const submitReport = async (values, { resetForm }) => {
        console.log(
            "___ReportScreen/submitReport/values", values
        )
    }

    function scrollCatcher(event) {
        console.log(
            "___ReportScreen/scroll:", event.nativeEvent.contentOffset.x 
        )

        setOffsetX(event.nativeEvent.contentOffset.x)
    }

    function scrollComponent() {
        switch (offsetX) {
            case 0: return <Details />;
            case 264: return <Defects />;
            case 528: return <Resume />;
            case 792: return <Archive />;
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
                                    paddingHorizontal: 0
                                }}
                            >
                                <CommonHeader
                                    closeButton={false}
                                    title={
                                        "Clarification needed"
                                    }
                                    subTitle={"רכוש משותף"}
                                    headerStyles={{
                                        paddingHorizontal: responsiveWidth(28)
                                    }}
                                >
                                    <Reports
                                        height={responsiveWidth(46)}
                                    />
                                </CommonHeader>
                                <Menu />
                                    { scrollComponent() }
                                {/* {activeComponent()} */}

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
                                style={{ marginVertical: responsiveWidth(24) }}
                                titleFontSize={fonts.large}
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