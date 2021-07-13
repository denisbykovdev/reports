import React, { useRef, useState } from "react"
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import AvoidingView from "../common/AvoidingView"
import HeaderView from "../common/HeaderView"
import SafeView from "../common/SafeView"
import ShadowView from "../common/ShadowView"
import BottomView from "../common/BottomView"
import Reports from "../icons/Reports"
import { responsiveWidth } from "../utils/layout"
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
import stringSlicer from "../helpers/stringSlicer"
import { useDispatch } from "react-redux"
import { watchPostReport, watchUpdateReport } from "../actionCreators/sagaReport"

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

const ReportScreen = ({ route }) => {

    useStatusBar("dark-content", colors.paleGrayBg);

    const formikRef = useRef({});

    const [printModalOpen, printModalClose, PrintModalContent] = useModal()

    const { defectsState, defectsDispatch } = useDefects()

    const { authState } = useAuth()

    const [offsetX, setOffsetX] = useState(0)

    const [viewWidth, setViewWidth] = useState(0)

    const [active, Menu] = useMenu(menuTitles, "details", scrollCatcher, layoutCatcher)

    const { type } = useType()

    const { isChecked, setChecked } = useChecked()

    const dispatch = useDispatch()

    const [isNameOpen, setIsNameOpen] = useState(false)

    const [isAdressOpen, setIsAdressOpen] = useState(false)

    const { token } = authState

    const submitReport = async (values) => {

        let newValues = { ...values, id: Number(values.id) }

        if (route.params.reportId === null) {
            await dispatch(watchPostReport(
                token,
                values,
                defectsState.areas,
                defectsState.notes
            ))
        } else {
            await dispatch(watchUpdateReport(
                token,
                route.params.reportId,
                newValues,
                defectsState.areas,
                defectsState.notes
            ))
        }
        setChecked(true)
    }

    function layoutCatcher({ nativeEvent: { layout: { x, y, width, height }, target } }) {
        // console.log(
        //     "___ReportScreen/scroll/layout:", width
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
        switch (true) {
            case offsetX === 0: return <Details />;
            case offsetX === viewWidth: return <Defects areas={route.params && route.params.report && route.params.report.areas.length >= 0 ? route.params.report.areas : null} />;
            case offsetX === (viewWidth) * 2: return <Resume notes={route.params && route.params.report && route.params.report.notes.length >= 0 ? route.params.report.notes : null} />;
            case offsetX >= (viewWidth) * 3: return <Archive />;
        }
    }

    const switchComponent = () => {
        switch (active) {
            case "details": return <Details />;
            case "defects": return <Defects areas={route.params && route.params.report && route.params.report.areas.length >= 0 ? route.params.report.areas : null} />;
            case "resume": return <Resume notes={route.params && route.params.report && route.params.report.notes.length >= 0 ? route.params.report.notes : null} />;
            case "archive": return <Archive />;
            default: return <Details />;
        }
    }

    // useEffect(() => console.log(
    //     `--- ReportScreen/props:`, route.params && route.params.report && route.params.report.areas.lenth >= 0 ? route.params.report.areas : null, route.params.report.areas.length
    // ), [])

    return (
        <SafeView>
            <AvoidingView>
                <FormContainer
                    innerRef={formikRef}
                    initialValues={{
                        id: route.params && route.params.report && route.params.report.id !== null ? route.params.report.id.toString() : null,
                        report_related_documents: route.params && route.params.report ? route.params.report.report_related_documents : null,
                        report_adress: route.params && route.params.report ? route.params.report.report_adress : null,
                        report_name: route.params && route.params.report ? route.params.report.report_name : null,
                        status: route.params && route.params.report ? route.params.report.status : null,
                        previous_test_id: route.params && route.params.report ? route.params.report.previous_test_id : null,
                        examination_date: route.params && route.params.report ? route.params.report.examination_date : null,
                        test_time: route.params && route.params.report ? route.params.report.test_time : null,
                        customer_name: route.params && route.params.report ? route.params.report.customer_name : null,
                        tester_name: route.params && route.params.report ? route.params.report.tester_name : null,
                        test_relevance: route.params && route.params.report ? route.params.report.test_relevance : null,
                        test_address_city: route.params && route.params.report ? route.params.report.test_address_city : null,
                        test_address: route.params && route.params.report ? route.params.report.test_address : null,
                        report_post_address_city: route.params && route.params.report ? route.params.report.report_post_address_city : null,
                        report_post_address: route.params && route.params.report ? route.params.report.report_post_address : null,
                        phone_number: route.params && route.params.report ? route.params.report.phone_number : null,
                        email: route.params && route.params.report ? route.params.report.email : null,
                        other_email: route.params && route.params.report ? route.params.report.other_email : null,
                        visit_escort: route.params && route.params.report ? route.params.report.visit_escort : null,
                        customer_full_name: route.params && route.params.report ? route.params.report.customer_full_name : null,
                        opposite_side: route.params && route.params.report ? route.params.report.opposite_side : null,
                        customer_logo: route.params && route.params.report ? route.params.report.customer_logo : null,
                        vat_in_percent: route.params && route.params.report ? route.params.report.vat_in_percent : null,
                        form: route.params && route.params.report ? route.params.report.form : null,
                        floor: route.params && route.params.report ? route.params.report.floor : null,
                        technical_floor: route.params && route.params.report ? route.params.report.technical_floor : null,
                        systems: route.params && route.params.report ? route.params.report.systems : null,
                        number_of_shared_buildings: route.params && route.params.report ? route.params.report.number_of_shared_buildings : null,
                        parking_levels: route.params && route.params.report ? route.params.report.parking_levels : null,
                        roof_levels: route.params && route.params.report ? route.params.report.roof_levels : null,
                        upper_reservoir: route.params && route.params.report ? route.params.report.upper_reservoir : null,
                        bottom_reservoir: route.params && route.params.report ? route.params.report.bottom_reservoir : null,
                        shared_systems_with_additional_buildings: route.params && route.params.report ? route.params.report.shared_systems_with_additional_buildings : null,
                        com_areas_in_test: route.params && route.params.report ? route.params.report.com_areas_in_test : null,
                        exam_comm_areas: route.params && route.params.report ? route.params.report.exam_comm_areas : null,
                        resume: route.params && route.params.report ? route.params.report.resume : null,
                        is_resume_template: route.params && route.params.report ? route.params.report.is_resume_template : null,
                        // areas: route.params && route.params.report ? route.params.report.areas : '',
                        // notes: route.params && route.params.report ? route.params.report.notes : ''
                    }}
                    onSubmit={
                        (values) => submitReport(values)
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
                                        {/* <Text>{JSON.stringify(netWorkSelector.isConnected)}</Text> */}

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
                                                                    ? stringSlicer(formikRef.current.values.report_adress, 13)
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
                                                                    ? stringSlicer(formikRef.current.values.report_name)
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

                            {/* <NetWorkModalContent>
                                <NetWork
                                    netWorkModalClose={netWorkModalClose}
                                    content={JSON.stringify(netWorkSelector.actionQueue.map(action => action.type))}
                                />
                            </NetWorkModalContent> */}

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