import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth, responsiveHeight } from "../utils/layout";
import fonts from "../utils/fonts";
import weights from "../utils/weights";
import ArrowDown from "../icons/ArrowDown"
import useChecked from "../hooks/useChecked";
import useProfs from "../hooks/useProfs";

export default function FormSelect({
    name,
    array,
    placeholder,
    interSepter,
    style,
    selectStyle,
    multi = false,
    ...otherProps
}) {
    const [isOpen, setOpen] = useState(false);

    const {
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
    } = useFormikContext();

    const { isChecked, setChecked } = useChecked()

    const animatedIconRotation = useRef(new Animated.Value(0)).current;

    const [multiSelected, setToMultiSelected] = useState(values[name] ? [...values[name]] : [])

    const interIcon = animatedIconRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const onChangeHandler = (e) => {
        console.log(
            "___FormSelect:", values, e
        );
        setFieldTouched(name)
        if (multi) {
            if (multiSelected.includes(e)) {
                setToMultiSelected(multiSelected => [...multiSelected.filter(item => item.toString() !== e.toString())])
            } else {
                setToMultiSelected(multiSelected => [...multiSelected, e])
            }
        } else {
            setFieldValue(name, e);
            interSepter && interSepter(name, e)
            setOpen(false)
        }

        isChecked && setChecked(false)
    }

    useEffect(() => {
        if (multi && multiSelected.length > 0) setFieldValue(name, multiSelected)
    }, [multiSelected])

    const openSelectHandler = () => {
        setOpen(!isOpen)
    }

    // useEffect(() => {
    //     setFieldValue(name, array[0])
    // }, [])

    useEffect(() => {
        if (isOpen) {
            Animated.timing(animatedIconRotation, {
                duration: 300,
                easing: Easing.linear,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else if (!isOpen) {
            Animated.timing(animatedIconRotation, {
                duration: 300,
                easing: Easing.linear,
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen])

    return (
        <View style={[
            styles.selectContainer,
            style
        ]}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => openSelectHandler()}
            >
                <Animated.View style={[{ transform: [{ rotate: interIcon }] }]}>
                    <ArrowDown />
                </Animated.View>

                <Text style={styles.selectText}>
                    {values[name] && multi === false ? values[name] : placeholder}
                </Text>

            </TouchableOpacity>
            {
                isOpen && (
                    <View style={[styles.selectSelect, selectStyle]}>
                        {
                            array && array.map((e, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={
                                        () => onChangeHandler(e)
                                    }
                                    style={[styles.selectItem, {
                                        backgroundColor: values[name] === e || multi && multiSelected.includes(e) ? colors.azul : colors.white,

                                        borderTopStartRadius: i === 0 ? 9 : 0,
                                        borderTopEndRadius: i === 0 ? 9 : 0,

                                        borderBottomStartRadius: e === array.slice(-1)[0] ? 9 : 0,
                                        borderBottomEndRadius: e === array.slice(-1)[0] ? 9 : 0,

                                    }]}
                                    {...otherProps}
                                >

                                    <Text style={[styles.selectText, {
                                        color: values[name] !== e ? colors.darkBlueGray : colors.white
                                    }]}>
                                        {e}
                                    </Text>


                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            }

            {/* <FormErrorMessage error={errors[name]} visible={touched[name]} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    selectContainer: {
        marginBottom: responsiveWidth(24)
    },
    selectButton: {
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,

        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        paddingHorizontal: responsiveWidth(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectSelect: {
        borderColor: colors.darkWhite,
        flex: 1,
        borderWidth: responsiveWidth(2),
        borderRadius: 10,
        backgroundColor: colors.white,
        // position: 'relative',
        // zIndex: 2
    },
    selectItem: {
        height: responsiveWidth(31),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: responsiveWidth(10)
    },
    selectText: {
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
    }
});
