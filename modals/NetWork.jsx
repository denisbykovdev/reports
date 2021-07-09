import CommonHeader from "../common/CommonHeader";
import Line from "../common/Line";
import React from 'react'
import ShadowView from "../common/ShadowView";
import { Text } from "react-native";

export default function NetWork({
    netWorkModalClose,
    content
}) {
    return (
        <ShadowView>
            <CommonHeader
                title="NetWork Error"
                close={netWorkModalClose}
            />
            <Line />

            <Text>
                {content}
            </Text>
        </ShadowView>
    )
}