import React, { useCallback, useEffect } from "react"
import { useRef } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import CommonSubHeader from "../common/CommonSubHeader"
import FormButton from "../common/FormButton"
import FormContainer from "../common/FormContainer"
import FormField from "../common/FormField"
import ItemTitle from "../common/ItemTitle"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import useAuth from "../hooks/useAuth"
import useProfs from "../hooks/useProfs"
import useSearch from "../hooks/useSearch"
import Basket from "../icons/Basket"
import Plus from "../icons/Plus"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

export default function Proffessions({
    profModalClose
}) {
    // const initialRender = useRef(true)

    const { profsState, profsDispatch } = useProfs()

    const { authState } = useAuth()

    const { token } = authState

    const [searchArray, RenderSearch] = useSearch({ array: profsState && profsState.profs })

    const submitNewProf = async (values) => {
        await profsDispatch({
            type: "POST_NEW_PROF",
            token,
            newProf: values.profName
        })
    }

    const deleteProfItem = useCallback((profName) => {
        profsDispatch({
            type: "DELETE_PROF",
            profName
        })
    }, [])

    return (
        <ShadowView>
            <CommonHeader
                title="ניהול מקצועות
                שמורים במערכת"
                close={profModalClose}
            />
            <Line />

            <FormContainer
                initialValues={{ profName: '' }}
                onSubmit={
                    (values) => submitNewProf(values)
                }
            >
                <FormField
                    name="profName"
                    placeholder="רשום שם מקצוע חדש"
                    style={styles.inputContainer}
                />
                <FormButton
                    title="הוספה"
                    borderRadius={20}
                    buttonHeight={responsiveWidth(33)}
                    buttonColor={colors.darkSkyBlue}
                    style={{
                        padding: 0,
                        paddingHorizontal: responsiveWidth(70),
                        marginTop: responsiveWidth(18)
                    }}
                    titleColor={colors.white}
                >
                    <Plus />
                </FormButton>
            </FormContainer>

            <RenderSearch />

            <CommonSubHeader
                title="רשימת מקצועות"
                subHeaderTitleStyle={{
                    marginRight: 0
                }}
            />
            <ItemTitle
                title="שם המקצוע"
            />

            {
                searchArray && searchArray.length > 0
                    ? searchArray.map((prof, i) => (
                        <ProfItem
                            key={i}
                            prof={prof}
                            deleteProfItem={deleteProfItem}
                            id={i}
                        />
                    ))
                    : profsState.profs.map((prof, i) => (
                        <ProfItem
                            key={i}
                            prof={prof}
                            deleteProfItem={deleteProfItem}
                            id={i}
                        />
                    ))
            }

            {/* <CommonButton 
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                buttonColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    paddingHorizontal: responsiveWidth(70),
                    marginTop: responsiveWidth(18)
                }}
                titleColor={colors.white}
                title="שמירה"
            /> */}
        </ShadowView>

    )
}

const ProfItem = ({
    prof,
    deleteProfItem
}) => {
    return (

        <View style={styles.profItem}>
            <TouchableOpacity
                onPress={
                    () => deleteProfItem(prof)
                }
            >
                <Basket />
            </TouchableOpacity>

            <Text style={styles.profItemText}>
                {prof}
            </Text>
        </View>

    )
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        marginTop: responsiveWidth(24)
    },
    profItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginVertical: responsiveWidth(22),
    },
    profItemText: {
        fontSize: fonts.regular,
        fontWeight: weights.medium,
        color: colors.darkSkyBlue
    }
})