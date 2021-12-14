import React, { useState } from "react"
import { withExpenses, withFree, withPdf, withProf, withProfRegion } from "../constants/api"
import { expDetails, printDetails, profDetails } from "../constants/printMadalButtons"
import useRadioPair from "../hooks/useRadioPair"
import colors from "../utils/colors"
import layout, { responsiveWidth } from "../utils/layout"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import FormErrorMessage from "../common/FormErrorMessage";
import { useDispatch } from 'react-redux'
import useAuth from "../hooks/useAuth"
import { watchPrintReport } from '../actionCreators/sagaReport'
import PrintButton from "../common/PrintButton"
import { View } from "react-native"

const selectedArray = [
    withProfRegion,
    withProf,
    withExpenses,
    withFree
]

const PrintModal = ({ close, reportId }) => {
    // const [activeProf, RenderRadioPairProf] = useRadioPair(profDetails, withProfRegion)
    // const [activeExp, RenderRadioPairExp] = useRadioPair(expDetails, withExpenses)
    // const [activePrint, RenderRadioPairPrint] = useRadioPair(printDetails, withPdf)

    const [selected, setSelected] = useState()

    const dispatch = useDispatch()

    const { authState } = useAuth()

    const { token } = authState

    const printHandler = () => {
        // const urlConcat = `${activeProf}${activeExp}`

        // ${ activePrint }

        console.log(
            "---PrintModal/printHandler/selected:", selected
        )

        dispatch(watchPrintReport(
            token,
            reportId,
            selected
        ))

        close()
    }

    return (
        <ShadowView
            shadowStyle={{
                paddingHorizontal: 0,
                // maxWidth: layout.width > 600 ? responsiveWidth(360) : "100%"
            }}
        >
            <CommonHeader
                title={"מבנה הדוח"}
                close={close}
                subTitle={"יש לבחור את המבניות ליצירת הדוח"}
                headerStyles={{
                    paddingHorizontal: responsiveWidth(28)
                }}
            />
            <Line
                lineStyle={{
                    marginHorizontal: responsiveWidth(28)
                }}
            />
            <View
                style={{
                    marginHorizontal: responsiveWidth(28),
                    marginVertical: responsiveWidth(16)
                }}
            >
            {
                selectedArray.map((select, i) => (
                    <PrintButton 
                        key={i}
                        active={selected === select}
                        select={
                            select === `by_profession_without_money` ? 'דוח לפי אזור' 
                            : select === `by_profession_with_money` ? 'דוח ערוך לפי מקצוע'
                            : select === `by_areas_with_money` ? 'דוח כולל עלויות'
                            : select === `by_areas_without_money` ? 'דוח ללא עלויות' : ''
                        }
                        onPress={() => setSelected(select)}
                    />
                ))
            }
            </View>
            {/* <RenderRadioPairProf
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    paddingVertical: responsiveWidth(18)
                }}
            />
            <RenderRadioPairExp
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    backgroundColor: colors.paleGrayThree,
                    paddingVertical: responsiveWidth(18)
                }}
            /> */}
            {/* <RenderRadioPairPrint 
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    paddingVertical: responsiveWidth(18)
                }}    
            /> */}
            <Line
                lineStyle={{
                    marginHorizontal: responsiveWidth(28)
                }}
            />
            {/* <FormErrorMessage
                error={`${activeProf}, ${activeExp}, ${activePrint}`}
                visible={true}
            /> */}
            <CommonButton
                title={"יצוא"}
                borderColor={colors.azul}
                borderRadius={10}
                titleColor={colors.azul}
                onPress={() => printHandler()}
                style={{
                    marginHorizontal: responsiveWidth(28),
                    marginTop: responsiveWidth(24)
                }}
            />
        </ShadowView>
    )
}

export default PrintModal;
