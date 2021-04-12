import React, { memo, useEffect, useMemo, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Basket from "../icons/Basket"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import FormContainer from "./FormContainer"
import FormMaskedField from "./FormMaskedField"

const TableRow = ({ itemData, dispatchMethod, itemWidth }) => {

    const deleteHandler = (itemId) => {
        dispatchMethod({
            type: "DELETE_ITEM",
            itemId
        })
        console.log(
            "___DDItem/delete:", itemId
        )
    }

    return (

        <View style={styles.rowContainer}>
            <View style={styles.rowIconsContainer}>
                <TouchableOpacity onPress={() => deleteHandler(itemData.id)}>
                    <Basket />
                </TouchableOpacity>

            </View>

            <FormContainer
                initialValues={{ id: '' }}
            >
                {
                    Object.entries(itemData).map(([key, value], index) => {
                        return (

                            <FormMaskedField
                                key={index}
                                fieldName={key}
                                placeholder={typeof value === 'boolean' ? JSON.stringify(value) : value}
                                dispatchMethod={dispatchMethod}
                                itemId={itemData.id}
                                itemWidth={itemWidth}
                            />

                        )
                    }
                    )
                }

            </FormContainer>
        </View>

    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: responsiveWidth(15),
        paddingLeft: "10%",
        alignItems: 'flex-start'
    },
    rowIconsContainer: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '7.5%',
        paddingVertical: responsiveWidth(18),
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
})

export default TableRow