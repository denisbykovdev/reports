import * as React from "react";
import { Text, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

export default function ReportsScreen(){
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
                        marginBottom: responsiveWidth(24)
                    }}
                ></CommonButton>
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
                    
                ></CommonButton>
            </ButtomView>
        </SafeView>
    )
}