import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";

export default function BottomView ({children}) {

    return(
        <View style={[styles.bottomView, {
            flexDirection: layout.width < 600 ? "column" : "row"
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
        // width: "100%",
        marginBottom: responsiveWidth(30),
        paddingHorizontal: responsiveWidth(31),
    }
})