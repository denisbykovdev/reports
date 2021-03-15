import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import FormButton from "../common/FormButton";
import FormContainer from "../common/FormContainer";
import FormField from "../common/FormField";
import firstLevelTitles from "../constants/firstLevelTitles";
import CircleArrowDown from "../icons/CircleArrowDown";
import CircleArrowUp from "../icons/CircleArrowUp";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import UserPlus from "../icons/UserPlus"

const DropDownAddUser = ({ dispatchMethod }) => {
    const [isVisible, setVisible] = useState(false);

    const formData = {
        id: "",
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

    return (

        <View style={styles.itemContainer}>

            <View style={{
                backgroundColor: isVisible ? colors.paleGrayBg : colors.white
            }}>
                {/* <View style={styles.itemButton}> */}
                    <TouchableOpacity 
                        onPress={
                            () => setVisible(!isVisible)
                        }
                        style={styles.itemButton}
                    >   
                        <View style={styles.itemButtonIcon}>
                            <UserPlus />
                        </View>
                        
                        <Text style={styles.itemTitle}>
                            Add user
                        </Text>
                        {
                            isVisible ? <CircleArrowUp /> : <CircleArrowDown />
                        }
                    </TouchableOpacity>
                {/* </View> */}
            </View>
            {
                isVisible &&
                <FormContainer
                    initialValues={{ email: "", password: "" }}

                    onSubmit={
                        (values, { resetForm }) => addUserHandler(values, { resetForm })
                    }

                >
                    <View style={{
                        backgroundColor: isVisible ? colors.paleGrayBg : colors.white,
                        paddingHorizontal: responsiveWidth(28)
                    }}>
                        {
                            Object.entries(formData).map(([key, value], index) =>
                            (
                                <AddUserElement
                                    key={index}
                                    elementIndex={index}
                                    elementKey={key}
                                    elementValue={value}
                                />
                            )

                            )
                        }
                        <FormButton
                            title={"להוסיף"}
                            titleColor={colors.white}
                            buttonHeight={responsiveWidth(43)}
                            buttonColor={colors.darkSkyBlue}
                            buttonShadow={true}
                            style={{
                                width: '100%',
                                marginVertical: responsiveWidth(18)
                            }}
                        />
                    </View>

                </FormContainer>
            }
        </View>
    )
}

const AddUserElement = ({ elementIndex, elementKey, elementValue }) => (
    <View style={styles.itemMain}>
        {/* <View style={{
            // marginHorizontal: responsiveWidth(28),
            backgroundColor: colors.whiteTwo,
            height: responsiveWidth(1),
            display: elementIndex === 0 ? 'none' : "flex"
        }}></View> */}
        <View style={styles.itemElementContainer}>
            <Text style={styles.darkText}>
                {
                    firstLevelTitles[elementKey]
                        ? firstLevelTitles[elementKey]
                        : elementKey
                }
            </Text>

            <FormField
                name={elementKey}
                placeholder={elementValue}
                autoCapitalize="none"
                inputStyle={styles.input}
                style={styles.inputContainer}
            />

            {/* <Text style={styles.blueText}>
                {elementValue}
            </Text> */}
        </View>
    </View>
)

const styles = StyleSheet.create({
    itemElementContainer: {
        // backgroundColor: 'yellow',
        // marginHorizontal: responsiveWidth(28),
        alignItems: 'flex-end'
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
    // itemElementContainer: {
    //     // backgroundColor: 'yellow',
    //     marginHorizontal: responsiveWidth(28),
    //     alignItems: 'flex-end'
    // },
    input: {
        // borderColor: colors.darkWhite,
        // borderWidth: responsiveWidth(2),
        // borderRadius: 20,
        // height: responsiveWidth(31),
        // width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray,
        marginRight: 0
    },
    inputContainer: {
        padding: 0,
        height: responsiveWidth(31),
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
    },
    itemButtonIcon: {
        position: 'absolute',
        left: 0
    }
})

export default DropDownAddUser;
