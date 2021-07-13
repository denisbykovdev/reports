import React, { memo, useEffect, useMemo, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import firstLevelTitles from "../constants/firstLevelTitles"
import stringSlicer from "../helpers/stringSlicer"
import useAuth from "../hooks/useAuth"
import useModal from "../hooks/useModal"
import Basket from "../icons/Basket"
import PassChange from "../modals/PassChange"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import FormContainer from "./FormContainer"
import FormMaskedField from "./FormMaskedField"
import PassChangeButton from "./PassChangeButton"
import FormButton from "./FormButton"

const TableRow = ({ itemData, dispatchMethod, itemWidth, tableTitles }) => {
    const { authState } = useAuth()

    const { token } = authState

    const [passModalOpen, passModalCLose, PassModalRender] = useModal()

    const deleteHandler = (itemId) => {
        dispatchMethod({
            type: "DELETE_ITEM",
            itemId
        })
        console.log(
            "___DDItem/delete:", itemId
        )
    }

    const submitItem = async (values) => {
        console.log(
            "--- TableRow/submitItem/itemData/report:", itemData.hasOwnProperty('status')
        )
        // console.log(
        //     "--- DDI/submitItem/values:", values
        // )

        if (itemData.hasOwnProperty('status')) {
            await dispatchMethod(watchUpdateReport(
                token,
                values,
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
        <View style={styles.rowContainer}>
            <FormContainer
                initialValues={itemData}
                onSubmit={(values) => submitItem(values)}
            >
                <View style={styles.rowIconsContainer}>
                    <TouchableOpacity onPress={() => deleteHandler(itemData.id)}>
                        <Basket />
                    </TouchableOpacity>
                    <FormButton
                        title={"עדכון"}
                        titleColor={colors.white}
                        buttonHeight={responsiveWidth(43)}
                        buttonColor={colors.darkSkyBlue}
                        buttonShadow={true}
                        style={{
                            width: 'auto',
                            // marginVertical: responsiveWidth(18),
                            // marginHorizontal: responsiveWidth(28),
                        }}
                        titleStyle={{
                            marginRight: 0
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row-reverse'
                }}>
                    {
                        Object.entries(itemData).map(([key, value], index) => {
                            if (tableTitles.hasOwnProperty(key) && key !== 'password') {
                                return <FormMaskedField
                                    key={index}
                                    fieldName={key}
                                    placeholder={
                                        typeof value === 'boolean' || 'number'

                                            ? JSON.stringify(value)
                                            : value
                                    }
                                    itemData={itemData}
                                    itemId={itemData.id}
                                    itemWidth={itemWidth}
                                />
                            }
                            else if (key === 'password') {
                                return <>
                                    <PassChangeButton
                                        itemWidth={itemWidth}
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
                                </>
                            }
                        })
                    }
                </View>
            </FormContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: responsiveWidth(15),
        paddingLeft: "12.5%",
        paddingRight: '3.5%',
        alignItems: 'flex-start'
    },
    rowIconsContainer: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '13%',
        paddingVertical: responsiveWidth(15),
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
})

export default TableRow



