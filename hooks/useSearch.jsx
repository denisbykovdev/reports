import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TextInput } from "react-native"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

export default function useSearch({
    array,
    arrayOfObjects
}) {
    const [searchArray, setUpdateSearchArray] = useState()

    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (searchText.length > 0 && array !== undefined) {
            const filteredArray = array.filter(item => item.toString().toLowerCase().includes(searchText.toLowerCase()))

            setUpdateSearchArray(filteredArray)

            console.log(
                "___useSearch/filteredArray:",
                filteredArray
            )
        }
        if (searchText.length > 0 && arrayOfObjects !== undefined) {
            const filteredArrayOfObjects = arrayOfObjects && arrayOfObjects.filter(item => Object.values(item).some(itemValue => itemValue.toString().toLowerCase().includes(searchText.toLowerCase())))

            setUpdateSearchArray(filteredArrayOfObjects)

            console.log(
                "___useSearch/filtered:",
                filteredArrayOfObjects
            )
        }
        if (searchText.length === 0) {
            setUpdateSearchArray(
                array !== undefined && array || arrayOfObjects !== undefined && arrayOfObjects
            )
            console.log(
                "___useSearch/0:", array || arrayOfObjects
            )
        }
    }, [searchText])

    const onChangeSearchInput = (text) => {
        console.log(
            "___useSearch/onChangeSearchInput:",
            text
        )
        setSearchText(text)
    }

    const RenderSearch = useCallback(({searchInputWidth}) => {
        return (
            <TextInput
                onChangeText={onChangeSearchInput}
                style={[styles.searchInput,
                {
                    width: searchInputWidth || responsiveWidth(239),
                }]}
                placeholder="לחפש"
            />
        )
    }, [])

    return [
        searchArray,
        RenderSearch
    ]
}

const styles = StyleSheet.create({
    searchInput: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),

        // width: responsiveWidth(300),
        paddingHorizontal: responsiveWidth(10),
        alignSelf: 'flex-end',
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        textAlign: 'right',
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(22)
    }
})