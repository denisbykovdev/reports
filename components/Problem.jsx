import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import CommonButton from "../common/CommonButton"
import FormField from "../common/FormField"
import FormSelect from "../common/FormSelect"
import ItemTitle from "../common/ItemTitle"
import Line from "../common/Line"
import Basket from "../icons/Basket"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import layout, { responsiveHeight, responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import Copy from "../icons/Copy"
import FormPhotoCamera from "../common/FormPhotoCamera"
import FormContainer from "../common/FormContainer"
import FormButton from "../common/FormButton"
import useServerProblems from "../hooks/useServerProblems"
import useModal from "../hooks/useModal"
import Standarts from "../modals/Standarts"
import AltImage from "../icons/AltImage"
import Professions from "../modals/Professions"
import useProfs from "../hooks/useProfs"
import useType from "../hooks/useType"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { useCallback } from "react"
import ProfsProvider from "../providers/ProfsProvider"

const testArray = ['one', 'two', 'three']

export default function Problem({
    problem,
    areaId,
    areaName,
    // serverArea,
    defectsDispatch,
    isSample = false,
    setEdit
}) {

    const [isProblemOpen, setProblemOpen] = useState(false)

    const [isProblemForPrint, setProblemForPrint] = useState(problem.isSavedToReport)

    const [problemsState, problemsDispatch] = useServerProblems()

    const [standartsModalOpen, standartsModalClose, StandartsModal] = useModal()

    const [profModalOpen, profModalClose, ProfModal] = useModal()

    const [openName, setOpenName] = useState(false)

    const { profsState, profsDispatch } = useProfs()

    const { type } = useType()

    const { authState } = useAuth()

    const { token } = authState;

    const submitProblem = async (values) => {
        console.log(
            "--- Problem/submitProblem/problem:",
            { ...values, standarts: [...problem.standarts] }
        )
        console.log(
            "--- Problem/submitProblem/problem/isSample:",
            isSample
        )
        if (isSample === true) {
            await problemsDispatch({
                type: "UPDATE_SERVER_PROBLEM",
                token,
                problem: { ...values, standarts: [...problem.standarts] },
                problemName: problem.name
            });
            await defectsDispatch({
                type: "UPDATE_PROBLEM_IN_SERVER_AREA",
                token,
                areaProblem: { ...values, standarts: [...problem.standarts] },
                problemName: problem.name,
                areaName
            });
        }
        else {
            await problemsDispatch({
                type: "POST_SERVER_PROBLEM",
                token,
                problem: { ...values, standarts: [...problem.standarts] }
            })
        }
    }

    const interSepter = (name, text) => {
        defectsDispatch({
            type: "CHANGE_PROBLEM_VALUE",
            areaId,
            problemId: problem.id,
            problemKey: name,
            problemNewValue: text
        })
    }

    const deleteProblem = () => {
        defectsDispatch({
            type: "DELETE_PROBLEM",
            areaId,
            problemId: problem.id
        })
    }

    const setProblemForPrintHandler = () => {
        setProblemForPrint(!isProblemForPrint)

        if (problem.isSavedToReport) {
            defectsDispatch({
                type: "CHANGE_PROBLEM_VALUE",
                areaId,
                problemId: problem.id,
                problemKey: 'isSavedToReport',
                problemNewValue: false
            })
        } else {
            defectsDispatch({
                type: "CHANGE_PROBLEM_VALUE",
                areaId,
                problemId: problem.id,
                problemKey: 'isSavedToReport',
                problemNewValue: true
            })
        }
    }

    return (
        // <ProfsProvider>
        <View
            style={styles.problemContainer}
        >
            {
                !isProblemOpen && <Line />
            }
            <FormContainer
                initialValues={{
                    id: problem.id,
                    name: problem.name,
                    details_of_eclipse: problem.details_of_eclipse,
                    profession_name: problem.profession_name,
                    solution: problem.solution,
                    image: problem.image,
                    cost: problem.cost,
                }}
                onSubmit={
                    (values) => submitProblem(values)
                }
            >
                <View
                    style={[
                        styles.problemHeader,
                        {
                            backgroundColor: isProblemOpen ? colors.paleGrayBg : colors.white,
                            borderRadius: 5,
                            // flexDirection: 'column',
                        }
                    ]}
                >
                    <View style={[styles.problemHeaderOptionals, {
                        justifyContent: type === 2 ? 'center' : 'flex-start'
                    }]}>
                        {isSample === false && <TouchableOpacity
                            onPress={() => deleteProblem()}
                        >
                            <Basket />
                        </TouchableOpacity>}

                    </View>

                    <View style={[styles.problemHeaderActions, {
                        flexDirection: type === 2 ? 'row-reverse' : 'column',
                        alignItems: type === 2 ? 'center' : 'flex-end',
                    }]}>
                        <View style={[styles.problemHeaderActionsButtons, {
                            marginBottom: type === 2 ? 0 : responsiveWidth(8)
                        }]}>
                            {isSample === false && <TouchableOpacity
                                onPress={() => setProblemForPrintHandler()}
                                style={[
                                    styles.tickContainer,
                                    {
                                        backgroundColor: problem.isSavedToReport ? colors.paleGrayBg : colors.white
                                    }
                                ]}
                            >
                                {
                                    problem.isSavedToReport && <Tick />
                                }
                            </TouchableOpacity>
                            }
                            <TouchableOpacity
                                onPress={() => setProblemOpen(!isProblemOpen)}
                                style={{
                                    marginStart: responsiveWidth(14)
                                }}
                            >
                                {
                                    isProblemOpen
                                        ? <CircleArrowUp />
                                        : <CircleArrowDown />
                                }
                            </TouchableOpacity>
                        </View>

                        <TouchableWithoutFeedback onPress={() => setOpenName(!openName)}>
                            <View style={styles.problemHeaderActionsTitleGroup}>

                                <TouchableOpacity onPress={() => setOpenName(!openName)}>
                                    {
                                        openName && isSample === false
                                            ? <FormField
                                                // area={true}
                                                placeholder={problem.name}
                                                style={{
                                                    padding: 0,
                                                    height: responsiveWidth(31),
                                                    borderColor: colors.darkWhite,
                                                    borderWidth: responsiveWidth(2),
                                                    borderRadius: 20,
                                                    alignSelf: 'flex-end'
                                                }}
                                                width="90%"
                                                name="name"
                                                interSepter={interSepter}
                                            />
                                            : <Text
                                                style={styles.problemHeaderActionsTitle}
                                            >{problem.name}</Text>
                                    }
                                </TouchableOpacity>
                                {
                                    isSample === false
                                        ? <Text
                                            style={styles.problemHeaderActionsId}
                                        > | {areaId}.{problem.id}
                                        </Text>
                                        : <Text
                                            style={styles.problemHeaderActionsId}
                                        > + </Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>

                {
                    isProblemOpen &&
                    <View>

                        <View style={{
                            flexDirection: type === 2 ? 'row-reverse' : 'column',
                            justifyContent: type === 2 ? 'space-between' : 'flex-start',
                            marginBottom: type === 2 ? responsiveWidth(18) : 0
                        }}>

                            <View style={{
                                width: type === 2 ? '50%' : '100%'
                            }}>
                                <ItemTitle
                                    style={styles.titles}
                                    title="מקצוע" />
                                <FormSelect
                                    placeholder="בחר מקצוע"
                                    array={profsState.profs && profsState.profs}
                                    name="profession_name"
                                    interSepter={interSepter}
                                />
                                <CommonButton
                                    //professions
                                    title="מקצועות"
                                    borderRadius={20}
                                    buttonHeight={responsiveWidth(33)}
                                    borderColor={colors.darkSkyBlue}
                                    style={{
                                        padding: 0,
                                        paddingHorizontal: responsiveWidth(70),
                                        marginBottom: responsiveWidth(22)
                                    }}
                                    titleStyle={{
                                        marginRight: 0,
                                        flexDirection: 'row'
                                    }}
                                    titleColor={colors.darkSkyBlue}
                                    onPress={() => profModalOpen()}
                                />
                                <ProfModal>
                                    <Professions
                                        profModalClose={profModalClose}
                                    />
                                </ProfModal>

                                <Line />
                                <ItemTitle
                                    style={styles.titles}
                                    title="פרטי הליקוי" />
                                <FormField
                                    area={true}
                                    //problem details
                                    placeholder="בחר ליקוי"
                                    style={styles.inputContainerArea}
                                    inputStyle={{
                                        marginEnd: 0
                                    }}
                                    name="details_of_eclipse"
                                    interSepter={interSepter}
                                />
                                <ItemTitle
                                    style={styles.titles}
                                    title="פתרון" />
                                <FormField
                                    area={true}
                                    placeholder="רשום פתרון לליקוי"
                                    style={styles.inputContainerArea}
                                    inputStyle={{
                                        marginEnd: 0
                                    }}
                                    name="solution"
                                    interSepter={interSepter}
                                />
                            </View>

                            <View style={{
                                width: type === 2 ? '40%' : '100%',
                                alignItems: 'flex-end'
                            }}>
                                <ItemTitle
                                    style={styles.titles}
                                    title="תמונות"
                                />
                                <FormPhotoCamera
                                    name="image"
                                    interSepter={interSepter}
                                    setEdit={setEdit}
                                />
                            </View>

                        </View>

                        {type !== 2 && <Line />}

                        <View
                            style={{
                                width: type === 2 ? '50%' : '100%',
                                alignSelf: 'flex-end'
                            }}
                        >
                            <ItemTitle
                                style={styles.titles}
                                title="הערכת עלות" />
                            <FormField
                                placeholder="רשום הערכת עלות"
                                style={styles.inputContainer}
                                name="cost"
                                interSepter={interSepter}
                            />

                            <CommonButton
                                title="הוספת תקן"
                                borderRadius={20}
                                buttonHeight={responsiveWidth(33)}
                                borderColor={colors.darkSkyBlue}
                                style={{
                                    padding: 0,
                                    paddingHorizontal: responsiveWidth(70),
                                    marginVertical: responsiveWidth(22),
                                    paddingHorizontal: type === 2 ? responsiveWidth(18) : 0
                                }}
                                titleStyle={{
                                    marginRight: 0
                                }}
                                titleColor={colors.darkSkyBlue}
                                onPress={() => standartsModalOpen()}
                                buttonWidth={type === 2 ? 'auto' : '100%'}
                            />

                            <StandartsModal
                            // modalContentStyle={{
                            //     width: type === 2 ? responsiveWidth(600) : 'auto'
                            // }}
                            >
                                <Standarts
                                    standartsModalClose={standartsModalClose}
                                    areaId={areaId}
                                    problemId={problem.id}
                                />
                            </StandartsModal>
                        </View>

                        <ScrollView
                            horizontal={type === 2 ? false : true}
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                problem.standarts && problem.standarts.length >= 0 && problem.standarts.map((standart, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.problemStandartsContainer,
                                            {
                                                flexDirection: type === 2 ? 'row' : 'column-reverse',
                                                alignItems: type === 2 ? 'center' : 'flex-start',
                                                width: type === 2 ? '100%' : 'auto'
                                            }
                                        ]}
                                    >
                                        <View style={{
                                            height: responsiveWidth(73),
                                            width: responsiveWidth(68),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: colors.paleGrayBg
                                        }}>
                                            {
                                                standart.image && standart.image.length >= 1
                                                    ? <Image
                                                        // source={{ uri: standart.image }}
                                                        source={{ uri: `data:image/png;base64,${standart.image}` }}
                                                        style={{
                                                            height: responsiveWidth(73),
                                                            width: responsiveWidth(68),
                                                        }}
                                                    />
                                                    : <AltImage
                                                        height={responsiveWidth(42)}
                                                        width={responsiveWidth(38)}
                                                    />

                                            }
                                        </View>

                                        <View
                                            style={[
                                                styles.problemStandartBody,
                                                {
                                                    flexDirection: 'row',
                                                    marginVertical: responsiveWidth(22),
                                                    width: layout.width - responsiveWidth(118)
                                                }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.problemStandartText,
                                                    {
                                                        width: type === 2 ? '85%' : '90%'
                                                    }
                                                ]}
                                            >
                                                {standart.text}
                                            </Text>
                                            <Text
                                                style={{
                                                    width: '10%',
                                                    marginLeft: type === 2 ? responsiveWidth(10) : 0
                                                }}
                                            >
                                                {'\u2B24'}
                                            </Text>
                                        </View>

                                    </View>
                                ))
                            }
                        </ScrollView>

                        <FormButton
                            title="הוספת הליקוי והפתרון לארכיון"
                            borderRadius={20}
                            buttonHeight={responsiveWidth(33)}
                            borderColor={colors.darkSkyBlue}
                            style={{
                                padding: 0,
                                marginVertical: responsiveWidth(22),
                                alignSelf: 'flex-end',
                                paddingHorizontal: type === 2 ? responsiveWidth(18) : 0
                            }}
                            buttonWidth={type === 2 ? 'auto' : '100%'}
                            titleStyle={{
                                marginRight: 0
                            }}
                            titleColor={colors.darkSkyBlue}
                        />

                    </View>
                }
            </FormContainer>
        </View>
        // </ProfsProvider>
    )
}

