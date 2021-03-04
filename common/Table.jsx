import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native";
import firstLevelTitles from "../constants/firstLevelTitles";
import useInput from "../hooks/useInput";
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
    // on the first render only!
    const [array, setArray] = useState();

    const [inputText, onChange] = useInput();

    console.log(
        "---DD/prop:", arrayProp
    )
    // connect prop to update render
    useEffect(() => {
        if (array === undefined || array === false || array !== arrayProp || arrayProp === undefined) {
            setArray(arrayProp)
        }
    }, [arrayProp])

    useEffect(() => {

        if (inputText && inputText.length > 1) {
            const filtered = arrayProp.filter(report => Object.values(report).some(reportValue => reportValue.toString().toLowerCase().includes(inputText.toLowerCase())))

            setArray(filtered)
        }

        if (inputText.length === 0) {
            setArray(arrayProp)
        }

    }, [inputText])

    const itemWidth =  100 / Object.keys(tableTitles).length

    console.log(
        "___Table/props:", Object.keys(tableTitles)
    )

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

                <TextInput
                    onChangeText={onChange}
                    style={styles.searchInput}
                />
            </View>
            <View>
                <View style={styles.tableRowTitles}>
                    {
                        Object.keys(tableTitles).map((atom, i) =>
                        (
                            <View key={i} style={[styles.tableRowTitle, {
                                width: itemWidth + "%"
                            }]}>
                                <Text key={i} style={styles.darkText}>
                                    {firstLevelTitles[atom] ? firstLevelTitles[atom] : atom}
                                </Text>
                            </View>
                        ))
                    }
                </View>
                {
                    array && array.map((element, index) => {
                        return (
                            <View key={index}>
                                <View style={{
                                    // marginHorizontal: responsiveWidth(28),
                                    backgroundColor: colors.whiteTwo,
                                    height: responsiveWidth(1),
                                    display: index === 0 ? 'none' : "flex"
                                }}></View>
                                <TableRow
                                    itemData={element}
                                    dispatchMethod={dispatchMethod}
                                />

                            </View>
                        )
                    })
                }
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
        paddingLeft: "10%",
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
        // marginHorizontal: responsiveWidth(28),
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
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        alignSelf: 'flex-end'
    }
})

export default Table;