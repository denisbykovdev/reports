import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth, responsiveHeight } from "../utils/layout";
import fonts from "../utils/fonts";
import weights from "../utils/weights";
import ArrowDown from "../icons/ArrowDown"

export default function FormSelect({
    name,
    array,
    placeholder,
    interSepter,
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

    const animatedIconRotation = useRef(new Animated.Value(0)).current;

    const interIcon = animatedIconRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const onChangeHandler = (e) => {
        console.log(
            "___FormSelect:", values, e
        );
        setFieldValue(name, e);
        interSepter && interSepter(name, e)
        setOpen(false)
    }

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
        <View style={styles.selectContainer}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => openSelectHandler()}
            >
                <Animated.View style={[{ transform: [{ rotate: interIcon }] }]}>
                    <ArrowDown />
                </Animated.View>

                <Text style={styles.selectText}>
                    {values[name] ? values[name] : placeholder}
                </Text>

            </TouchableOpacity>
            {
                isOpen && (
                    <View style={styles.selectSelect}>
                        {
                            array && array.map((e, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={
                                        () => onChangeHandler(e)
                                    }
                                    style={[styles.selectItem, {
                                        backgroundColor: values[name] !== e ? colors.white : colors.azul,

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
        // position: 'absolute',
        // width: '100%',
        // zIndex: 1,
        backgroundColor: colors.white,
    },
    selectItem: {
        height: responsiveHeight(31),
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
