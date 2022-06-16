import React, { useEffect } from "react"
import useRadioPair from "../hooks/useRadioPair"
import colors from "../utils/colors"
import { responsiveWidth } from "../utils/layout"
import CommonButton from "../common/CommonButton"
import CommonHeader from "../common/CommonHeader"
import Line from "../common/Line"
import ShadowView from "../common/ShadowView"
import { useDispatch } from 'react-redux'
import useAuth from "../hooks/useAuth"
import { watchPrintReport } from '../actionCreators/sagaReport'
import FormErrorMessage from "../common/FormErrorMessage"
import { useSelector } from "react-redux"
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import { Platform } from "react-native"

const downloadFileHadler = async ({
    uri,
    fileName
}) => {
    const imageFileExts = ['jpg', 'png', 'gif', 'heic', 'webp', 'bmp'];

    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
        const downloadedFile = await FileSystem.downloadAsync(
            uri, 
            fileUri
        );

        console.log(
            `--- downloadFileHadler/status === 200:`,
            downloadedFile
        );

        if (
            imageFileExts.every(x => !downloadedFile.uri.endsWith(x))
        ) {
            if(
                Platform.OS === 'ios'
            ) {
                try {
                    const shareIosResult = await Sharing.shareAsync(
                        downloadedFile.uri,
                        { 
                            // UTI: `public.${fileName}` 
                            UTI: `public.item`
                        }
                    );
                    console.log(
                        `--- downloadFileHadler/shareIosResult:`,
                        shareIosResult 
                    );
                } catch (error) {
                    console.log(
                        `--- downloadFileHadler/shareIosResult/error:`,
                        error 
                    );
                };
            } else if (
                Platform.OS === 'android'
            ) {
                try {
                    const shareAndroidResult = await Sharing.shareAsync(
                        downloadedFile.uri,
                        {
                            dialogTitle: `${fileName}`,
                            mimeType: `${fileName.slice(str.lastIndexOf('.') + 1)}`
                        }
                    );
                    console.log(
                        `--- downloadFileHadler/shareAndroidResult:`,
                        shareAndroidResult 
                    );
                } catch (error) {
                    console.log(
                        `--- downloadFileHadler/shareAndroidResult/error:`,
                        error 
                    );
                };
            };
        };

        if (downloadedFile.status != 200) {
            console.log(
                `--- downloadFileHadler/status != 200:`,
                downloadedFile
            );
        };
    } catch (error) {
        console.log(
            `--- downloadFileHadler/error:`, error
        );
    };
};

export const byArray = [
    {
        label: 'דוח לפי אזור',
        desc: "by_areas_"
    },
    {
        label: 'דוח ערוך לפי מקצוע',
        desc: "by_profession_"
    },
];

export const moneyArray = [
    {
        label: 'דוח כולל עלויות',
        desc: "without_money"
    },
    {
        label: 'דוח ללא עלויות',
        desc: "with_money"
    },
];

const PrintModal = ({ close, reportId }) => {
    const [activeBy, RenderBy] = useRadioPair(byArray, byArray[0].desc);
    const [activeMoney, RenderMoney] = useRadioPair(moneyArray, moneyArray[0].desc);

    const dispatch = useDispatch()

    const { authState } = useAuth()

    const { token } = authState

    const urlSelector = useSelector(state => state.sagaReport.url)

    const printHandler = () => {
        const urlConcat = `${activeBy}${activeMoney}`;

        console.log(
            "---PrintModal/printHandler/urlConcat:", urlConcat
        );

        dispatch(watchPrintReport(
            token,
            reportId,
            urlConcat
        ));
    };

    useEffect(() => {
        (
            async() => {
                if (
                    urlSelector !== null
                ) {
                    const fileName = `${reportId}${urlConcat}.docx`;
        
                    await downloadFileHadler(urlSelector, fileName);
                };
            }
        )();

        // close();
    }, [urlSelector]);

    return (
        <ShadowView
            shadowStyle={{
                paddingHorizontal: 0,
                // maxWidth: layout.width > 600 ? responsiveWidth(360) : "100%"
            }}
        >
            <CommonHeader
                title={"מבנה הדוח"}
                close={close}
                subTitle={"יש לבחור את המבניות ליצירת הדוח"}
                headerStyles={{
                    paddingHorizontal: responsiveWidth(28)
                }}
            />
            <Line
                lineStyle={{
                    marginHorizontal: responsiveWidth(28)
                }}
            />
            <RenderBy
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    backgroundColor: colors.paleGrayThree,
                    paddingVertical: responsiveWidth(18)
                }}
            />
            <RenderMoney
                radioPairContainerStyle={{
                    paddingHorizontal: responsiveWidth(28),
                    backgroundColor: colors.paleGrayThree,
                    paddingVertical: responsiveWidth(18)
                }}
            />
            <Line
                lineStyle={{
                    marginHorizontal: responsiveWidth(28)
                }}
            />
            <FormErrorMessage
                error={`${activeBy}${activeMoney}`}
                visible={true}
            />
            <CommonButton
                title={"יצוא"}
                borderColor={colors.azul}
                borderRadius={10}
                titleColor={colors.azul}
                onPress={() => printHandler()}
                style={{
                    marginHorizontal: responsiveWidth(28),
                    marginTop: responsiveWidth(24)
                }}
            />
        </ShadowView>
    )
};

export default PrintModal;
