import React, { memo, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { responsiveWidth } from "../utils/layout";
import DropDownItem from "./DropDownItem";
import weights from "../utils/weights";
import fonts from "../utils/fonts";
import colors from "../utils/colors";
import useInput from "../hooks/useInput";
import { useState } from "reinspect";

const DropDown = ({
    arrayProp,
    searchTitle,
    children,
    dispatchMethod
}) => {
    // on the first render only!
    const [array, setArray] = useState();

    const [inputText, onChange, onBlur] = useInput();

    console.log(
        "---DD/prop:", arrayProp
    )

    // connect prop to update render
    useEffect(() => {
        if (array === undefined || array === false || array !== arrayProp || arrayProp === undefined) {
            setArray(arrayProp)
        }
    }, [arrayProp])

    // const [selected, setSelected] = useState(null);
    // const [searchKey, setSearchKey] = useState(null);

    // const getSelected = (name) => {
    //     arrayOfObjects.find(element => {
    //         setSelected(element.name === name)
    //     })
    // }



    useEffect(() => {

        if (inputText && inputText.length > 1) {
            // console.log(
            //     "___DD/useEffect/search:", inputText, array
            // )

            const filtered = arrayProp.filter(report => Object.values(report).some(reportValue => reportValue.toString().toLowerCase().includes(inputText.toLowerCase())))

            // console.log(
            //     "___DD/useEffect/search result:",
            //     filtered
            // );

            setArray(filtered)

            // console.log(
            //     "___DD/useEffect/search result array:",
            //     array
            // );
        }

        // console.log(
        //     "___DD/useEffect/check input: ", inputText.length, array
        // )

        if (inputText.length === 0) {
            setArray(arrayProp)
        }

    }, [inputText])


    return (
        <View style={styles.ddContainer}>
            <View style={styles.line}></View>
            <View style={styles.searchContainer}>

                <View style={styles.searchHeader}>
                    <View style={styles.searchIcon}>
                        {children}
                    </View>

                    <Text style={styles.searchTitle}>
                        {searchTitle}
                    </Text>
                </View>

                <TextInput
                    onChangeText={onChange}
                    // onBlur={onBlur} 
                    style={styles.searchInput}
                />

            </View>
            {
                array && array.map((element, index) => {
                    return (
                        <View key={index}>
                            <View style={{
                                marginHorizontal: responsiveWidth(28),
                                backgroundColor: colors.whiteTwo,
                                height: responsiveWidth(1),
                                display: index === 0 ? 'none' : "flex"
                            }}></View>

                            <DropDownItem 
                                itemData={element} 
                                dispatchMethod={dispatchMethod}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: responsiveWidth(28)
    },
    searchHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: responsiveWidth(34)
    },
    searchTitle: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.medium,
    },
    searchIcon: {
        position: 'absolute',
        left: 0
    },
    line: {
        marginHorizontal: responsiveWidth(28),
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1)
    },
    searchInput: {
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

// export default memo(DropDown);
export default DropDown;