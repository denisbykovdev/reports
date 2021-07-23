import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

export default function CommonButton({
    buttonHeight,
    buttonWidth,
    buttonColor,
    title,
    titleColor,
    onPress,
    children,
    buttonShadow = false,
    buttonShadowColor,
    borderRadius = 5,
    borderColor = buttonColor,
    titleFontSize = fonts.small,
    style,
    titleStyle,
    disabled
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                {
                    backgroundColor: disabled !== true ? buttonColor : colors.battleShipGrey,
                    height: buttonHeight,
                    width: buttonWidth,
                    shadowColor: buttonShadowColor,
                    borderColor,
                    borderRadius
                },
                buttonShadow ? styles.buttonShadow : "",
                style
            ]}
        >
            <Text
                style={[
                    styles.buttonTitle,
                    {
                        color: titleColor,
                        fontSize: titleFontSize
                    },
                    titleStyle
                ]}
            >
                {title}
            </Text>

            {children}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        borderStyle: "solid",
        borderWidth: responsiveWidth(2),
        // borderColor: colors.darkWhite,
        // borderRadius: 5,
        flexDirection: 'row',
        // alignItems: 'center', 
        justifyContent: 'center',
        padding: responsiveWidth(10)
    },
    buttonTitle: {
        // fontSize: fonts.regular,
        marginRight: responsiveWidth(10),
        fontWeight: weights.medium
    },
    buttonShadow: {
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3.5,
        shadowOpacity: 1,
        elevation: 10
    }
})