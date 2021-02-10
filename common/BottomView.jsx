import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";

export default function BottomView ({children}) {
    return(
        <View style={[styles.bottomView, {
            flexDirection: layout.width > 600 ? "row" : "column"
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
        alignItems: 'center', 
        // justifyContent: 'flex-start',
        // height: responsiveWidth(85),
        width: layout.width,
        marginBottom: responsiveWidth(30),
        paddingHorizontal: responsiveWidth(31),
    }
})