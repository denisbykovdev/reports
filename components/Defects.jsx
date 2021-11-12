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
import useChecked from "../hooks/useChecked";
import { shallowEqual, useSelector } from "react-redux";
import Line from "../common/Line";
import useSearch from "../hooks/useSearch";

const Defects = ({
    areas,
    setEdit,
    // reportId
}) => {
    // const areas = reportId !== undefined && reportId !== null && useSelector(state => state.sagaReport.reports.filter(report => report.id === reportId)[0].areas, shallowEqual)

    const { defectsState, defectsDispatch } = useDefects()

    const [savedAreasModalOpen, savedAreasModalClose, SavedAreasModalContent] = useModal();

    const { isChecked, setChecked } = useChecked()

    const [searchArray, RenderSearch, searchText] = useSearch({ arrayOfObjects: defectsState.areas, withElaboration: true })

    useEffect(() => {
        if (areas && areas !== null && areas.length > 0) {
            defectsDispatch({
                type: "CLEAR_AREAS"
            })

            defectsDispatch({
                type: "ADD_REPORT_AREAS",
                reportAreas: areas
            })
        } else {
            defectsDispatch({
                type: "CLEAR_AREAS"
            })
        }


        console.log(
            `--- Defects/areas:`, areas
        )
    }, [])

    const addArea = () => {
        defectsDispatch({
            type: "ADD_DEFAULT_AREA"
        })
        isChecked && setChecked(false)
    }

    return (
        <>
            <View
                style={{
                    paddingHorizontal: responsiveWidth(31),
                    paddingBottom: responsiveWidth(17)
                }}
            >
                <RenderSearch />
            </View>

            <Line />
            
            {
                searchArray && searchText.length > 0  

                ? searchArray.map((area, i) => area !== false && (
                    // <View
                    // key={area.id}
                    // style={{
                    //     borderColor: 'yellow',
                    //     borderWidth: responsiveWidth(3)
                    // }}
                    // >
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
                    // </View>
                    
                ))

                :
                
                (
                    <View>
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
                    </View>
                )
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
                    // title="חיפוש והוספת איזור"a
                    title="הוספת אזור לרשימה"
                    titleStyle={{
                        marginRight: 0
                    }}
                    style={{
                        borderBottomStartRadius: 5,
                        borderBottomWidth: 1
                    }}
                    onPress={() => savedAreasModalOpen()}
                />
                <CommonButton
                    borderRadius={0}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={'50%'}
                    buttonColor={colors.paleGrayBg}
                    titleColor={colors.azul}
                    title="הוספת אזור +"
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