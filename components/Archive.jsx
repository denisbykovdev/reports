import React, { useEffect } from "react";
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

const Archive = ({
    reportId
}) => {
    const reportsSelector = reportId !== undefined && reportId !== null && useSelector((state) => state.sagaReport.reports.filter(report => report.id === reportId)[0], shallowEqual)

    // useEffect(() => {
    //     console.log(
    //         `--- Archive/reportsSelector`,
    //         reportsSelector,
    //         reportId
    //     )
    // }, [reportsSelector])

    return (
        <View style={styles.archive}>
            <CommonSubHeader
                title="עדכונים"
            />

            <View style={styles.archiveList}>
                {
                    reportsSelector !== undefined
                        ?
                        Array.isArray(reportsSelector.timeStamp)
                            ?
                            reportsSelector.timeStamp.map((data, i) => (
                                <View key={i}>
                                    <ArchiveItem
                                        timeStamp={data}
                                    />
                                    {
                                        reportsSelector.timeStamp.length - 1 !== i && <Line />
                                    }
                                </View>
                            ))
                            :
                            <View>
                                <ArchiveItem
                                    timeStamp={reportsSelector.timeStamp}
                                />
                                <Line />
                            </View>
                        : <View>
                            <ArchiveItem
                            // timeStamp={reportsSelector.timeStamp}
                            />
                            <Line />
                        </View>
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