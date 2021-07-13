import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveHeight, responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import useModal from "../hooks/useModal"
import useDefects from "../hooks/useDefects";
import SavedAreas from "../modals/SavedAreas";
import Area from './Area'
import useAuth from "../hooks/useAuth";
import { useCallback } from "react";

const Defects = ({ areas }) => {
    const { defectsState, defectsDispatch } = useDefects()
    const [savedAreasModalOpen, savedAreasModalClose, SavedAreasModalContent] = useModal();

    const { authState } = useAuth()

    const { token } = authState;

    const addArea = () => {
        defectsDispatch({
            type: "ADD_DEFAULT_AREA"
        })
    }

    // const deleteSavedArea = useCallback((areaName) => {
    //     defectsDispatch({
    //         type: "POST_SAVED_AREA_TO_DELETE",
    //         token,
    //         areaName
    //     })
    // }, [])

    // const createArea = useCallback(async (newAreaName) => await defectsDispatch({
    //     type: "POST_NEW_AREA",
    //     areaName: newAreaName
    // }), [])

    // useEffect(() => {
    //     async function fetch() {
    //         await defectsDispatch({
    //             type: "FETCH_SAVED_AREAS",
    //             token
    //         })
    //     }

    //     () => fetch()
    // }, [])

    useEffect(() => {
        console.log(
            "--- Defects/useEffect/areas prop:", areas
        )
        console.log(
            "--- Defects/useEffect/defectsState.areas", defectsState.areas
        )

        defectsDispatch({
            type: "FETCH_SAVED_AREAS",
            token
        })


        if (areas && areas !== null) {
            defectsDispatch({
                type: "ADD_SAVED_AREAS",
                saved: areas
            })
        }
        else {
            defectsDispatch({
                type: "CLEAR_AREAS"
            })
        }

    }, [])

    return (
        <>
            {/* {
                defectsState.areas.length > 1 && (
                    <View style={styles.defectsAreasSearch}>
                        <TextInput
                            placeholder="... חיפוש לפי בדיקות"
                            style={styles.searchInput}
                        />
                    </View>
                )
            } */}



            {

                defectsState.areas && defectsState.areas.map((area, i) => (
                    <Area
                        key={i}
                        areaId={area.id}
                        areaName={area.area_name}
                        areaProblems={area.problems}
                        dispatch={defectsDispatch}
                        server={area.server ? true : false}
                    />
                ))
                // : areas.map((area, i) => (
                //     <Area
                //         key={i}
                //         areaId={area.id}
                //         areaName={area.name}
                //         areaProblems={area.problems}
                //         dispatch={defectsDispatch}
                //         server={area.server ? true : false}
                //     />
                // ))
            }



            <View style={{
                flexDirection: 'row'
            }}>
                <CommonButton
                    borderRadius={0}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={'50%'}
                    buttonColor={colors.white}
                    titleColor={colors.azul}
                    title="חיפוש והוספת איזור"
                    titleStyle={{
                        marginRight: 0
                    }}
                    style={{
                        borderBottomStartRadius: 5,
                        borderBottomWidth: 1,

                    }}
                    onPress={() => savedAreasModalOpen()}
                />
                <CommonButton
                    borderRadius={0}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={'50%'}
                    buttonColor={colors.paleGrayBg}
                    titleColor={colors.azul}
                    title="הוספת איזור +"
                    titleStyle={{
                        marginRight: 0
                    }}
                    style={{
                        borderBottomEndRadius: 5,
                        borderBottomWidth: 1,
                    }}
                    onPress={() => addArea()}
                />
            </View>

            <SavedAreasModalContent>
                <SavedAreas
                    savedAreasModalClose={savedAreasModalClose}
                    defectsDispatch={defectsDispatch}
                    defectsState={defectsState}
                // deleteSavedArea={deleteSavedArea}
                // createArea={createArea}
                />
            </SavedAreasModalContent>

        </>
    )
}

const styles = StyleSheet.create({
    defectsAreasSearch: {
        marginHorizontal: responsiveWidth(28),
        marginVertical: responsiveWidth(24)
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
        textAlign: 'right'
    }
})

export default Defects;