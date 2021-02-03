import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

export default function BottomView ({children}) {
    return(
        <View style={styles.bottomView}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: colors.paleGrayBg,
        alignItems: 'center', 
        justifyContent: 'flex-start',
        height: responsiveWidth(50)
    }
})