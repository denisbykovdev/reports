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

export default useInput