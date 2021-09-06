import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import useDefects from "../hooks/useDefects"
import useStandarts from "../hooks/useStandarts"
import AltImage from "../icons/AltImage"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import Plus from "../icons/Plus"
import useModal from "../hooks/useModal"
import NewStandart from "./NewStandart"
import useType from "../hooks/useType"
import useSearch from "../hooks/useSearch"
import Spinner from "../common/Spinner"
import fonts from "../utils/fonts"
import weights from "../utils/weights"
import useAuth from "../hooks/useAuth"
import stringSlicer from "../helpers/stringSlicer"

export default function Standarts({
    standartsModalClose,
    areaId,
    problemId,
    problemName,
    problemsDispatch,
    problem
}) {
    const [standartsState, standartsDispatch] = useStandarts()

    const [checkedStandarts, setUpdateCheckedStandarts] = useState([])

    const { _, defectsDispatch } = useDefects()

    const [newStandartModalOpen, newStandartModalClose, NewStandartModal] = useModal()

    const [searchArray, RenderSearch] = useSearch({ arrayOfObjects: standartsState.standarts !== null && standartsState.standarts })

    const { authState } = useAuth()

    const { token } = authState;

    const addCheckedStandart = (checkedId) => {
        const newCheckedStandart = standartsState.standarts.find(standart => standart.id === checkedId)

        setUpdateCheckedStandarts(oldCheckedStandarts => [...oldCheckedStandarts, newCheckedStandart])
    }

    const removeCheckedStandart = (unCheckedId) => {
        setUpdateCheckedStandarts(checkedStandarts.filter(standart => standart.id !== unCheckedId))
    }

    const addStandartsToProblem = () => {
        if (problemId) {
            defectsDispatch({
                type: "ADD_STANDARTS_TO_PROBLEM",
                areaId,
                problemId,
                standarts: checkedStandarts
            })
        } else if (problem) {
            problemsDispatch({
                type: "POST_STANDARTS_TO_SAVED_PROBLEM",
                token,
                problemName,
                problem: { ...problem, standarts: checkedStandarts }
                // standarts: checkedStandarts
            })
        }

        standartsModalClose()
    }

    return (
        <ShadowView>
            <CommonHeader
                title="בחירת תקן"
                close={standartsModalClose}
            />
            <Line />

            <RenderSearch
                searchInputWidth={'100%'}
            />

            {
                searchArray && searchArray.length > 0
                    ? searchArray.map((standart, i) =>
                        <StandartItem
                            key={i}
                            standart={standart}
                            addCheckedStandart={addCheckedStandart}
                            removeCheckedStandart={removeCheckedStandart}
                            standartsDispatch={standartsDispatch}
                        />
                    )
                    : standartsState && standartsState.standarts !== null && standartsState.standarts.map((standart, i) =>
                        // standartsState.fetching || standartsState.posting
                        //     ? <Spinner />
                        //     : 
                        <StandartItem
                            key={i}
                            standart={standart}
                            addCheckedStandart={addCheckedStandart}
                            removeCheckedStandart={removeCheckedStandart}
                            standartsDispatch={standartsDispatch}
                        />
                    )
            }

            <CommonButton
                title="תקן חדש"
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                buttonColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    paddingHorizontal: responsiveWidth(70),
                    marginTop: responsiveWidth(18)
                }}
                // titleStyle={{
                //     marginRight: 0
                // }}
                titleColor={colors.white}
                onPress={() => newStandartModalOpen()}
            >
                <Plus />
            </CommonButton>

            <NewStandartModal>
                <NewStandart
                    newStandartModalClose={newStandartModalClose}
                    standartsDispatch={standartsDispatch}
                />
            </NewStandartModal>

            <CommonButton
                title="הוספת תקן"
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
                onPress={() => addStandartsToProblem()}
            />
        </ShadowView>
    )
}

