import React from "react"
import { withExpenses, withPdf, withProfRegion } from "../constants/api"
import { expDetails, printDetails, profDetails } from "../constants/printMadalButtons"
import useRadioPair from "../hooks/useRadioPair"
import colors from "../utils/colors"
import layout, { responsiveWidth } from "../utils/layout"
import CommonButton from "./CommonButton"
import CommonHeader from "./CommonHeader"
import Line from "./Line"
import ShadowView from "./ShadowView"
import FormErrorMessage from "../common/FormErrorMessage";

const PrintModal = ({ close }) => {
    const [activeProf, RenderRadioPairProf] = useRadioPair(profDetails, withProfRegion)
    const [activeExp, RenderRadioPairExp] = useRadioPair(expDetails, withExpenses)
    const [activePrint, RenderRadioPairPrint] = useRadioPair(printDetails, withPdf)

    console.log(
        "---PrintModal/printHandler:", activeProf, activeExp, activePrint
    )

    const printHandler = () => {
        const urlConcat = `${activeProf}${activeExp}${activePrint}`

        console.log(
            "---PrintModal/printHandler/urlConcat:", urlConcat
        )

        // await printDispatch({
        //     type: "PRINT",
        //     printUrl: urlConcat
        // })
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
            <RenderRadioPairProf 
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
            />
            <RenderRadioPairPrint 
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    paddingVertical: responsiveWidth(18)
                }}    
            />
            <Line 
                lineStyle={{
                    marginHorizontal: responsiveWidth(28)
                }}
            />
            <FormErrorMessage 
                error={ `${activeProf}, ${activeExp}, ${activePrint}`}
                visible={true}
            />
            <CommonButton 
                title={"יצוא"}
                borderColor={colors.azul}
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
