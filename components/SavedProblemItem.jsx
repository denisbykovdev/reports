import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native"
import CommonButton from "../common/CommonButton"
import Line from "../common/Line"
import useModal from "../hooks/useModal"
import AltImage from "../icons/AltImage"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import Tick from "../icons/Tick"
import Standarts from "../modals/Standarts"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

export default function SavedProblemItem({
    problem,
    addCheckedProblem,
    removeCheckedProblem,
    problemsDispatch
}) {

    const [checked, setChecked] = useState(false)

    const [isOpen, setOpen] = useState(false)

    const [standartsModalOpen, standartsModalClose, StandartsModal] = useModal()

    const checkedHandler = () => {
        if (!checked) {
            setChecked(true)
            addCheckedProblem(problem.name)
        } else if (checked) {
            setChecked(false)
            removeCheckedProblem(problem.name)
        }
    }

    useEffect(() => {
        console.log(
            "___SavedProblems/effect", problem
        )
    }, [])

    return (
        <View>

            <View style={styles.problemHeader}>

                <CommonButton
                    title="הוספת תקן"
                    borderRadius={20}
                    buttonHeight={responsiveWidth(33)}
                    borderColor={colors.darkSkyBlue}
                    style={{
                        padding: 0,
                        paddingHorizontal: responsiveWidth(10),
                        // marginVertical: responsiveWidth(22)
                    }}
                    titleStyle={{
                        marginRight: 0
                    }}
                    titleColor={colors.darkSkyBlue}
                    onPress={() => standartsModalOpen()}
                />

                    <StandartsModal>
                        <Standarts
                            standartsModalClose={standartsModalClose}
                            problemName={problem.name}
                            problemsDispatch={problemsDispatch}
                        />
                    </StandartsModal>

                <View
                    style={styles.problemImageContainer}
                >
                    {
                        problem.image.length > 1
                            ? <Image
                                source={{ uri: problem.image }}

                            />
                            : <AltImage
                                height={responsiveWidth(42)}
                                width={responsiveWidth(38)}
                            />

                    }

                </View>


                <View style={{
                    flexDirection: 'column-reverse',
                    alignItems: 'flex-end'
                }}>
                    <Text>
                        {problem.name}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        
                    }}>
                        <TouchableOpacity
                            onPress={() => checkedHandler(problem.name)}
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

                        <TouchableOpacity
                            onPress={() => setOpen(!isOpen)}
                            style={{
                                marginStart: responsiveWidth(14)
                            }}
                        >
                            {
                                isOpen
                                    ? <CircleArrowUp />
                                    : <CircleArrowDown />
                            }
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            {
                isOpen && (
                    <>
                        <Line />



                        <View style={styles.problemDescs}>
                            <View style={styles.problemRow}>
                                <Text style={styles.problemDetails}>
                                    {problem.profession_name}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {"מקצוע"}
                                </Text>


                            </View>

                            <View style={styles.problemRow}>
                                <Text style={styles.problemDetails}>
                                    {problem.details_of_eclipse}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {"תקלה"}
                                </Text>


                            </View>
                            <View style={styles.problemRow}>
                                <Text style={styles.problemDetails}>
                                    {problem.solution}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {"מה לעשות"}
                                </Text>


                            </View>
                        </View>

                    </>
                )
            }

            <Line />
        </View>
    )
}

const styles = StyleSheet.create({
    problemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: responsiveWidth(24)
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
    problemRow: {
        flexDirection: "row",
        alignItems: 'baseline',
        width: '100%',
        marginVertical: responsiveWidth(18),
        justifyContent: 'flex-end'
    },
    problemDetails: {
        alignSelf: 'baseline',
        position: "absolute",
        left: 0,

        fontSize: fonts.small,
        fontWeight: weights.thin,
        color: colors.slateGrey
    },
    problemTitles: {
        fontSize: fonts.regular,
        fontWeight: weights.semiBold,
        color: colors.darkBlueGray
    },
    problemImageContainer: {
        height: responsiveWidth(73),
        width: responsiveWidth(68),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.paleGrayBg
    }
})