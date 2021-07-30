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
import { areasAll, createArea } from "../constants/api"
import FormContainer from "../common/FormContainer"
import FormField from "../common/FormField"
import FormButton from "../common/FormButton"
import { useCallback } from "react"
import useDefects from "../hooks/useDefects"
import useAuth from "../hooks/useAuth"
import useServerAreas from "../hooks/useServerAreas"
import Spinner from "../common/Spinner"

import { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import useReducerWithSideEffects from 'use-reducer-with-side-effects';
import axios from "axios"

const serverAreasInitial = {
    serverAreas: [],
    error: null
}

const serverAreasReducer = (
    state = serverAreasInitial,
    action
) => {
    switch (action.type) {
        case "SET_SERVER_AREAS":
            return Update({
                ...state,
                loading: false,
                serverAreas: action.serverAreas
            });

        case "ERROR_SERVER_AREAS":
            return Update({
                ...state,
                loading: false,
                error: action.error
            });
        case "GET_SERVER_AREAS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    loading: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    // console.log(
                    //     `--- serverAreasReducer/GET_SERVER_AREAS/action:`,
                    //     action
                    // )
                    try {
                        const response = await axios.get(
                            `${areasAll}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }

                        );
                        console.log(
                            `--- serverAreasReducer/GET_SERVER_AREAS/response:`,
                            response.data.data
                        )
                        dispatch({
                            type: "SET_SERVER_AREAS",
                            serverAreas: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_SERVER_AREAS",
                            error
                        })
                    }
                }
            );
    }
}


function SavedAreas({
    savedAreasModalClose,
    defectsDispatch
}) {
    const [serverAreasState, serverAreasDispatch] = useReducerWithSideEffects(
        serverAreasReducer,
        serverAreasInitial
    );

    // const { defectsState, defectsDispatch } = useDefects()

    const [checkedAreasList, setUpdateAreasList] = useState([])

    const [searchArray, RenderSearch] = useSearch({ arrayOfObjects: serverAreasState.serverAreas })

    const { authState } = useAuth()

    const { token } = authState;

    const addCheckedArea = (name) => {

        console.log(
            `--- SavedAreas/addCheckedArea/name:`,
            name,
            serverAreasState
        )

        const newSavedArea = serverAreasState.serverAreas.find(savedArea => savedArea.area_name === name)

        console.log(
            `--- SavedAreas/addCheckedArea/newSavedArea:`, newSavedArea
        )

        setUpdateAreasList(oldArray => [...oldArray, newSavedArea])
    }

    const removeCheckedArea = (name) => {
        setUpdateAreasList(checkedAreasList.filter(item => item.name !== name))
    }

    const addSavedAreasList = async () => {
        console.log(
            `--- SavedAreas/addSavedAreasList/before ADD_SAVED_AREAS/checkedAreasList`,
            checkedAreasList
        )
        await defectsDispatch({
            type: "ADD_SAVED_AREAS",
            serverAreas: checkedAreasList
        })
        savedAreasModalClose()
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
        (function getAreas() {
            serverAreasDispatch({
                type: "GET_SERVER_AREAS",
                token
            })
        })()
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
                searchArray && searchArray.length > 0
                    ? searchArray.map((savedArea, i) => (
                        <SavedAreaItem
                            key={i}
                            addCheckedArea={addCheckedArea}
                            removeCheckedArea={removeCheckedArea}
                            savedArea={savedArea}
                            deleteSavedArea={deleteSavedArea}
                        />
                    ))
                    : serverAreasState.serverAreas.map((savedArea, i) => (
                        serverAreasState.loading
                            ? <Spinner key={i} />

                            :
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