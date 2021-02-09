import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useLogout from "../hooks/useLogOut";
import Exit from "../icons/Exit";
import LogoVertical from "../icons/LogoVertical";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";
import CommonButton from "./CommonButton";

export default function HeaderView({ children }) {
    const [logOut] = useLogout();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <LogoVertical />

                </View>
                <View style={styles.headerRightButton}>
                    <CommonButton
                        title="יציאה"
                        titleColor={colors.battleShipGrey}
                        buttonShadow={true}
                        buttonShadowColor={colors.paleGrayLight}
                        buttonHeight={responsiveWidth(40)}
                        buttonColor={colors.white}
                        onPress={() => logOut()}
                    >
                        <Exit />
                    </CommonButton>
                </View>

            </View>
            <View elevation={10} style={styles.headerMain}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: responsiveWidth(13.5),
        backgroundColor: colors.paleGrayBg,
        marginBottom: 15
    },
    header: {
        height: responsiveWidth(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerRightButton: {
        position: 'absolute',
        right: 0
    },
    headerMain: {
        backgroundColor: colors.white,

        shadowColor: colors.paleGrayLight,

        shadowOffset: {
      
          width: 0,
      
          height: 0
      
        },
      
        shadowRadius: 9,
      
        shadowOpacity: 1,

        elevation: 5,

        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 5,
    },

})