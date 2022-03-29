import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import Tick from "../icons/Tick"
import Problem from "./Problem"
import Basket from "../icons/Basket"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import weights from "../utils/weights"
import CommonButton from "../common/CommonButton"
import Line from "../common/Line"
import useModal from "../hooks/useModal"
import ProblemsChoice from "../modals/ProblemsChoice"
import FormField from "../common/FormField"
import useType from "../hooks/useType"
import ProfsProvider from "../providers/ProfsProvider"
import FormContainer from "../common/FormContainer"
import useChecked from "../hooks/useChecked"

export default function Area({
    areaId,
    areaName,
    areaProblems,
    dispatch,
    // server,
    isSavedToReport,
    setEdit,
    areaSamples
}) {

    const [isAreaOpen, setAreaOpen] = useState(false)

    const [isAreaForPrint, setAreaForPrint] = useState(isSavedToReport)

    const [openName, setOpenName] = useState(false)

    // const [flagged, setUpdateFlagged] = useState([])

    const [editSample, setEditSample] = useState(null)

    const [openSample, setOpenSample] = useState(false)

    const { isChecked, setChecked } = useChecked()

    const [problemsChoiceOpen, problemsChoiceCLose, ProblemsChoiceModal] = useModal()

    const { type } = useType()

    const transformServerProblemHandler = (problem) => {
        dispatch({
            type: "ADD_SERVER_PROBLEM_AS_DEFAULT_PROBLEM_TO_DEFAULT_ARIA",
            areaId,
            serverProblem: problem
        })
        // if (flagged.find(problem => problem.name === name)) {
        //     setUpdateFlagged(flagged => [...flagged.filter(problem => problem.name !== name)])
        // } else {
        //     setUpdateFlagged(flagged => [...flagged, areaProblems.find(problem => problem.name === name)])
        // }
    }

    const editServerProblemHandler = (sample) => {
        // setUpdateFlagged(flagged => [...flagged, areaProblems.find(problem => problem.name === name)])
        setOpenSample(!openSample)
        setEditSample(sample)
    }

    useEffect(() => {
        console.log(
            "--- Area/effect/areaProblems:",
            areaProblems,
            areaSamples
        )
    }, [
        areaProblems,
        areaSamples
    ])

    const deleteArea = () => {
        dispatch({
            type: "DELETE_AREA",
            areaId
        })
        isChecked && setChecked(false)
    }

    const addDefaultProblem = () => {
        setAreaOpen(true)
        dispatch({
            type: "ADD_DEFAULT_PROBLEM",
            areaId
        })

        isChecked && setChecked(false)
        problemsChoiceCLose()
    }

    const interSepter = (name, text) => {
        dispatch({
            type: "CHANGE_AREA_VALUE",
            areaId,
            areaKey: name,
            areaNewValue: text
        })
    }

    const setAreaForPrintHandler = () => {
        setAreaForPrint(!isAreaForPrint)
        if (isSavedToReport) {
            dispatch({
                type: "PUSH_AREA_FROM_PRINT",
                areaId
            })
        } else {
            dispatch({
                type: "PUSH_AREA_FOR_PRINT",
                areaId
            })
        }

        isChecked && setChecked(false)
    }

    return (
        <ProfsProvider>
            <View style={[styles.areaHeader, {
                backgroundColor: isAreaOpen ? colors.paleGrayBg : colors.white,
                flexDirection: type === 2 ? 'row-reverse' : 'column',
                // flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center'
            }]}>
                <View style={styles.areaHeaderActions}>

                    <TouchableWithoutFeedback onPress={() => setOpenName(!openName)}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // paddingLeft: responsiveWidth(30),
                            // backgroundColor: 'yellow',
                            justifyContent: 'flex-end',
                            width: '50%',
                            height: responsiveWidth(31)
                        }}>
                            <TouchableOpacity onPress={() => setOpenName(!openName)}>
                                {
                                    openName
                                        ?
                                        <FormContainer
                                            initialValues={{ area_name: '' }}
                                        >
                                            <FormField
                                                // area={true}
                                                placeholder={areaName}
                                                style={{
                                                    padding: 0,
                                                    height: responsiveWidth(31),
                                                    borderColor: colors.darkWhite,
                                                    borderWidth: responsiveWidth(2),
                                                    borderRadius: 20,
                                                    alignSelf: 'flex-end'
                                                }}
                                                // width="80%"
                                                // width="60%"
                                                name="area_name"
                                                interSepter={interSepter}
                                            />
                                        </FormContainer>

                                        : <Text
                                            style={styles.areaHeaderTitle}
                                        >{areaName}</Text>
                                }
                            </TouchableOpacity>


                            <Text
                                style={styles.areaHeaderId}
                            > | {areaId}.0</Text>

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity
                        onPress={() => setAreaForPrintHandler()}
                        style={[
                            styles.tickContainer,
                            {
                                backgroundColor: isSavedToReport ? colors.paleGrayBg : colors.white
                            }
                        ]}
                    >
                        {
                            isSavedToReport && <Tick />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setAreaOpen(!isAreaOpen)}
                        style={{
                            marginStart: responsiveWidth(14)
                        }}
                    >
                        {
                            isAreaOpen
                                ? <CircleArrowUp />
                                : <CircleArrowDown />
                        }
                    </TouchableOpacity>
                </View>

                <View style={[styles.areaHeaderOptionals, {
                    marginTop: type === 2 ? 0 : responsiveWidth(24),
                }]}>

                    <TouchableOpacity
                        onPress={() => deleteArea()}
                    >
                        <Basket />
                    </TouchableOpacity>

                    <CommonButton
                        // buttonWidth={'80%'}
                        borderRadius={20}
                        buttonHeight={responsiveWidth(33)}
                        borderColor={colors.darkSkyBlue}
                        style={{
                            padding: 0,
                            paddingHorizontal: responsiveWidth(70),
                            marginStart: type === 2 ? responsiveWidth(18) : 0
                        }}
                        titleStyle={{
                            marginRight: 0
                        }}
                        title="הוספת ליקוי"
                        titleColor={colors.darkSkyBlue}
                        onPress={() => problemsChoiceOpen()}
                    />
                </View>
                <ProblemsChoiceModal>
                    <ProblemsChoice
                        problemsChoiceCLose={problemsChoiceCLose}
                        addDefaultProblem={addDefaultProblem}
                        areaId={areaId}
                    />
                </ProblemsChoiceModal>

            </View>

            {
                isAreaOpen
                && (
                    <>
                        <ScrollView
                            horizontal
                            style={{
                                paddingHorizontal: responsiveWidth(28),
                                paddingVertical: responsiveWidth(18),
                                height: 'auto',
                                flexWrap: 'wrap',
                                flexDirection: 'row'
                            }}
                        >
                            {
                                areaSamples && areaSamples.map((sample, i) => (
                                    <TouchableOpacity
                                        onPress={() => transformServerProblemHandler(sample)}
                                        onLongPress={() => editServerProblemHandler(sample)}
                                        key={i}
                                        style={{
                                            paddingHorizontal: responsiveWidth(22),
                                            height: responsiveWidth(40),
                                            borderColor: colors.darkWhite,
                                            borderWidth: responsiveWidth(2),
                                            borderRadius: 8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: responsiveWidth(18)
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "300",
                                        }}>
                                            {sample.name} +
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        {
                            editSample !== null && openSample
                            && <Problem
                                isSample={true}
                                problem={editSample}
                                areaId={areaId}
                                areaName={areaName}
                                defectsDispatch={dispatch}
                                // serverArea={server}
                                setEdit={setEdit}
                            />
                        }
                    </>
                )
            }
            {
                isAreaOpen && areaProblems.map((problem, i) => (
                    <Problem
                        key={i}
                        problem={problem}
                        areaId={areaId}
                        defectsDispatch={dispatch}
                        setEdit={setEdit}
                    />
                ))
            }
            <Line />
        </ProfsProvider>
    )
}

const styles = StyleSheet.create({
    areaHeader: {
        // flexDirection: 'column',
        paddingHorizontal: responsiveWidth(28),
        paddingVertical: responsiveWidth(24)
    },
    areaHeaderActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    areaHeaderTitle: {
        fontSize: fonts.medium,
        fontWeight: weights.semiBold,
        textAlign: 'right',
        // height: responsiveWidth(31)
    },
    areaHeaderId: {
        fontSize: fonts.small,
        fontWeight: weights.thin,
        textAlign: 'right'
    },
    areaHeaderOptionals: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: responsiveWidth(24),
    },
    tickContainer: {
        height: responsiveWidth(24),
        width: responsiveWidth(24),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: responsiveWidth(14)
    }
})