import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import AvoidingView from "../common/AvoidingView"
import CommonHeader from "../common/CommonHeader"
import HeaderView from "../common/HeaderView"
import SafeView from "../common/SafeView"
import ShadowView from "../common/ShadowView"
import BottomView from "../common/BottomView"
import Reports from "../icons/Reports"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import useReportData from "../hooks/useReportData"
import { reportDataReducer } from "../reducers/reportDataReducer"
import CommonButton from "../common/CommonButton"
import { useState } from "react/cjs/react.development"
import colors from "../utils/colors"
import DetailsList from "../components/DetailsLiist"
import DefectsList from "../components/DefectsList"

const ReportScreen = ({ route }) => {
    const { reportId } = route.params

    const [reportDataState, reportDataDispatch] = useReportData(reportId)

    const dualStatic = [
        {
            label: "פרטי הבדיקה",
            desc: "details"
        },
        {
            label: "ליקוים",
            desc: "defects"
        }
    ]

    const [active, DualMenu] = useDualMenu(dualStatic, "details")

    console.log(
        "___ReportScreen:", active
    )

    return (
        <SafeView>
            <AvoidingView>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                >
                    <>
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

                                <DualMenu />

                                {
                                    active === "details"
                                        ?
                                        <DetailsList
                                            details={
                                                reportDataState.reportData
                                            }
                                        />
                                        :
                                        <DefectsList />
                                }

                            </ShadowView>
                        </HeaderView>
                        <BottomView></BottomView>
                    </>
                </ScrollView>
            </AvoidingView>
        </SafeView>
    )
}

export default ReportScreen;


const useDualMenu = (array, init) => {
    const [active, setActive] = useState(init)

    console.log(
        "___useDual:", active, init
    )

    const DualMenuRender = () => {
        return (
            <View style={styles.dualMenu}>
                <View style={styles.dualInner}>
                    {
                        array.map(element => (
                            <CommonButton
                                key={element.label}
                                onPress={() => setActive(element.desc)}
                                title={element.label}
                                titleColor={
                                    active === element.desc ? colors.azul : colors.darkBlueGray
                                }
                                buttonColor={
                                    active === element.desc ? colors.white : colors.paleGrayBg
                                }
                                borderRadius={25}
                                buttonWidth={"50%"}
                            />
                        ))
                    }
                </View>

                <View style={[styles.activeLineContainer, {
                    justifyContent: active === init ? "flex-start" : "flex-end"
                }]}>
                    <View style={styles.activeLine}></View>
                </View>
            </View>
        )
    }

    return [active, DualMenuRender]
}

const styles = StyleSheet.create({
    dualMenu: {
        borderTopColor: colors.whiteTwo,
        borderTopWidth: responsiveWidth(1),
    },
    dualInner: {
        borderBottomColor: colors.whiteTwo,
        borderBottomWidth: responsiveWidth(3),

        flexDirection: 'row',
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(30)
    },
    activeLineContainer: {
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(31),

        flexDirection: "row"
    },
    activeLine: {
        width: responsiveWidth(140),
        height: responsiveHeight(4),
        backgroundColor: colors.silver,
        borderRadius: responsiveWidth(25)
    }
})