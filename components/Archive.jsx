import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import CommonSubHeader from "../common/CommonSubHeader";
import Line from "../common/Line";
import useServerProblems from "../hooks/useServerProblems";
import ArchiveIcon from '../icons/ArchiveIcon'
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const Archive = () => {
    // const [problemsState, problemsDispatch] = useServerProblems()

    const reportsSelector = useSelector((state) => state.sagaReport.reports, shallowEqual)

    console.log(
        `--- Archive/reportsSelector`, reportsSelector
    )

    return (
        <View style={styles.archive}>
            <CommonSubHeader
                title="עדכונים"
            />

            <View style={styles.archiveList}>
                {
                    reportsSelector !== null && reportsSelector.map((problem, i) => (
                        <View key={i}>
                            <ArchiveItem
                                timeStamp={problem.timeStamp}
                            />
                            {
                                reportsSelector.length - 1 !== i && <Line />
                            }
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Archive;

const ArchiveItem = ({
    timeStamp
}) => {
    return (
        <View style={styles.archiveItem}>
            <Text style={styles.archiveItemTitle}>
                {timeStamp}
            </Text>
            <ArchiveIcon />
        </View>
    )
}

const styles = StyleSheet.create({
    archive: {
        padding: responsiveWidth(30)
    },
    archiveItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: responsiveWidth(18)
    },
    archiveItemTitle: {
        color: colors.slateGrey,
        marginEnd: responsiveWidth(8),
        fontSize: fonts.regular,
        fontWeight: weights.thin
    }
})