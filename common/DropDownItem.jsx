import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "reinspect";
import useInput from "../hooks/useInput";
import Basket from "../icons/Basket";
import CircleArrowDown from "../icons/CircleArrowDown";
import CircleArrowUp from "../icons/CircleArrowUp";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const DropDownItem = ({ itemData , placeHolder }) => {
    const [isVisible, setVisible] = useState(false);
    const [inputText, onChange, onBlur] = useInput();

    return (

        <View style={styles.itemContainer}>


            <View style={{
                backgroundColor: isVisible ? colors.paleGrayBg : colors.white
            }}>
                <View style={styles.itemButton}>

                    <TouchableOpacity style={styles.basketIcon}>
                        <Basket />
                    </TouchableOpacity>

                    <Text style={styles.itemTitle}>
                        {itemData.name}
                    </Text>
                    <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        {
                            isVisible ? <CircleArrowUp /> : <CircleArrowDown />
                        }
                    </TouchableOpacity>
                </View>
            </View>


            {
                isVisible &&
                <View style={{
                    backgroundColor: isVisible ? colors.paleGrayBg : colors.white
                }}>
                    {
                        Object.entries(itemData).map(([key, value], index) => (

                            <View key={key} style={styles.itemMain}>
                                <View style={{
                                    marginHorizontal: responsiveWidth(28),
                                    backgroundColor: colors.whiteTwo,
                                    height: responsiveWidth(1),
                                    display: index === 0 ? 'none' : "flex"
                                }}></View>

                                <View style={styles.itemElementContainer}>
                                    <Text style={styles.darkText}>
                                        {key}
                                    </Text>
                                 
                                    <TextInput 
                                        onChangeText={onChange} 
                                        onBlur={onBlur} 
                                        placeHolder={key === "data" ? 'dd.mm.yyyy' : ''} 
                                        style={styles.input}
                                    />
                                    <Text style={styles.blueText}>
                                        {value}
                                    </Text>
                                </View>

                            </View>
                        ))
                    }


                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {

    },
    itemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: responsiveWidth(28),
        marginVertical: responsiveWidth(18),
        position: 'relative'
    },
    itemTitle: {
        marginHorizontal: responsiveWidth(14),
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small
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
    basketIcon: {
        position: 'absolute',
        left: 0
    },
    line: {
        marginHorizontal: responsiveWidth(28),
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1)
    },
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
    }
})

export default DropDownItem;
