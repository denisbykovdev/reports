import React, { memo, useEffect, useMemo, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native";
import firstLevelTitles from "../constants/firstLevelTitles";
import useInput from "../hooks/useInput";
import useReports from "../hooks/useReports";
import useSearch from "../hooks/useSearch";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import TableRow from "./TableRow";

const Table = ({
    arrayProp,
    searchTitle,
    children,
    dispatchMethod,
    tableTitles
}) => {
    const [array, setArray] = useState()

    const [inputText, onChange] = useInput()

    const [searchArray, RenderSearch] = useSearch({ arrayOfObjects: array })

    console.log(
        `--- Table/props:`, arrayProp, array
    )

    useEffect(() => {
        // if (
        //     array === undefined
        //     || array === false
        //     || array !== arrayProp
        //     || arrayProp === undefined
        //     || array != arrayProp
        // ) {
        //     setArray(arrayProp)
        // }
        setArray(arrayProp)

        console.log(
            `--- Table/effect:`, arrayProp, array
        )
    }, [arrayProp])

    // useEffect(() => {
    //     if (inputText && inputText.length > 1) {
    //         const filtered = arrayProp.filter(report => Object.values(report).some(reportValue => reportValue !== null && reportValue.toString().toLowerCase().includes(inputText.toLowerCase())))

    //         setArray(filtered)
    //     }
    //     if (inputText.length === 0) {
    //         setArray(arrayProp)
    //     }
    // }, [inputText])

    const widthHandler = (tableTitles) => 100 / Object.keys(tableTitles).length

    const itemWidth = useMemo(() =>
        widthHandler(tableTitles)
        , [tableTitles])

    return (
        <View style={styles.tableContainer}>
            <View style={styles.line}></View>
            <View style={styles.searchContainer}>

                <View style={[styles.searchHeader, {
                    marginVertical: searchTitle && responsiveWidth(34)
                }]}
                >
                    {children}
                    <Text style={styles.searchTitle}>
                        {searchTitle}
                    </Text>
                </View>
                {/* <TextInput
                    onChangeText={onChange}
                    style={styles.searchInput}
                /> */}
                <RenderSearch />
            </View>
            <View>
                <View style={styles.tableRowTitles}>
                    {
                        Object.keys(tableTitles).map((atom, i) =>
                        (
                            <View
                                key={i}
                                style={[
                                    styles.tableRowTitle,
                                    {
                                        width: itemWidth + "%"
                                    }
                                ]}
                            >
                                <Text style={styles.darkText}>
                                    {
                                        firstLevelTitles[atom]
                                            ? firstLevelTitles[atom]
                                            : atom
                                    }
                                </Text>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.tableRows}>
                    {
                        // searchArray && searchArray.length > 0
                        //     ? 
                        //     searchArray && searchArray.map((element, index) => (
                        //         <View key={index}>
                        //             <View style={{
                        //                 backgroundColor: colors.whiteTwo,
                        //                 height: responsiveWidth(1),
                        //                 display: index === 0 ? 'none' : "flex"
                        //             }}></View>
                        //             <TableRow
                        //                 itemData={element}
                        //                 dispatchMethod={dispatchMethod}
                        //                 itemWidth={itemWidth}
                        //                 key={index}
                        //                 tableTitles={tableTitles}
                        //             />
                        //         </View>
                        //     ))
                        //     : 
                            arrayProp && arrayProp.map((element, index) => (
                                <View key={element.id}>
                                    <View style={{
                                        backgroundColor: colors.whiteTwo,
                                        height: responsiveWidth(1),
                                        display: index === 0 ? 'none' : "flex"
                                    }}></View>
                                    <TableRow
                                        itemData={element}
                                        dispatchMethod={dispatchMethod}
                                        itemWidth={itemWidth}
                                        // key={index}
                                        tableTitles={tableTitles}
                                    />
                                </View>
                            ))
                    }
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        marginHorizontal: responsiveWidth(28)
    },
    tableRowTitles: {
        flexDirection: 'row',
        padding: responsiveWidth(15),
        justifyContent: 'space-between',
        paddingLeft: "12.5%",
        paddingRight: '3.5%'
    },
    tableRowTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkText: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(18)
    },
    searchContainer: {
        // width: responsiveWidth(239),
        // alignSelf: 'flex-end'
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
        // marginVertical: responsiveWidth(15),
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1)
    },
    searchInput: {
        // borderColor: colors.darkWhite,
        // borderWidth: responsiveWidth(2),
        // borderRadius: 20,
        // height: responsiveWidth(31),
        width: responsiveWidth(239),
        // paddingHorizontal: responsiveWidth(10),

        // fontSize: fonts.xsmall,
        // fontWeight: weights.thin,
        // color: colors.darkBlueGray,
        // alignSelf: 'flex-end'
    }
})

export default Table