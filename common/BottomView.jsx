import React from "react";
import { StyleSheet, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";

export default function BottomView ({children}) {
    console.log(layout.width)

    const width = useWindowDimensions().width;
    console.log(
        "dimension", width
    )

    return(
        <View style={[styles.bottomView, {
            flexDirection: width < 600 ? "column" : "row"
            // flexWrap: layout.width > 600 ? "wrap" : "nowrap",
            // justifyContent: layout.width > 600 ? "flex-start" : "center"
        }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: colors.paleGrayBg,
        // alignItems: 'center', 
        // justifyContent: 'flex-start',
        // height: responsiveWidth(85),
        width: "100%",
        marginBottom: responsiveWidth(30),
        paddingHorizontal: responsiveWidth(31),
    }
})