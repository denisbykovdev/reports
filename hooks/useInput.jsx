import React, { useMemo, useRef } from "react";
import { useCallback } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useState } from "reinspect";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const useInput = () => {
    const [text, setText] = useState();

    const valueRef = useRef();

    const onChange = useCallback((text) => {
        setText(valueRef.current)
    }, [])

    const AutoInput = () => (
        <TextInput 
            ref={valueRef}
            // value={text}
            // textContentType=
            style={styles.autoInput}
            // onChangeText={
            //     text => onChange(text)
            // }
        />
    )

    return [
        text,
        AutoInput
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

export default useInput;