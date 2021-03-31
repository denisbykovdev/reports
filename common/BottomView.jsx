import React from "react";
import { StyleSheet, View } from "react-native";
import useType from "../hooks/useType";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

export default function BottomView ({children}) {
    const {type} = useType()

    return(
        <View style={[styles.bottomView, {
            flexDirection: type === 2 ? "row" : "column"
        }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: colors.paleGrayBg,
        alignItems: 'center',
        marginBottom: responsiveWidth(30),
        paddingHorizontal: responsiveWidth(31),
    }
})