import * as React from "react";
import { Text, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";

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

            </ButtomView>
        </SafeView>
    )
}