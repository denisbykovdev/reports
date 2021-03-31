import React, { useCallback, useState } from "react"
import { StyleSheet, TextInput } from "react-native"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

export default function useSearch({
    array,
    arrayOfObjects
}){
    const [searchArray, setUpdateSearchArray] = useState(null)

    const [searchText, setSearchText] = useState('')

    const onChangeSearchInput = useCallback((text) => {
        setSearchText(text)

        if(arrayOfObjects) {
            const filteredArrayOfObjects = arrayOfObjects && arrayOfObjects.filter(item => Object.values(item).some(itemValue => itemValue.toString().toLowerCase().includes(searchText.toLowerCase())))

            console.log(
                "___useSearch/filtered:", filteredArrayOfObjects
            )

            setUpdateSearchArray(filteredArrayOfObjects)
        } else if(array) {
            const filteredArray = array && array.length >= 0 && array.filter(item => item.includes(searchText))

            console.log(
                "___useSearch/filteredArray:", filteredArray
            )

            setUpdateSearchArray(filteredArray)
        }
        
    }, [])

    const RenderSearch = useCallback(() => {
        return(
            <TextInput 
                onChangeText={onChangeSearchInput}
                style={styles.searchInput}
                placeholder="לחפש"
            />
        )
    }, [])

    console.log(
        "___useSearch/props:", array, arrayOfObjects, searchArray
    )
    
    return [
        searchText,
        searchArray,
        RenderSearch
    ]
}

const styles= StyleSheet.create({
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
        textAlign: 'right',

        marginTop: responsiveWidth(22)
    }
})