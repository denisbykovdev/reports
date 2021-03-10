import React from "react"
import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const ItemTitle = ({titleStyle, title}) => (
    <View style={styles.itemTitleContainer}>
        <Text style={[styles.itemTitleText, titleStyle]}>
            {title}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        marginBottom: responsiveWidth(24)
    },
    itemTitleContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: responsiveWidth(6)
    },
    itemTitleText: {
        fontSize: fonts.xsmall,
        fontWeight: weights.regular,
        color: colors.darkBlueGray,
    }
})

export default ItemTitle;