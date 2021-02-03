import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import fonts from "../utils/fonts";

export default function Button({
    buttonHeight,
    buttonColor,
    title,
    titleColor,
    onPress,
    children,
    buttonShadow=false,
    buttonShadowColor
}) {
    <TouchableOpacity
        style={[
            styles.button,
            { 
                backgroundColor: buttonColor,
                height: buttonHeight,
                shadowColor: buttonShadowColor
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
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonTitle: {
        fontSize: fonts.regular
    },
    buttonShadow: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 9,
          width: 0
        },
        elevation: 10
    }
})