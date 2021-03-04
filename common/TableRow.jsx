import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Basket from "../icons/Basket"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

const TableRow = ({ itemData, dispatchMethod }) => {

    const deleteHandler = (itemId) => {
        dispatchMethod({
            type: "DELETE_ITEM",
            itemId
        })
        console.log(
            "___DDItem/delete:", itemId
        )
    }

    const itemWidth = 100 / Object.keys(itemData).length

    return (

        <View style={styles.rowContainer}>
            <View style={styles.rowIconsContainer}>
                <TouchableOpacity onPress={() => deleteHandler(itemData.id)}>
                    <Basket />
                </TouchableOpacity>
               
            </View>
            {
                Object.entries(itemData).map(([key, value], index) => {

                    // if (key !== "id") 
                    return (
                        <View 
                            key={index}
                            style={[styles.rowData, {
                            width: itemWidth + "%"
                        }]}>
                            <Text style={styles.blueText}>
                                {
                                    typeof value === 'boolean' ? JSON.stringify(value) : value
                                }
                            </Text>
                        </View>

                    )
                }
                )
            }

        </View>

    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: responsiveWidth(15),
        paddingLeft: "10%",
        alignItems: 'center'
    },
    rowIconsContainer: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '7.5%',
        paddingVertical: responsiveWidth(15),
    },
    rowData: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
})

export default TableRow;