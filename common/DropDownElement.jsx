import { FastField, Formik } from "formik";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useState } from "reinspect";
import { useDebouncedCallback } from "use-debounce/lib";
import useInput from "../hooks/useInput";
import useUsers from "../hooks/useUsersState";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const INPUT_DELAY = 200;

const OptimisationTextFieldWrapper = ({
    value,
    onChange,
    ...props
}) => {
    const [innerValue, setInnerValue] = useState('');

    console.log(
        "**************", value
    )

    useEffect(() => {
        if (value) {
            setInnerValue(value.toString());
        } else {
            setInnerValue('');
        }
    }, [value]);

    const [debouncedHandleOnChange] = useDebouncedCallback(
        (event) => {
            if (onChange) {
                onChange(event);
            }
        },
        INPUT_DELAY
    );

    const handleOnChange = useCallback((event) => {
        event.persist();

        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            name={name}
        >
            {({ values, handleChange }) => (

                <FastField name={name}>
                    {({ field, meta }) => (

                        <TextField
                            {...props}
                            value={innerValue}
                            onChange={handleOnChange}
                            style={styles.input}
                        />
                    )}
                </FastField>

            )}
        </Formik>
    );
};

const DropDownElement = ({ elementKey, elementValue, elementIndex, dispatchMethod, itemId }) => {

    const onChange = (text) => {
        dispatchMethod({
            type: "CHANGE_ITEM_VALUE",
            itemId,
            itemKey: elementKey,
            itemNewValue: text
        })
        console.log(
            "___DDElement/onchange:", text
        )
    }

    return (
        <View style={styles.itemMain}>
            <View style={{
                marginHorizontal: responsiveWidth(28),
                backgroundColor: colors.whiteTwo,
                height: responsiveWidth(1),
                display: elementIndex === 0 ? 'none' : "flex"
            }}></View>
            <View style={styles.itemElementContainer}>
                <Text style={styles.darkText}>
                    {elementKey}
                </Text>

                <TextInput
                    onChangeText={(text) => onChange(text)}
                    placeHolder={elementKey === "data" ? 'dd.mm.yyyy' : ''}
                    style={styles.input}
                />

                <Text style={styles.blueText}>
                    {elementValue}
                </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    itemElementContainer: {
        // backgroundColor: 'yellow',
        marginHorizontal: responsiveWidth(28),
        alignItems: 'flex-end'
    },
    input: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray
    },
    darkText: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(18)
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
})


export default DropDownElement;