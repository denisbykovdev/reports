import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

const ShadowView = ({shadowStyle, children}) => (
    <View style={[styles.shadowContainer, shadowStyle]} elevation={10}>
        {children}
    </View>
)

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: responsiveWidth(28),
        paddingVertical: responsiveWidth(24),

        shadowColor: colors.paleGrayLight,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 9,
        shadowOpacity: 1,
        elevation: 10,
    }
})

export default ShadowView;