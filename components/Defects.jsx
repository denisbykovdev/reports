import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import CommonButton from "../common/CommonButton";
import FormField from "../common/FormField";
import FormPhotoCamera from "../common/FormPhotoCamera";
import FormSelect from "../common/FormSelect";
import ItemTitle from "../common/ItemTitle";
import Line from "../common/Line";
import Basket from "../icons/Basket";
import CircleArrowDown from "../icons/CircleArrowDown";
import CircleArrowUp from "../icons/CircleArrowUp";
import Tick from "../icons/Tick";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveHeight, responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const testArray = ['one', 'two', 'three']

const defectsDefault = [
    {
        "id": 1,
        "name": "בניין 1 - גג עליון",
        "created_at": "2021-02-03T11:16:36.000000Z",
        "problems": [
            {
                "id": 1,
                "profession": {
                    "id": 1,
                    "name": "asdasdasdasd"
                },
                "details_of_eclipse": "test test",
                "cost": 115.2,
                "image": "/storage/problems/1612350996.png",
                "created_at": "2021-02-03T11:16:36.000000Z"
            }
        ]
    }
]

const Defects = ({ defects }) => {

    const [isDefectOpen, setDefectOpen] = useState(false)

    const [isDefectSaved, setDefectSaved] = useState(false)

    const [isSubDefectSaved, setSubDefectSaved] = useState(false)

    const [isSubDefectOpen, setSubDefectOpen] = useState(false)

    const defectsArray = defects ? defects : defectsDefault

    return (
        <View style={styles.defectsContainer}>

            <Text style={styles.defectsSearch}>
                <TextInput
                    placeholder="... חיפוש לפי בדיקות"
                    style={styles.inputContainer}
                />
            </Text>
            {
                defectsArray.map(((e, i) => (
                    <View
                        key={i}
                        style={styles.defectsItem}
                    >
                        <View style={[styles.defectsItemHeader, {
                            backgroundColor: isDefectOpen ? colors.paleGrayBg : colors.white
                        }]}>
                            <View style={styles.defectsItemHeaderActions}>
                                <Text style={styles.defectsItemHeaderTitle}> {e.name} </Text>
                                <TouchableOpacity
                                    onPress={() => setDefectSaved(!isDefectSaved)}
                                    style={[styles.tickContainer, {
                                        backgroundColor: isDefectSaved ? colors.paleGrayBg : colors.white
                                    }]}
                                >
                                    {
                                        isDefectSaved && <Tick />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setDefectOpen(!isDefectOpen)}
                                    style={{
                                        marginStart: responsiveWidth(14)
                                    }}
                                >
                                    {
                                        isDefectOpen
                                            ? <CircleArrowUp />
                                            : <CircleArrowDown />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.defectsItemHeaderOptionals}>
                                <TouchableOpacity
                                // onPress={}
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
                                        paddingHorizontal: responsiveWidth(70)
                                    }}
                                    titleStyle={{
                                        marginRight: 0
                                    }}
                                    title="הוספת ליקוי"
                                    titleColor={colors.darkSkyBlue}
                                />
                            </View>
                        </View>
                        {
                            isDefectOpen && e.problems.map((atom, index) => (
                                <View
                                    key={index}
                                    style={styles.defectsItemInner}
                                >
                                    <View style={styles.defectsItemInnerEclipses}></View>

                                    <View style={[styles.subDefectsItemHeader, {
                                        backgroundColor: isSubDefectOpen ? colors.paleGrayBg : colors.white
                                    }]}>
                                        <View style={styles.subDefectsItemHeaderOptionals}>
                                            <TouchableOpacity
                                            // onPress={}
                                            >
                                                <Basket />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                            // onPress={}
                                            >
                                                <Basket />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.subDefectsItemHeaderActions}>
                                            <View style={styles.subDefectsItemHeaderActionsButtons}>
                                                <TouchableOpacity
                                                    onPress={() => setSubDefectSaved(!isDefectSaved)}
                                                    style={[styles.tickContainer, {
                                                        backgroundColor: isSubDefectSaved ? colors.paleGrayBg : colors.white
                                                    }]}
                                                >
                                                    {
                                                        isSubDefectSaved && <Tick />
                                                    }
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => setSubDefectOpen(!isSubDefectOpen)}
                                                    style={{
                                                        marginStart: responsiveWidth(14)
                                                    }}
                                                >
                                                    {
                                                        isSubDefectOpen
                                                            ? <CircleArrowUp />
                                                            : <CircleArrowDown />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.defectsItemHeaderTitle}> {e.name} </Text>
                                        </View>
                                    </View>
                                    {
                                        isSubDefectOpen &&
                                        <>
                                            <ItemTitle
                                                style={styles.titles}
                                                title="מקצוע" />
                                            <FormSelect
                                                placeholder="בחר מקצוע"
                                                array={testArray}
                                            />
                                            <Line />
                                            <ItemTitle
                                                style={styles.titles}
                                                title="פרטי הליקוי" />
                                            <FormField
                                                area={true}
                                                placeholder="בחר מקצוע"
                                                style={styles.inputContainerArea}
                                                inputStyle={{
                                                    marginEnd: 0
                                                }}
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
                                            />
                                            <CommonButton
                                                title="הוספת הליקוי והפתרון לארכיון"

                                                borderRadius={20}
                                                buttonHeight={responsiveWidth(33)}
                                                borderColor={colors.darkSkyBlue}
                                                style={{
                                                    padding: 0,
                                                    paddingHorizontal: responsiveWidth(70)
                                                }}
                                                titleStyle={{
                                                    marginRight: 0
                                                }}
                                                title="הוספת ליקוי"
                                                titleColor={colors.darkSkyBlue}
                                            />
                                            <ItemTitle
                                                style={styles.titles}
                                                title="דחיפות הבדיקה"
                                            />
                                            <FormPhotoCamera
                                                name="image"
                                            />
                                            <Line />
                                            <ItemTitle
                                                style={styles.titles}
                                                title="הערכת עלות" />
                                            <FormField
                                                placeholder="רשום הערכת עלות"
                                                style={styles.inputContainer}
                                            />
                                            <CommonButton
                                                title="הוספת תקן"

                                                borderRadius={20}
                                                buttonHeight={responsiveWidth(33)}
                                                borderColor={colors.darkSkyBlue}
                                                style={{
                                                    padding: 0,
                                                    paddingHorizontal: responsiveWidth(70)
                                                }}
                                                titleStyle={{
                                                    marginRight: 0
                                                }}
                                                title="הוספת ליקוי"
                                                titleColor={colors.darkSkyBlue}
                                            />
                                            {/* standartsText */}
                                            {/* standartsPhoto */}
                                        </>
                                    }
                                </View>
                            ))
                        }
                    </View>
                )))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    defectsContainer: {
        // paddingHorizontal: responsiveWidth(28)
    },
    defectsSearch: {
        marginVertical: responsiveWidth(24),
    },
    defectsItemHeader: {
        flexDirection: 'column',
        paddingHorizontal: responsiveWidth(28),
        paddingVertical: responsiveWidth(24)
    },
    defectsItemHeaderActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    subDefectsItemHeader: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(18),
        paddingVertical: responsiveWidth(18),
        justifyContent: 'space-between',

        height: responsiveWidth(96)
    },
    subDefectsItemHeaderActions: {
        alignItems: 'flex-end',
        maxWidth: '75%'
    },
    subDefectsItemHeaderActionsButtons: {
        flexDirection: 'row',
        marginBottom: responsiveWidth(8)
    },
    subDefectsItemHeaderOptionals: {
        justifyContent: 'space-between'
    },

    defectsItemHeaderTitle: {
        fontSize: fonts.medium,
        fontWeight: weights.semiBold,
        textAlign: 'right'
    },
    defectsItemHeaderOptionals: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveWidth(24),
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
    defectsItemInner: {
        paddingHorizontal: responsiveWidth(28),
    },
    defectsItemInnerEclipses: {
        paddingVertical: responsiveWidth(18)
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
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 10,
        marginVertical: responsiveWidth(24),
        minHeight: responsiveHeight(69),
        textAlign: 'right'
    },
    titles: {
        marginTop: responsiveWidth(24)
    }
})

export default Defects;