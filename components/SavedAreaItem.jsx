import React, { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import CommonButton from "../common/CommonButton"
import Line from "../common/Line"
import useModal from "../hooks/useModal"
import Basket from "../icons/Basket"
import Tick from "../icons/Tick"
import ServerProblems from "../modals/ServerProblems"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"

export default function SavedAreaItem({ savedArea, addCheckedArea, removeCheckedArea, deleteSavedArea }) {
    const [checked, setChecked] = useState(false)

    const [savedProblemsModalopen, savedProblemsModalclose, SavedProblemsModal] = useModal()

    const checkedHandler = () => {
        if (!checked) {
            setChecked(true)
            addCheckedArea(savedArea.name)
        } else if (checked) {
            setChecked(false)
            removeCheckedArea(savedArea.name)
        }
    }

    return (
        <View>
            <View style={styles.savedAreaContainer}>
                <View style={styles.savedAreaDeleteButtonContainer}>
                    <TouchableOpacity
                        onPress={() => deleteSavedArea(savedArea.name)}

                    >
                        <Basket />
                    </TouchableOpacity>

                    <CommonButton
                        // buttonWidth={'20%'}
                        borderRadius={20}
                        buttonHeight={responsiveWidth(33)}
                        borderColor={colors.darkSkyBlue}
                        style={{
                            padding: 0,
                            paddingHorizontal: responsiveWidth(8),
                            marginHorizontal: responsiveWidth(8)
                        }}
                        titleStyle={{
                            marginRight: 0
                        }}
                        title="הוספת ליקוי"
                        titleColor={colors.darkSkyBlue}
                        onPress={() => savedProblemsModalopen()}
                    />
                </View>


                <Text>
                    {savedArea.name}
                </Text>

                <TouchableOpacity
                    onPress={() => checkedHandler(savedArea.name)}
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

            <Line />
            <SavedProblemsModal>
                <ServerProblems
                    savedProblemsModalclose={savedProblemsModalclose}
                    savedAreaName={savedArea.name}
                />
            </SavedProblemsModal>
        </View>
    )
}

const styles = StyleSheet.create({
    savedAreaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    savedAreaDeleteButtonContainer: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})