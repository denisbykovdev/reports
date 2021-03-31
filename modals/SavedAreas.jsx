import React, { useEffect, useState } from "react"
import { TextInput, StyleSheet } from "react-native"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import CommonSubHeader from "../common/CommonSubHeader"
import CommonButton from "../common/CommonButton"
import { responsiveWidth } from "../utils/layout"
import useDefects from "../hooks/useDefects"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import weights from "../utils/weights"
import AddArea from "../icons/AddArea"
import SearchArea from "../icons/SearchArea"
import SavedAreaItem from "../components/SavedAreaItem"

export default function SavedAreas({ 
    savedAreasModalClose,
    defectsDispatch,
    defectsState,
    deleteSavedArea
}) {

    const [ checkedAreasList, setUpdateAreasList ] = useState([])

    const addCheckedArea = (name) => {

        const newSavedArea = defectsState && defectsState.savedAreas.find(savedArea => savedArea.name === name)

        setUpdateAreasList(oldArray => [...oldArray, newSavedArea])
    }

    const removeCheckedArea = (name) => {
        setUpdateAreasList(checkedAreasList.filter(item => item.name !== name))
    }

    const addSavedAreasList = async () => {
        await defectsDispatch({
            type: "ADD_SAVED_AREAS",
            saved: checkedAreasList
        })
        await savedAreasModalClose()
    }

    return (
        <ShadowView>
            <CommonHeader
                close={savedAreasModalClose}
                title="הוספת אזור"
            />
            <Line />
            <CommonSubHeader
                title="הוסף אזור חדש"
            >
                <AddArea />
            </CommonSubHeader>

            <TextInput
                placeholder="הזן את שם האזור"
                style={styles.savedAreasInput}
            />

            <CommonButton
                title="הוספה"
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                borderColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    paddingHorizontal: responsiveWidth(70),
                    marginTop: responsiveWidth(18)
                }}
                titleStyle={{
                    marginRight: 0
                }}
                titleColor={colors.darkSkyBlue}
            />

            <CommonSubHeader
                title="בחר אזור"
            >
                <SearchArea />
            </CommonSubHeader>

            {
                defectsState && defectsState.savedAreas && defectsState.savedAreas.map((savedArea, i) => (
                    <SavedAreaItem
                        key={i}
                        addCheckedArea={addCheckedArea}
                        removeCheckedArea={removeCheckedArea}
                        savedArea={savedArea}
                        deleteSavedArea={deleteSavedArea}
                    />
                ))
            }

            <CommonButton
                title="שמירה"
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                buttonColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    paddingHorizontal: responsiveWidth(70),
                    marginTop: responsiveWidth(18)
                }}
                titleStyle={{
                    marginRight: 0
                }}
                titleColor={colors.white}
                onPress={() => addSavedAreasList()}
            />

        </ShadowView>
    )
}

const styles = StyleSheet.create({
    savedAreasInput: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        textAlign: 'right'
    }
})