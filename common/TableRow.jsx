import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Basket from "../icons/Basket"
import UserPlus from "../icons/UserPlus"
import { responsiveWidth } from "../utils/layout"

const TableRow = ({ itemData, dispatchMethod, children }) => {

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
                <TouchableOpacity>
                    {children}
                </TouchableOpacity>
            </View>
            {
                Object.entries(itemData).map(([key, value], index) => {

                    // if (key !== "id") 
                    return (


                        // <DropDownElement
                        //     key={index}
                        //     itemId={itemData.id}
                        //     elementKey={key}
                        //     elementValue={value}
                        //     elementIndex={index}
                        //     dispatchMethod={dispatchMethod}
                        // />
                        <View 
                            key={index}
                            style={[styles.rowData, {
                            width: itemWidth + "%"
                        }]}>
                            <Text >
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
    }
})

export default TableRow;