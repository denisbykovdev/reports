import React, { memo, useMemo, useRef } from "react";
import { useCallback } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { useState } from "reinspect";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const useInput = () => {
    const [inputText, setText] = useState('');

    const onChange = useCallback((text) => {
        // console.log(
        //     "***useInput/onChange:", text
        // )
        setText(text)
    }, [])

    const onBlur = useCallback(() => {
        setText('')
    }, [])

    // const AutoInput = ({
    //     placeHolder,
    //     type,
    // }) => {
    //     return useMemo(() => {
    //         return  (
    //             <TextInput
    //                 placeholder={placeHolder}
    //                 value={inputText}
    //                 textContentType={type}
    //                 style={styles.autoInput}
    //                 onChangeText={(text) => onChange(text)}
    //                 onBlur={() => onBlur()}
                    
    //             />
    //         )
    //     }, [])
    // }
   

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