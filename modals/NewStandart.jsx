import React from "react"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import FormContainer from "../common/FormContainer"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import FormImagePicker from "../common/FormImagePicker"
import FormField from "../common/FormField"
import FormButton from "../common/FormButton"
import colors from "../utils/colors"
import { responsiveHeight, responsiveWidth } from "../utils/layout"
import useAuth from "../hooks/useAuth"

export default function NewStandart({
    standartsDispatch,
    newStandartModalClose
}){
    const {authState} = useAuth()

    const {token} = authState

    const submitNewStandart = async(values) => {
        console.log(
            "___NewStandart/submit/values:", values
        )
        await standartsDispatch({
            type: "POST_NEW_STANDART",
            token,
            standart: values
        })

        newStandartModalClose()
    }

    return (
        <ShadowView>
            <CommonHeader 
                title="הוספת תקן"
                close={newStandartModalClose}
            />
            <Line />

            <FormContainer
                initialValues={{
                    text: '',
                    image: ''
                }}
                onSubmit={
                    (values) => submitNewStandart(values)
                }
            >
                <FormImagePicker
                    name="image" 
                    style={{
                        marginTop: responsiveHeight(22)
                    }}
                />
                <FormField 
                    name="text"
                    area={true}
                    style={{
                        height: responsiveHeight(140),
                        textAlign: 'right',
                        marginBottom: responsiveHeight(22)
                    }}
                    inputStyle={{
                        marginEnd: 0
                    }}
                 
                />

                <Line />
                <FormButton 
                    title="שמירה"
                    borderRadius={20}
                    buttonHeight={responsiveWidth(33)}
                    buttonColor={colors.darkSkyBlue}
                    style={{
                        padding: 0,
                        paddingHorizontal: responsiveWidth(70),
                        marginTop: responsiveWidth(22)
                    }}
                    titleStyle={{
                        marginRight: 0
                    }}
                    titleColor={colors.white}
                />
            </FormContainer>
        </ShadowView>
    )
}