const StandartItem = ({
    standart,
    addCheckedStandart,
    removeCheckedStandart,
    standartsDispatch
}) => {
    const [checked, setChecked] = useState(false)

    const [isOpen, setOpen] = useState(false)

    const { type } = useType()

    const [newStandartModalOpen, newStandartModalClose, NewStandartModal] = useModal()

    const checkedHandler = () => {
        if (!checked) {
            setChecked(true)
            addCheckedStandart(standart.id)
        } else if (checked) {
            setChecked(false)
            removeCheckedStandart(standart.id)
        }
    }
    return (
        <View
            style={{
                // flexDirection: type === 2 ? 'row-reverse' : 'column',
                // alignItems: type === 2 ? 'center' : 'stretch',
                // justifyContent: 'center'
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    height: isOpen ? 'auto' : responsiveWidth(73),
                    justifyContent: 'space-between',
                    marginVertical: responsiveWidth(18),
                    alignItems: 'center'
                }}
            >
                {/* {type !== 2 && */}
                <TouchableOpacity
                    onPress={() => setOpen(!isOpen)}
                    style={{
                        // marginStart: responsiveWidth(14),
                    }}
                >
                    {
                        isOpen
                            ? <CircleArrowUp />
                            : <CircleArrowDown />
                    }
                </TouchableOpacity>
                {/* } */}

                <View style={{
                    height: responsiveWidth(73),
                    width: responsiveWidth(68),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.paleGrayBg
                }}>
                    {
                        standart.image !== null && standart.image.length > 1
                            ? <Image
                                style={{
                                    height: responsiveWidth(73),
                                    width: responsiveWidth(68),
                                }}
                                source={{ uri: `data:image/png;base64,${standart.image}` }}
                            />
                            : <AltImage
                                height={responsiveWidth(42)}
                                width={responsiveWidth(38)}
                            />

                    }
                </View>

                <CommonButton
                    title="לַעֲרוֹך"
                    borderRadius={20}
                    buttonWidth={responsiveWidth(68)}
                    buttonHeight={responsiveWidth(33)}
                    buttonColor={colors.darkSkyBlue}
                    style={{
                        padding: 0
                    }}
                    titleStyle={{
                        marginRight: 0
                    }}
                    titleColor={colors.white}
                    onPress={() => newStandartModalOpen()}
                />
                <NewStandartModal>
                    <NewStandart
                        newStandartModalClose={newStandartModalClose}
                        standartsDispatch={standartsDispatch}
                        isEdit={true}
                        standart={standart}
                    />
                </NewStandartModal>

                <TouchableOpacity
                    onPress={() => checkedHandler(standart.id)}
                    style={[
                        styles.tickContainer,
                        {
                            backgroundColor: checked ? colors.paleGrayBg : colors.white
                        }
                    ]}
                >
                    {
                        checked && <Tick />
                    }
                </TouchableOpacity>

            </View>
            {/* {
                isOpen
                &&
                <Text
                    style={styles.standartText}
                >
                    {standart.text}
                </Text>
            } */}
            {
                isOpen && (
                    <>
                        <Line />

                        <View style={styles.standartDescs}>
                            <View style={styles.standartRow}>
                                <Text style={styles.standartDetails}>
                                    {stringSlicer(standart.profession, 20)}
                                </Text>
                                <Text style={styles.standartTitles}>
                                    {"מקצוע"}
                                </Text>
                            </View>

                            <View style={styles.standartRow}>
                                <Text style={styles.standartDetails}>
                                    {stringSlicer(standart.fault, 20)}
                                </Text>
                                <Text style={styles.standartTitles}>
                                    {"תקלה"}
                                </Text>
                            </View>
                            <View style={styles.standartRow}>
                                <Text style={styles.standartDetails}>
                                    {stringSlicer(standart.whatToDo, 20)}
                                </Text>
                                <Text style={styles.standartTitles}>
                                    {"מה לעשות"}
                                </Text>
                            </View>
                            <View style={styles.standartRow}>
                                <Text style={styles.standartDetails}>
                                    {stringSlicer(standart.text, 20)}
                                </Text>
                                <Text style={styles.standartTitles}>
                                    {"תקן"}
                                </Text>
                            </View>
                        </View>

                    </>
                )
            }

            {/* {
                type === 2 && <Text
                    style={{
                        width: '70%',
                        paddingEnd: responsiveWidth(18)
                    }}
                >
                    {standart.text}
                   
                </Text>
            } */}
            <Line />
        </View>
    )
}

const styles = StyleSheet.create({
    tickContainer: {
        height: responsiveWidth(24),
        width: responsiveWidth(24),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        // marginStart: responsiveWidth(14)
    },
    standartRow: {
        flexDirection: "row",
        alignItems: 'baseline',
        width: '100%',
        marginVertical: responsiveWidth(18),
        justifyContent: 'flex-end'
    },
    standartDetails: {
        alignSelf: 'baseline',
        position: "absolute",
        left: 0,

        fontSize: fonts.small,
        fontWeight: weights.thin,
        color: colors.slateGrey
    },
    standartTitles: {
        fontSize: fonts.regular,
        fontWeight: weights.semiBold,
        color: colors.darkBlueGray
    },
})