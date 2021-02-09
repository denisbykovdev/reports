import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";

export default function CommonButton({
    buttonHeight,
    buttonWidth,
    buttonColor,
    title,
    titleColor,
    onPress,
    children,
    buttonShadow=false,
    buttonShadowColor
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
                borderColor: buttonColor
            },
            buttonShadow ? styles.buttonShadow : ""
            ]}
        onPress={onPress}
    >
        <Text
            style={[
                styles.buttonTitle,
                {
                    color: titleColor
                }
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
        borderWidth: 1,
        // borderColor: colors.darkWhite,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: responsiveWidth(10)
    },
    buttonTitle: {
        fontSize: fonts.regular,
        marginRight: responsiveWidth(10)
    },
    buttonShadow: {
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 3.5,
        shadowOpacity: 1,
        elevation: 5
    }
})