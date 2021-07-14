import React, { memo, useEffect, useState } from "react"
import { TextInput, StyleSheet } from "react-native"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import CommonSubHeader from "../common/CommonSubHeader"
import CommonButton from "../common/CommonButton"
import { responsiveWidth } from "../utils/layout"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import weights from "../utils/weights"
import AddArea from "../icons/AddArea"
import SearchArea from "../icons/SearchArea"
import SavedAreaItem from "../components/SavedAreaItem"
import useSearch from "../hooks/useSearch"
import { createArea } from "../constants/api"
import FormContainer from "../common/FormContainer"
import FormField from "../common/FormField"
import FormButton from "../common/FormButton"
import { useCallback } from "react"
import useDefects from "../hooks/useDefects"
import useAuth from "../hooks/useAuth"
import useServerAreas from "../hooks/useServerAreas"
import Spinner from "../common/Spinner"

function SavedAreas({
    savedAreasModalClose,
    // defectsState,
    // defectsDispatch
}) {
    // const [defectsState, defectsDispatch] = useServerAreas()

    const { defectsState, defectsDispatch } = useDefects()

    const [checkedAreasList, setUpdateAreasList] = useState([])

    const [searchArray, RenderSearch] = useSearch({ arrayOfObjects: defectsState.savedAreas })

    const { authState } = useAuth()

    const { token } = authState;

    const addCheckedArea = useCallback((name) => {

        const newSavedArea = defectsState && defectsState.savedAreas.find(savedArea => savedArea.area_name === name)

        setUpdateAreasList(oldArray => [...oldArray, newSavedArea])
    }, [])

    const removeCheckedArea = useCallback((name) => {
        setUpdateAreasList(checkedAreasList.filter(item => item.name !== name))
    }, [])

    const addSavedAreasList = async () => {
        await defectsDispatch({
            type: "ADD_SAVED_AREAS",
            saved: checkedAreasList
        })
        await savedAreasModalClose()
    }

    const createArea = (newAreaName) => defectsDispatch({
        type: "POST_NEW_AREA",
        areaName: newAreaName
    })

    const deleteSavedArea = (areaName) => {
        defectsDispatch({
            type: "POST_SAVED_AREA_TO_DELETE",
            token,
            areaName
        })
    }

    useEffect(() => {
        console.log(
            `--- SavedAreas render:`
        )
    }, [])

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

            <FormContainer
                initialValues={{ newAreaName: '' }}
                onSubmit={(values) => createArea(values.newAreaName)}
            >
                <FormField
                    name="newAreaName"
                    placeholder="הזן את שם האזור"
                    style={styles.savedAreasInput}
                />
                <FormButton
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
            </FormContainer>

            <CommonSubHeader
                title="בחר אזור"
            >
                <SearchArea />
            </CommonSubHeader>

            <RenderSearch />

            {
                defectsState && defectsState.fetching || defectsState.posting
                    ? <Spinner />

                    : searchArray && searchArray.length > 0
                        ? searchArray.map((savedArea, i) => (
                            <SavedAreaItem
                                key={i}
                                addCheckedArea={addCheckedArea}
                                removeCheckedArea={removeCheckedArea}
                                savedArea={savedArea}
                                deleteSavedArea={deleteSavedArea}
                            />
                        ))
                        : defectsState && defectsState !== null && defectsState.savedAreas.map((savedArea, i) => (
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
        paddingVertical: 0,
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        textAlign: 'right'
    }
})

export default SavedAreas