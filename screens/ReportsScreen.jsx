import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";
import Plus from "../icons/Plus";
import UserList from "../icons/UserList";
import useAuth from "../hooks/useAuth";

export default function ReportsScreen({ route }) {
    const { isAdmin } = route.params;

    console.log(
        "---ReportsScreen/route.params.isAdmin", isAdmin
    )

    
    console.log(
        "---ReportsScreen", isAdmin
    )

    return (
        <SafeView>
            <HeaderView>
                <View>
                    <Text>
                        /test
                    </Text>
                </View>
            </HeaderView>
            <ButtomView>
                <CommonButton
                    title={"הוסף בדיקה חדשה"}
                    titleColor={colors.white}
                    buttonColor={colors.darkSkyBlue}
                    buttonHeight={responsiveWidth(51)}
                    // buttonWidth={responsiveWidth(300)}
                    buttonWidth={"100%"}
                    buttonShadow={true}
                    buttonShadowColor={colors.clearBlue}
                    borderRadius={10}
                    style={{
                        marginTop: responsiveWidth(24),
                        marginBottom: responsiveWidth(24),
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Plus  />
                    </View> 
                </CommonButton>
                {
                    isAdmin &&
                    <CommonButton
                        title={"ניהול משתמשים"}
                        titleColor={colors.darkSkyBlue}
                        buttonColor={colors.white}
                        buttonHeight={responsiveWidth(51)}
                        // buttonWidth={responsiveWidth(300)}
                        buttonWidth={"100%"}
                        buttonShadow={false}
                        borderColor={colors.darkSkyBlue}
                        borderRadius={10}
                    >
                        <View style={styles.iconContainer}>
                            <UserList />
                        </View> 
                    </CommonButton>
                }

            </ButtomView>
        </SafeView>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        right: 10
    }
})