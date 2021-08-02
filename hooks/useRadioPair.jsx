import React, { useState } from "react"
import CommonButton from "../common/CommonButton"
import colors from "../utils/colors"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from "react-native"


const useRadioPair = (pairArray, init) => {
    const [active, setActive] = useState(init)

    // console.log(
    //     "*** useRadioPair/init:", init
    // )

    const RenderRadioPair = ({ radioPairContainerStyle }) => {
        return (
            <View style={radioPairContainerStyle}>
                {
                    pairArray.map(radio => {
                        // console.log(
                        //     "*** useRadioPair/pairArray/radio:",
                        //     Object.values(radio)[1]
                        // )
                        return (
                            <View key={radio.label} >
                                <CommonButton
                                    buttonHeight={responsiveWidth(40)}
                                    borderRadius={100}
                                    buttonColor={
                                        active === Object.values(radio)[1] ? colors.azul : colors.white
                                    }
                                    borderColor={
                                        active === Object.values(radio)[1] ? colors.azul : colors.lightGrayBorder
                                    }
                                    title={radio.label}
                                    titleColor={
                                        active === Object.values(radio)[1] ? colors.white : colors.azul
                                    }
                                    onPress={() => setActive(Object.values(radio)[1])}
                                    style={{
                                        padding: responsiveWidth(7),
                                        flexDirection: 'row-reverse',
                                        justifyContent: 'space-between',
                                        marginVertical: responsiveWidth(8)

                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            active === Object.values(radio)[1] ? "circle-slice-8" : "circle-outline"
                                        }
                                        color={
                                            active === Object.values(radio)[1] ? colors.white : colors.azul
                                        }
                                        size={responsiveWidth(23)}
                                    />
                                </CommonButton>
                            </View>
                        )
                    }
                    )
                }
            </View>
        )
    }

    return [
        active,
        RenderRadioPair
    ]
}

export default useRadioPair;