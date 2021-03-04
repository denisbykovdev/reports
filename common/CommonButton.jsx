import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
    buttonShadow=false,
    buttonShadowColor,
    borderRadius = 5,
    borderColor = buttonColor,
    titleFontSize = fonts.small,
    style,
    titleStyle
}) {
    return(
        <TouchableOpacity
        style={[
            styles.button,
            { 
                backgroundColor: buttonColor,
                height: buttonHeight,
                width: buttonWidth,
                shadowColor: buttonShadowColor,
                borderColor,
                borderRadius,
            },
            buttonShadow ? styles.buttonShadow : "",
            style
            ]}
        onPress={onPress}
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
        fontWeight: weights.medium,
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