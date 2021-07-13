import React, { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import ServerProblemItem from "../components/ServerProblemItem"
import useDefects from "../hooks/useDefects"
import useServerProblems from "../hooks/useServerProblems"
import useSearch from "../hooks/useSearch"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"

export default function ServerProblems({
    savedProblemsModalclose,
    savedAreaName,
    areaId,
    problemsChoiceCLose
}) {
    const [problemsState, problemsDispatch] = useServerProblems()

    const { _, defectsDispatch } = useDefects()

    const [checkedProblems, setUpdateCheckedProblems] = useState([])

    const [searchArray, RenderSearch] = useSearch({ arrayOfObjects: problemsState.problems })

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

    useEffect(() => {
        console.log(
            `--- ServerProblems/effect/prop/problemsState:`, problemsState.problems
        )
    }, [])

    return (
        <ShadowView>
            <CommonHeader
                close={savedProblemsModalclose}
                title="בחירת ליקוי"
            />
            <Line />

            <RenderSearch />

            {
                searchArray && searchArray.length >= 0
                    ? searchArray.map((problem, i) => (
                        <ServerProblemItem
                            key={i}
                            problem={problem}
                            addCheckedProblem={addCheckedProblem}
                            removeCheckedProblem={removeCheckedProblem}
                            problemsDispatch={problemsDispatch}
                        />
                    ))
                    : problemsState && problemsState.problems.map((problem, i) => (
                        <ServerProblemItem
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