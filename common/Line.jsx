import React from "react"
import { View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

const Line = () => (
    <View style={{
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1),
        marginVertical: responsiveWidth(24)
    }}></View>
)

export default Line;