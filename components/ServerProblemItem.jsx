import React, { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native"
import Line from "../common/Line"
import useType from "../hooks/useType"
import AltImage from "../icons/AltImage"
import CircleArrowDown from "../icons/CircleArrowDown"
import CircleArrowUp from "../icons/CircleArrowUp"
import Tick from "../icons/Tick"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import layout, { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import stringSlicer from "../helpers/stringSlicer"

export default function ServerProblemItem({
    problem,
    addCheckedProblem,
    removeCheckedProblem
}) {
    const [checked, setChecked] = useState(false);

    const [isOpen, setOpen] = useState(false);

    const { type } = useType();

    const checkedHandler = () => {
        if (!checked) {
            setChecked(true)
            addCheckedProblem(problem.name)
        } else if (checked) {
            setChecked(false)
            removeCheckedProblem(problem.name)
        }
    };

    return (
        <View>
            <View style={styles.problemHeader}>
                {
                    type !== 1 && <View
                        style={styles.problemImageContainer}
                    >
                        {
                            problem.images.length > 0 &&
                                problem.images[0].length > 1
                                ? <Image
                                    source={{ uri: problem.images[0] }}
                                    style={{
                                        height: "100%",
                                        width: "100%"
                                    }}
                                />
                                : <AltImage
                                    height={responsiveWidth(42)}
                                    width={responsiveWidth(38)}
                                />
                        }
                    </View>
                }
                <View style={{
                    flexDirection: type === 1 ? 'row' : 'column-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text
                        style={{
                            width: '67%'
                        }}
                    >
                        {stringSlicer(problem.name, 20)}
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
                                    backgroundColor: checked
                                        ? colors.paleGrayBg
                                        : colors.white
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
                            <View style={styles.problemColumn}>
                                <Text style={styles.problemTitles}>
                                    {"מקצוע"}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {stringSlicer(problem.profession_name, 55)}
                                </Text>
                            </View>
                            <View style={styles.problemColumn}>
                                <Text style={styles.problemTitles}>
                                    {"תקלה"}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {stringSlicer(problem.details_of_eclipse, 55)}
                                </Text>
                            </View>
                            <View style={styles.problemColumn}>
                                <Text style={styles.problemTitles}>
                                    {"מה לעשות"}
                                </Text>
                                <Text style={styles.problemTitles}>
                                    {stringSlicer(problem.solution, 55)}
                                </Text>
                            </View>
                            <View style={styles.problemColumn}>
                                <Text style={styles.problemTitles}>
                                    {"מחיר"}
                                </Text>
                                <Text style={styles.problemDetails}>
                                    {stringSlicer(problem.cost, 55)}
                                </Text>
                            </View>
                            <ScrollView
                                horizontal={type === 2 ? false : true}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {
                                    problem.standarts &&
                                    problem.standarts.length >= 0 &&
                                    problem.standarts.map((standart, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.problemStandartsContainer,
                                                {
                                                    flexDirection: type === 2
                                                        ? 'row'
                                                        : 'column-reverse',
                                                    alignItems: type === 2
                                                        ? 'center'
                                                        : 'flex-start',
                                                    width: type === 2
                                                        ? '100%'
                                                        : 'auto'
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
                                                            source={{
                                                                uri: `data:image/png;base64,${standart.image}`
                                                            }}
                                                            style={{
                                                                height: responsiveWidth(73),
                                                                width: responsiveWidth(68)
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
                                                            width: type === 2
                                                                ? '85%'
                                                                : '90%'
                                                        }
                                                    ]}
                                                >
                                                    {standart.text}
                                                </Text>
                                                <Text
                                                    style={{
                                                        width: '10%',
                                                        marginLeft: type === 2
                                                            ? responsiveWidth(10)
                                                            : 0
                                                    }}
                                                >
                                                    {'\u2B24'}
                                                </Text>
                                            </View>

                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </>
                )
            }
            <Line />
        </View>
    );
};

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
    problemColumn: {
        width: '100%',
        marginVertical: responsiveWidth(8),
        justifyContent: 'center'
    },
    problemTitles: {
        fontSize: fonts.regular,
        fontWeight: weights.semiBold,
        color: colors.darkBlueGray,
        marginVertical: responsiveWidth(4)
    },
    problemImageContainer: {
        height: responsiveWidth(73),
        width: responsiveWidth(68),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.paleGrayBg
    }
});