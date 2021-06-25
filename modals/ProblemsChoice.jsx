import React from "react"
import { View } from "react-native"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import ShadowView from "../common/ShadowView"
import useModal from "../hooks/useModal"
import colors from "../utils/colors"
import layout, { responsiveHeight, responsiveWidth } from "../utils/layout"
import SavedProblems from "./SavedProblems"

export default function ProblemsChoice({
    problemsChoiceCLose,
    addDefaultProblem,
    areaId
}) {
    const [savedProblemsModalopen, savedProblemsModalclose, SavedProblemsModal] = useModal()

    return (
        <ShadowView
            shadowStyle={{
                paddingHorizontal: 0,
                paddingBottom: 0,
                maxWidth: layout.width > 600 ? responsiveWidth(360) : "100%"
            }}
        >
            <CommonHeader
                title="מבנה הדוח"
                close={problemsChoiceCLose}
                headerStyles={{
                    paddingHorizontal: responsiveWidth(28)
                }}
            />
            <View style={{
                flexDirection: 'row'
            }}>
                <CommonButton
                    borderRadius={0}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={'50%'}
                    buttonColor={colors.white}
                    titleColor={colors.azul}
                    title="חיפוש והוספת ליקוי"
                    titleStyle={{
                        marginRight: 0
                    }}
                    style={{
                        borderBottomStartRadius: 5,
                        borderBottomWidth: 1,

                    }}
                    onPress={() => savedProblemsModalopen()}
                />
                <CommonButton
                    borderRadius={0}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={'50%'}
                    buttonColor={colors.paleGrayBg}
                    titleColor={colors.azul}
                    title="הוספת ליקוי חדש +"
                    titleStyle={{
                        marginRight: 0
                    }}
                    style={{
                        borderBottomEndRadius: 5,
                        borderBottomWidth: 1,
                    }}
                    onPress={() => addDefaultProblem()}
                />
            </View>

            <SavedProblemsModal>
                <SavedProblems
                    savedProblemsModalclose={savedProblemsModalclose}
                    areaId={areaId}
                    problemsChoiceCLose={problemsChoiceCLose}
                />
            </SavedProblemsModal>
        </ShadowView>
    )
}