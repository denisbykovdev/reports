import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Basket from "../icons/Basket";
import CircleArrowDown from "../icons/CircleArrowDown";
import CircleArrowUp from "../icons/CircleArrowUp";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import DropDownElement from "./DropDownElement";
import { useNavigation } from "@react-navigation/native";
import FormContainer from "./FormContainer";
import firstLevelTitles from "../constants/firstLevelTitles";
import FormButton from "./FormButton";
import useAuth from "../hooks/useAuth";
import stringSlicer from "../helpers/stringSlicer";
import { watchDeleteReport, watchUpdateReport } from "../actionCreators/sagaReport";
import { watchDeleteReportSaga } from "../sagas/watchDeleteReportSaga";
import PassChangeButton from "./PassChangeButton";
import useModal from "../hooks/useModal";
import PassChange from "../modals/PassChange";
import { Fragment } from "react";

const DropDownItem = ({ itemData, dispatchMethod }) => {
    const [isVisible, setVisible] = useState(false);

    const navigation = useNavigation()

    const [passModalOpen, passModalCLose, PassModalRender] = useModal()

    const { authState } = useAuth()

    const { token } = authState

    const deleteHandler = (itemId) => {
        if (itemData.hasOwnProperty('status')) {
            dispatchMethod(watchDeleteReport(
                token,
                itemId
            ))

        } else {
            dispatchMethod({
                type: "DELETE_ITEM",
                itemId
            })
        }
    }

    const openReportHandler = (id) =>
        navigation.navigate(
            "AppStack",
            {
                screen: "Report",
                params: {
                    reportId: id,
                    report: itemData
                }
            }
        )

    const submitItem = async (values) => {
        console.log(
            "--- DDI/submitItem/itemData/report:", itemData.hasOwnProperty('status')
        )

        let newValues = { ...values, id: Number(values.id) }

        if (itemData.hasOwnProperty('status')) {
            await dispatchMethod(watchUpdateReport(
                token,
                newValues.id,
                newValues,
                itemData.areas,
                itemData.notes
            ))
        } else {
            await dispatchMethod({
                type: "CHANGE_ITEM_VALUE",
                data: values,
                token,
                itemId: itemData.id
            })
        }
    }

    return (
        <View style={styles.itemContainer}>
            <View style={{
                backgroundColor: isVisible ? colors.paleGrayBg : colors.white
            }}>
                <View style={styles.itemButton}>

                    <TouchableOpacity
                        style={styles.basketIcon}
                        onPress={() => deleteHandler(itemData.id)}
                    >
                        <Basket />
                    </TouchableOpacity>
                    {
                        itemData.pending
                        &&
                        <View
                            style={{
                                // backgroundColor: 'yellow',
                                position: 'absolute',
                                left: 25
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: fonts.xsmall,
                                    // fontWeight: weights.thin,
                                    color: colors.darkBlueGray
                                }}
                            >
                                pending
                            </Text>
                        </View>
                    }
                    {
                        itemData && itemData.status === null || itemData.status ?
                            (
                                <TouchableOpacity
                                    onPress={
                                        () => openReportHandler(itemData.id)
                                    }
                                >
                                    <Text style={styles.itemTitle}>

                                        {itemData.report_adress !== null && stringSlicer(itemData.report_adress)} ,{itemData.id}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.itemTitle}>
                                    {itemData.name}
                                </Text>
                            )
                    }
                    <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        {
                            isVisible ? <CircleArrowUp /> : <CircleArrowDown />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {
                isVisible &&
                <View style={{
                    backgroundColor: isVisible ? colors.paleGrayBg : colors.white
                }}>
                    <FormContainer
                        initialValues={itemData}
                        onSubmit={(values) => submitItem(values)}
                    >
                        {
                            Object.entries(itemData).map(
                                ([key, value], index) => {
                                    if (key !== 'id' && key !== 'password' && firstLevelTitles.hasOwnProperty(key)) {
                                        return (
                                            <DropDownElement
                                                key={index}
                                                itemId={itemData.id}
                                                elementKey={key}
                                                elementValue={value}
                                                elementIndex={index}
                                                dispatchMethod={dispatchMethod}
                                            />
                                        )
                                    }
                                    else if (key === 'password' && firstLevelTitles.hasOwnProperty(key)) {
                                        return (
                                            <Fragment key={index}>
                                                <PassChangeButton
                                                    key={index}
                                                    onPress={() => passModalOpen()}
                                                />
                                                <PassModalRender>
                                                    <PassChange
                                                        close={passModalCLose}
                                                        id={itemData.id}
                                                        token={token}
                                                        dispatchMethod={dispatchMethod}
                                                    />
                                                </PassModalRender>
                                            </Fragment>
                                        )
                                    }
                                }
                            )
                        }
                        <FormButton
                            title={"עדכון"}
                            titleColor={colors.white}
                            buttonHeight={responsiveWidth(43)}
                            buttonColor={colors.darkSkyBlue}
                            buttonShadow={true}
                            style={{
                                width: 'auto',
                                marginVertical: responsiveWidth(18),
                                marginHorizontal: responsiveWidth(28),
                            }}
                        />
                    </FormContainer>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'yellow'
    },
    itemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: responsiveWidth(28),
        marginVertical: responsiveWidth(18),
        position: 'relative'
    },
    itemTitle: {
        marginHorizontal: responsiveWidth(14),
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small
    },
    darkText: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(18)
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
    basketIcon: {
        position: 'absolute',
        left: 0
    },
    line: {
        marginHorizontal: responsiveWidth(28),
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1)
    },
    itemElementContainer: {
        // backgroundColor: 'yellow',
        marginHorizontal: responsiveWidth(28),
        alignItems: 'flex-end'
    },
    input: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray
    }
})

export default DropDownItem;
