import React, { useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import CommonHeader from "./CommonHeader"
import Line from "./Line"
import ShadowView from "./ShadowView"
import RadioButtonRN from 'radio-buttons-react-native';
import { useState } from "reinspect"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import colors from "../utils/colors"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import fonts from "../utils/fonts"

//circle-slice-8 circle-outline circle-double

const withProfRegion = "/api/withProfRegion"
const withProf = "/api/withProf"
const withExpenses = "/api/withExpenses"
const withFree = "/api/withFree"
const withPdf = "/api/withPdf"
const withWord = "/api/withWord"

const profDetails = [
    {
        label: 'דוח מקצוע לפי אזורים',
        desc: withProfRegion,
        accessibilityLabel: 'prof'
        //Отчет подготовлен по профессии по региону
    },
    {
        label: 'דוח ערוך לפי מקצוע',
        desc: withProf,
        accessibilityLabel: 'prof'
        //Отчет подготовлен по профессии
    },
]

const expDetails = [
    {
        label: 'דוח כולל עלויות',
        desc: withExpenses,
        accessibilityLabel: 'exp'
        //Отчет включает затраты
    },
    {
        label: 'דוח ללא עלויות',
        desc: withFree,
        accessibilityLabel: 'exp'
        //Отчет о бесплатной стоимости
    },
]

const printDetails = [
    {
        label: 'PDF יצוא לקובץ',
        desc: withPdf,
        accessibilityLabel: 'print'
        //Отчет подготовлен по профессии по региону
    },
    {
        label: 'Word יצוא לקובץ',
        desc: withWord,
        accessibilityLabel: 'print'
        //Отчет подготовлен по профессии
    }
]


const PrintModal = ({ close }) => {
    const [prof, setProf] = useState(withProfRegion)
    const [exp, setExp] = useState(withExpenses)
    const [print, setPrint] = useState(withPdf)

    const printHandler = async ({ prof, exp, print }) => {
        const urlConcat = (prof) => (exp) => (print) => prof + exp + print

        console.log(
            "---PrintModal/printHandler/urlConcat:", urlConcat
        )

        // await printDispatch({
        //     type: "PRINT",
        //     printUrl: urlConcat
        // })
    }

    return (
        <ShadowView>
            <CommonHeader
                title={"מבנה הדוח"}
                close={close}
                subTitle={"יש לבחור את המבניות ליצירת הדוח"}
            />
            <Line />

            <RadioButtonRN
                data={profDetails}
                selectedBtn={(e) =>
                    setProf(Object.values(e)[1])
                }
                initial={1}
                boxStyle={{
                    borderRadius: 100,
                    // height: responsiveHeight(40),
                    padding: responsiveWidth(10),
                    marginVertical: responsiveWidth(4),
                    borderWidth: responsiveWidth(2),
                    borderColor: colors.lightGrayBorder,
                    fontSize: fonts.large
                }}
                style={{
                    color: colors.white,
                    padding: 0,
                    fontSize: fonts.large
                    
                }}
                circleSize={responsiveWidth(15)}
                activeColor={colors.white}
                deactiveColor={colors.azul}
                boxActiveBgColor={colors.azul}
                textColor={colors.white}
            />

            <RadioButtonRN
                data={expDetails}
                selectedBtn={(e) => setExp(Object.values(e)[1])}
                initial={1}
                boxStyle={{
                    borderRadius: 100,
                    height: responsiveHeight(40),
                    padding: responsiveWidth(10),
                    marginVertical: responsiveWidth(4),
                    borderWidth: responsiveWidth(2),
                    borderColor: colors.lightGrayBorder,
                    
                }}
                circleSize={responsiveWidth(15)}
                activeColor={colors.white}
                deactiveColor={colors.azul}
                boxActiveBgColor={colors.azul}
                textColor={colors.azul}
            />

            <RadioButtonRN
                data={printDetails}
                selectedBtn={(e) => setPrint(Object.values(e)[1])}
                initial={1}
                boxStyle={{
                    borderRadius: 100,
                    height: responsiveHeight(40),
                    padding: responsiveWidth(10),
                    marginVertical: responsiveWidth(4),
                    borderWidth: responsiveWidth(2),
                    borderColor: colors.lightGrayBorder,
                    
                }}
                circleSize={responsiveWidth(15)}
                activeColor={colors.white}
                deactiveColor={colors.azul}
                boxActiveBgColor={colors.azul}
                textColor={colors.azul}
            />

        </ShadowView>
    )
}

export default PrintModal;

