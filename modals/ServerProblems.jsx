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
import Spinner from "../common/Spinner"
import useAuth from "../hooks/useAuth"

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

    const { authState } = useAuth()

    const { token } = authState;

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
                type: "POST_SERVER_PROBLEMS_TO_SERVER_AREA",
                token,
                areaName: savedAreaName,
                problems: checkedProblems
            })
        } else if (areaId) {
            defectsDispatch({
                type: "ADD_SERVER_PROBLEMS_TO_DEFAULT_ARIA",
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
                // title="בחירת ליקוי"
                title="בחירת בעיה שמורה"
            />
            <Line />

            <RenderSearch />

            {

                searchArray && searchArray.length > 0
                    ? searchArray.map((problem, i) => (
                        <ServerProblemItem
                            key={i}
                            problem={problem}
                            addCheckedProblem={addCheckedProblem}
                            removeCheckedProblem={removeCheckedProblem}
                            problemsDispatch={problemsDispatch}
                        />
                    ))
                    : problemsState.problems.map((problem, i) => (
                        problemsState.fetching
                            ? <Spinner />
                            :
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