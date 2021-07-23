import React from "react"
import { StyleSheet, Text, View } from "react-native"
import CommonButton from "../common/CommonButton"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"

export default function Delete({
    closeDeleteModal,
    deleteNote,
    id
}) {
    return (
        <View style={{
            // height: responsiveWidth(200),
            width: responsiveWidth(360),
            backgroundColor: colors.white,
            alignItems: 'center',
            // justifyContent: 'center',
            padding: responsiveWidth(48)
        }}>
            <Text
                style={{
                    fontSize: fonts.large,
                    fontWeight: weights.semiBold,
                    marginBottom: responsiveWidth(28)
                }}
            >
                ?האם אתה בטוח רוצה למחוק
            </Text>

            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <CommonButton
                    title={"לא"}
                    titleColor={colors.darkSkyBlue}
                    titleFontSize={fonts.large}
                    buttonColor={colors.white}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={responsiveWidth(117)}
                    buttonShadow={false}
                    borderColor={colors.darkSkyBlue}
                    borderRadius={10}
                    titleStyle={{ marginEnd: 0 }}
                    style={{
                        marginRight: responsiveWidth(18),
                    }}
                    onPress={() => closeDeleteModal()}
                />
                <CommonButton
                    buttonShadow={true}
                    buttonColor={colors.azul}
                    buttonHeight={responsiveWidth(51)}
                    buttonWidth={responsiveWidth(117)}
                    title={"כן"}
                    titleStyle={{
                        marginEnd: 0
                    }}
                    titleColor={colors.white}
                    titleFontSize={fonts.large}
                    borderRadius={10}
                    onPress={() => deleteNote(id) && closeDeleteModal()}
                />
            </View>

        </View>
    )
}