import React from 'react'
import { StyleSheet } from 'react-native'
import CommonHeader from '../common/CommonHeader'
import FormButton from '../common/FormButton'
import FormContainer from '../common/FormContainer'
import FormErrorMessage from '../common/FormErrorMessage'
import FormField from '../common/FormField'
import ItemTitle from '../common/ItemTitle'
import Line from '../common/Line'
import ShadowView from '../common/ShadowView'
import { passChangeSchema } from '../constants/validationSchema'
import useType from '../hooks/useType'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import { responsiveWidth } from '../utils/layout'
import weights from '../utils/weights'

const PassChange = ({
    close,
    id,
    dispatchMethod,
    token
}) => {
    const { type } = useType()

    const submitPassChange = async (values) => {
        console.log(
            `--- PassChange/modal/values`, values
        )

        await dispatchMethod({
            type: "PASS_CHANGE",
            userId: id,
            token,
            password: values.password,
            password_confirmation: values.password_confirmation
        })

        close()
    }
    console.log(
        `--- PassChange/prop/id:`, id
    )
    return (
        <ShadowView>
            <CommonHeader
                title="לשנות את הסיסמה"
                close={close}
            />
            <Line
                lineStyle={{
                    marginBottom: responsiveWidth(8)
                }}
            />

            <FormContainer
                initialValues={{
                    password: '',
                    password_confirmation: ''
                }}
                onSubmit={(values) => submitPassChange(values)}
                validationSchema={passChangeSchema}
            >
                <ItemTitle
                    title="סיסמה חדשה"
                />
                <FormField
                    style={[styles.input, {
                        width: type === 2 ? '100%' : responsiveWidth(239)
                    }]}
                    name="password"
                />
                {<FormErrorMessage visible={true} />}
                <ItemTitle
                    title="אשר סיסמה"
                />
                <FormField
                    style={[styles.input, {
                        width: type === 2 ? '100%' : responsiveWidth(239)
                    }]}
                    name="password_confirmation"
                />
                {<FormErrorMessage visible={true} />}
                <FormButton
                    title="לשנות את הסיסמה"
                    buttonShadow={true}
                    buttonColor={colors.azul}
                    buttonHeight={responsiveWidth(43)}
                    buttonWidth={'auto'}
                    titleColor={colors.white}
                    style={{
                        marginVertical: responsiveWidth(8),
                        // marginHorizontal: responsiveWidth(28),
                    }}
                />
            </FormContainer>
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 0,
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        // width: type === 2 ? '100%' : responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),
        textAlign: "right",
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        marginVertical: responsiveWidth(8),
    },
})

export default PassChange