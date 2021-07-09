import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import FormButton from "../common/FormButton";
import FormContainer from "../common/FormContainer";
import FormField from "../common/FormField";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import UserPlus from "../icons/UserPlus"
import firstLevelTitles from "../constants/firstLevelTitles";

const TableAddUser = ({ dispatchMethod }) => {
    const [isVisible, setVisible] = useState(false);

    const formData = {
        // id: "",
        name: "",
        last_name: "",
        phone: "",
        email: "",
        password: ""
    }

    async function addUserHandler(values, { resetForm }) {
        console.log(
            "___DDAddUser/addUser/props:", values
        )

        await addUser(values)

        await resetForm();

        setVisible(false)
    }

    const addUser = (newUser) => dispatchMethod({
        type: "ADD_USER",
        payload: newUser
    })

    const fieldWidth = ((layout.width - responsiveWidth(60)) / (Object.keys(formData).length + 1)) - responsiveWidth(18)

    // console.log(
    //     "___TABADDUSER:", fieldWidth
    // )

    return (
        <View style={styles.addUserContainer}>

            <TouchableOpacity
                onPress={
                    () => setVisible(!isVisible)
                }
                style={styles.addUserButton}
            >
                <View style={styles.addUserButtonIcon}>
                    <UserPlus />
                </View>

                <Text style={styles.itemTitle}>
                    {/* Add user */}
                    הוסף משתמש
                </Text>
            </TouchableOpacity>


            {
                isVisible &&
                <FormContainer
                    initialValues={formData}
                    onSubmit={
                        (values, { resetForm }) => addUserHandler(values, { resetForm })
                    }
                >
                    <View style={styles.addUserRowContainer}>
                        <FormButton
                            title={"להוסיף"}
                            titleColor={colors.white}
                            buttonHeight={responsiveWidth(43)}
                            buttonColor={colors.darkSkyBlue}
                            buttonShadow={true}
                            buttonWidth={fieldWidth}
                            titleStyle={{
                                marginRight: 0
                            }}
                        />
                        {
                            Object.entries(formData).map(([key, value], index) =>
                            (

                                <FormField
                                    key={index}
                                    name={key}
                                    placeholder={firstLevelTitles[key]}
                                    autoCapitalize="none"
                                    width={fieldWidth}
                                    style={styles.inputContainer}
                                    inputStyle={styles.input}
                                />
                            )

                            )
                        }
                    </View>
                </FormContainer>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    addUserContainer: {
        width: '100%',
        marginVertical: responsiveWidth(18),
    },
    addUserButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsiveWidth(15),
        alignSelf: 'flex-start'
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
    addUserRowContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20
    },
    input: {
        paddingHorizontal: responsiveWidth(10),
        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        marginRight: 0
    }
})

export default TableAddUser;
