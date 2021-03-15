import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const useInput = () => {
    const [inputText, setText] = useState('');

    const onChange = useCallback((text) => {
        setText(text)
    }, [])

    const onBlur = useCallback(() => {
        setText('')
    }, [])
   

    return [
        inputText,
        onChange,
        onBlur
    ]
}

const styles = StyleSheet.create({
    autoInput: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray
    }
})

export default useInput