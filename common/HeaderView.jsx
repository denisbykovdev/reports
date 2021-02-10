import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useLogout from "../hooks/useLogOut";
import Exit from "../icons/Exit";
import LogoVertical from "../icons/LogoVertical";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import CommonButton from "./CommonButton";

export default function HeaderView({ children }) {
    const [logOut] = useLogout();

    return (
        <View style={styles.headerContainer}>
            <View style={[styles.header, {
                alignItems: layout.width > 600 ? "center" : ""
            }]}>
                <View style={styles.headerInner}>
                    <LogoVertical 
                        height={41}
                        width={149}
                    />

                </View>
                <View style={styles.headerRightButton}>
                    <CommonButton
                        title="יציאה"
                        titleColor={colors.battleShipGrey}
                        buttonShadow={true}
                        buttonShadowColor={colors.paleGrayLight}
                        buttonHeight={responsiveWidth(41)}
                        buttonColor={colors.white}
                        onPress={() => logOut()}
                        borderRadius={10}
                    >
                        <Exit />
                    </CommonButton>
                </View>

            </View>
            <View elevation={5} style={styles.headerMain}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: responsiveWidth(31),
        backgroundColor: colors.paleGrayBg,
        marginBottom: 15
    },
    header: {
        height: responsiveWidth(77),
        // alignItems: 'center',
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

        elevation: 10,

        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
    },

})