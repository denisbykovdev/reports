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
import { StyleSheet, Text, View } from "react-native"
import fonts from "../utils/fonts"
import weights from "../utils/weights"
import stringSlicer from "../helpers/stringSlicer"
import FormSelect from "../common/FormSelect"
import useProfs from "../hooks/useProfs"
import AltImage from "../icons/AltImage"

export default function NewStandart({
    standartsDispatch,
    newStandartModalClose,
    isEdit = false,
    standart
}) {
    const { authState } = useAuth()

    const { token } = authState

    // const { profsState, profsDispatch } = useProfs()

    const submitNewStandart = async (values) => {
        console.log(
            "___NewStandart/submit/values:", 
            values, 
            `:standart:`, 
            standart,
            `:isEdit:`,
            isEdit
        )
        if(isEdit === false) {
            await standartsDispatch({
                type: "POST_NEW_STANDART",
                token,
                standart: values
            })
        }else{
            await standartsDispatch({
                type: "UPDATE_SAVED_STANDART",
                token,
                standartId: standart.id,
                text: values.text,
                image: values.image
            })
        }
        newStandartModalClose()
    }

    // const interSepter = (name, text) => {
    //     standartsDispatch({
    //         type: "CHANGE_STANDART_PROF",
    //         standartId: name,
    //         professionName: text,
    //     })
    // }

    return (
        <ShadowView>
            <CommonHeader
                title="הוספת תקן"
                close={newStandartModalClose}
            />
            <Line />

            <FormContainer
                initialValues={{
                    text: isEdit ? `${standart.text}` : '',
                    image: isEdit ? `${standart.image}` : '',
                    // profession: '',
                    // fault: '',
                    // whatToDo: ''
                }}
                onSubmit={
                    (values) => submitNewStandart(values)
                }
            >
                <>
                    {
                        // !isEdit
                        //     ? 

                        <View
                            style={{
                                alignItems: 'center',
                                marginTop: responsiveWidth(18)
                            }}
                        >

                            {/* {
                                isEdit && standart.image !== null && standart.image.length > 1
                                    ? <Image
                                        style={{
                                            height: responsiveWidth(73),
                                            width: responsiveWidth(68),
                                        }}
                                        source={{ uri: `data:image/png;base64,${standart.image}` }}
                                    />
                                    : <AltImage
                                        height={responsiveWidth(42)}
                                        width={responsiveWidth(38)}
                                    />
                            } */}

                            <FormImagePicker
                                name="image"
                                style={{
                                    marginTop: responsiveWidth(22),
                                    width: '100%'
                                }}
                                isModal={true}
                            />
                            {/* <FormField
                                    name="profession"
                                    placeholder="מקצוע"
                                    // area={true}
                                    style={{
                                        borderRadius: 20,
                                        height: responsiveWidth(31),
                                        marginBottom: responsiveWidth(22),
                                        padding: 0,
                                        paddingEnd: responsiveWidth(10)
                                    }}
                                    inputStyle={{
                                        marginEnd: 0,
                                        // padding: 0
                                    }}
                                /> */}
                            {/* <FormField
                                    name="fault"
                                    area={true}
                                    placeholder="תקלה"
                                    style={{
                                        height: responsiveWidth(140),
                                        textAlign: 'right',
                                        marginBottom: responsiveWidth(22),
                                        borderRadius: 10,
                                    }}
                                    inputStyle={{
                                        marginEnd: 0
                                    }}
                                /> */}
                            {/* <FormField
                                    name="whatToDo"
                                    area={true}
                                    placeholder="מה לעשות"
                                    style={{
                                        height: responsiveWidth(140),
                                        textAlign: 'right',
                                        marginBottom: responsiveWidth(22),
                                        borderRadius: 10,
                                    }}
                                    inputStyle={{
                                        marginEnd: 0
                                    }}
                                /> */}
                            <FormField
                                name="text"
                                area={true}
                                placeholder="תקן"
                                style={{
                                    height: responsiveWidth(140),
                                    textAlign: 'right',
                                    marginBottom: responsiveWidth(22),
                                    borderRadius: 10,
                                }}
                                inputStyle={{
                                    marginEnd: 0
                                }}
                                isModal={true}
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
                                    marginTop: responsiveWidth(22),
                                    width: '100%'
                                }}
                                titleStyle={{
                                    marginRight: 0
                                }}
                                titleColor={colors.white}
                            />
                        </View>

                        // : 
                        // <>
                        //     <View style={styles.standartDescs}>
                        //         <View style={styles.standartRow}>
                        //             <Text style={styles.standartDetails}>
                        //                 {stringSlicer(standart.profession, 20)}
                        //             </Text>
                        //             <Text style={styles.standartTitles}>
                        //                 {"מקצוע"}
                        //             </Text>
                        //         </View>

                        //         <>
                        //             <FormSelect
                        //                 placeholder="בחר מקצוע"
                        //                 array={profsState.profs && profsState.profs}
                        //                 name={standart.id}
                        //                 interSepter={interSepter}
                        //             />
                        //         </>

                        //         <View style={styles.standartRow}>
                        //             <Text style={styles.standartDetails}>
                        //                 {stringSlicer(standart.fault, 20)}
                        //             </Text>
                        //             <Text style={styles.standartTitles}>
                        //                 {"תקלה"}
                        //             </Text>
                        //         </View>
                        //         <View style={styles.standartRow}>
                        //             <Text style={styles.standartDetails}>
                        //                 {stringSlicer(standart.whatToDo, 20)}
                        //             </Text>
                        //             <Text style={styles.standartTitles}>
                        //                 {"מה לעשות"}
                        //             </Text>
                        //         </View>
                        //         <View style={styles.standartRow}>
                        //             <Text style={styles.standartDetails}>
                        //                 {stringSlicer(standart.text, 20)}
                        //             </Text>
                        //             <Text style={styles.standartTitles}>
                        //                 {"תקן"}
                        //             </Text>
                        //         </View>
                        //     </View>
                        // </>
                    }
                </>
            </FormContainer>
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    tickContainer: {
        height: responsiveWidth(24),
        width: responsiveWidth(24),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        // marginStart: responsiveWidth(14)
    },
    standartRow: {
        flexDirection: "row",
        alignItems: 'baseline',
        width: '100%',
        marginVertical: responsiveWidth(18),
        justifyContent: 'flex-end'
    },
    standartDetails: {
        alignSelf: 'baseline',
        position: "absolute",
        left: 0,

        fontSize: fonts.small,
        fontWeight: weights.thin,
        color: colors.slateGrey
    },
    standartTitles: {
        fontSize: fonts.regular,
        fontWeight: weights.semiBold,
        color: colors.darkBlueGray
    },
})