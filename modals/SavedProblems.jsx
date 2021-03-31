import React, { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import SavedProblemItem from "../components/SavedProblemItem"
import useDefects from "../hooks/useDefects"
import useInput from "../hooks/useInput"
import useSavedProblems from "../hooks/useSavedProblems"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"

export default function SavedProblems({
    savedProblemsModalclose,
    savedAreaName,
    areaId,
    problemsChoiceCLose
}) {
    const [problemsState, problemsDispatch] = useSavedProblems()

    const {_, defectsDispatch} = useDefects()

    const [checkedProblems, setUpdateCheckedProblems] = useState([])

    const [inputText, onChange] = useInput()

    const [initSavedProblems, setSearchSavedProblems] = useState(problemsState.problems)

    const [savedProblemsState, savedProblemsDispatch] = useSavedProblems()

    useEffect(() => {
        if (inputText && inputText.length > 0) {

            const filtered = initSavedProblems.filter(savedProblem => Object.values(savedProblem).some(problemValue => problemValue.toString().toLowerCase().includes(inputText.toLowerCase())))


            setSearchSavedProblems(filtered)

        } else if (inputText <= 0) setSearchSavedProblems(problemsState.problems)
    }, [inputText])

    const addCheckedProblem = (checkedName) => {
        const newCheckedProblem = problemsState.problems.find(savedProblem => savedProblem.name === checkedName)

        setUpdateCheckedProblems(oldCheckedProblems => [...oldCheckedProblems, newCheckedProblem])
    }

    const removeCheckedProblem = (unCheckedName) => {
        setUpdateCheckedProblems(checkedProblems.filter(checkedProblem => checkedProblem.name !== unCheckedName))
    }

    const addSavedProblems = () => {
        if (savedAreaName) {
            defectsDispatch({
                type: "POST_PROBLEMS_TO_SAVED_AREA",
                areaName: savedAreaName,
                problems: checkedProblems
            })
        } else if (areaId) {
            defectsDispatch({
                type: "ADD_PROBLEMS_TO_ARIA",
                areaId,
                problems: checkedProblems
            })

            problemsChoiceCLose()
        }
    }

    return (
        <ShadowView>
            <CommonHeader
                close={savedProblemsModalclose}
                title="בחירת ליקוי"
            />
            <Line />

            <View style={styles.savedProblemsSearchContainer}>
                <TextInput
                    onChangeText={onChange}
                />
            </View>


            {
                problemsState && problemsState.problems.map((problem, i) => (
                    <SavedProblemItem
                        key={i}
                        problem={problem}
                        addCheckedProblem={addCheckedProblem}
                        removeCheckedProblem={removeCheckedProblem}
                        problemsDispatch={problemsDispatch}
                    />
                ))
            }

            <CommonButton 
                title="שמירה"
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
                onPress={() => addSavedProblems()}
            />

        </ShadowView>
    )
}

const styles = StyleSheet.create({

})