import React, { useState, useEffect, memo } from "react";
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

const Defects = ({ areas, setEdit }) => {
    const { defectsState, defectsDispatch } = useDefects()

    const [savedAreasModalOpen, savedAreasModalClose, SavedAreasModalContent] = useModal();

    // const { authState } = useAuth()

    // const { token } = authState;

    const addArea = () => {
        defectsDispatch({
            type: "ADD_DEFAULT_AREA"
        })
    }

    useEffect(() => {
        if (areas && areas !== null && areas.length > 0) {
            defectsDispatch({
                type: "ADD_REPORT_AREAS",
                reportAreas: areas
            })
        } else {
            defectsDispatch({
                type: "CLEAR_AREAS"
            })
        }
    }, [])

    return (
        <>
            {
                defectsState.areas && defectsState.areas.filter((area, i) => area.isSavedToReport === true).map((area, i) => (
                    <Area
                        key={area.id}
                        areaId={area.id}
                        areaName={area.area_name}
                        areaProblems={area.problems}
                        dispatch={defectsDispatch}
                        // server={area.server ? true : false}
                        isSavedToReport={area.isSavedToReport}
                        setEdit={setEdit}
                        areaSamples={area.samples}
                    />
                ))
            }
            {
                defectsState.areas && defectsState.areas.filter((area, i) => area.isSavedToReport === false).map((area, i) => (
                    <Area
                        key={area.id}
                        areaId={area.id}
                        areaName={area.area_name}
                        areaProblems={area.problems}
                        dispatch={defectsDispatch}
                        // server={area.server ? true : false}
                        isSavedToReport={area.isSavedToReport}
                        setEdit={setEdit}
                        areaSamples={area.samples}
                    />
                ))
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
                    // title="הוספת לחצן מהיר"
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
                    // defectsState={defectsState}
                    defectsDispatch={defectsDispatch}
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

export default Defects