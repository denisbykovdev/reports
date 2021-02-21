import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "reinspect";
import { responsiveWidth } from "../utils/layout";
import DropDownItem from "./DropDownItem";
import AvoidingView from "./AvoidingView";
import weights from "../utils/weights";
import fonts from "../utils/fonts";
import colors from "../utils/colors";
import useInput from "../hooks/useInput";

const DropDown = ({ 
    // array: arrayOfObjects, 
    array,
    searchTitle, 
    children 
}) => {
    //on the first render only!
    // const [array, setArray] = useState(arrayOfObjects);

    const [text, AutoInput] = useInput();

    console.log(
        "___DD/props:", array
    )

    // const autoSubmit = ({key, value}) => {}
    
    // useEffect(() => {
    //     console.log("rerender")
    // })

    // useEffect(() => {
    //     console.log(
    //         "___DD/useInput text/useEffect/output:", text
    //     )
    // }, [text])

    // const [selected, setSelected] = useState(null);
    // const [searchKey, setSearchKey] = useState(null);

    // const getSelected = (name) => {
    //     arrayOfObjects.find(element => {
    //         setSelected(element.name === name)
    //     })
    // }
    // useEffect(() => {
    //     console.log(
    //         "___DD:useEffect/selected", selected
    //     )
    // }, [selected])

    // const search = (searchKey) => {
    //     array.filter(element => Object.values(element).some(value => typeof value === String && value.includes(searchKey)))
    // }

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

                <AutoInput />

            </View>

            {array && array.map((element, index) => {
                return (
                    <View key={index}>
                        <View style={{
                            marginHorizontal: responsiveWidth(28),
                            backgroundColor: colors.whiteTwo,
                            height: responsiveWidth(1),
                            display: index === 0 ? 'none' : "flex"
                        }}></View>
                        <DropDownItem itemData={element} />
                    </View>
                )
            })}
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
})

export default DropDown;