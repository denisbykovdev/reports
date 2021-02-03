import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useLogout from "../hooks/useLogOut";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";
import Button from "./Button";

export default function HeaderView({children}) {
    const [logOut] = useLogout();

    return(
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <Text>Eitan Peretz</Text>
                    
                </View>
                <View style={styles.headerRightButton}>
                    <Button 
                        title="Logout"
                        buttonHeight={responsiveWidth(20.5)}
                        buttonColor={colors.white}
                        onPress={logOut}
                    />
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
        backgroundColor: colors.paleGrayBg
    },
    header: {
        height: responsiveWidth(37),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerRightButton: {
        position: 'absolute',
        right: 0
    },
    headerMain: {
        backgroundColor: colors.white,
        shadowColor: colors.white,
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 9,
          width: 0
        }
    },

})