import React, { Fragment } from "react"
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
import { watchDeleteReport, watchUpdateReport } from "../actionCreators/sagaReport"
import { useState } from "react"
import Delete from "../modals/Delete"

const TableRow = ({ itemData, dispatchMethod, itemWidth, tableTitles }) => {
    const { authState } = useAuth()

    const { token } = authState

    const [passModalOpen, passModalCLose, PassModalRender] = useModal()

    const [openDeleteModal, closeDeleteModal, DeleteModal] = useModal()

    const [close, setClose] = useState(false)

    const deleteHandler = async (itemId) => {
        if (itemData.hasOwnProperty('status')) {
            await dispatchMethod(watchDeleteReport(
                token,
                itemId
            ))

        } else {
            await dispatchMethod({
                type: "DELETE_ITEM",
                itemId
            })
        }
    }

    const closeHelper = () => setClose(true)

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

        closeHelper()
    }

    return (
        <View style={styles.rowContainer}>
            <FormContainer
                initialValues={itemData}
                onSubmit={(values) => submitItem(values)}
            >
                <View style={styles.rowIconsContainer}>
                    <TouchableOpacity
                        // onPress={() => deleteHandler(itemData.id)}
                        onPress={() => openDeleteModal()}
                    >
                        <Basket />
                    </TouchableOpacity>

                    <DeleteModal
                        modalContainerStyle={{
                            paddingHorizontal: 0
                        }}
                    >
                        <Delete
                            closeDeleteModal={closeDeleteModal}
                            deleteNote={deleteHandler}
                            id={itemData.id}
                        />
                    </DeleteModal>

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

                {
                    itemData.pending
                    &&
                    <View
                        style={{
                            // position: 'absolute',
                            // left: 25,
                            alignItems: 'center',
                            alignSelf: 'center'
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
                    itemData.deleted
                    &&
                    <View
                        style={{
                            // position: 'absolute',
                            // left: 25,
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fonts.xsmall,
                                // fontWeight: weights.thin,
                                color: colors.darkBlueGray
                            }}
                        >
                            deleted
                        </Text>
                    </View>
                }

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
                                    close={close}
                                />
                            }
                            else if (key === 'password') {
                                return <Fragment key={index}>
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
                                </Fragment>
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