const styles = StyleSheet.create({
    problemContainer: {
        paddingHorizontal: responsiveWidth(28),
    },
    problemEclipsesBoard: {
        paddingVertical: responsiveWidth(18)
    },
    problemHeader: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(18),
        paddingVertical: responsiveWidth(18),
        justifyContent: 'space-between',
        height: responsiveWidth(96)
    },
    problemHeaderOptionals: {
        justifyContent: 'space-between'
    },
    problemHeaderActions: {
        // alignItems: 'flex-end',
        maxWidth: '75%',
        justifyContent: "space-between"
    },
    problemHeaderActionsButtons: {
        flexDirection: 'row',
        // marginBottom: responsiveWidth(8)
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
    },
    problemHeaderActionsTitleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    problemHeaderActionsTitle: {
        fontSize: fonts.medium,
        fontWeight: weights.semiBold,
        textAlign: 'right'
    },
    problemHeaderActionsId: {
        fontSize: fonts.small,
        fontWeight: weights.thin,
        textAlign: 'right'
    },
    titles: {
        marginTop: responsiveWidth(24)
    },
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        marginBottom: responsiveWidth(24)
    },
    inputContainerArea: {
        // padding: 0,
        height: responsiveWidth(69),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 10,
        // marginVertical: responsiveWidth(24),
        // minHeight: responsiveHeight(69),
        textAlign: 'right'
    }
})