import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react"
import { Platform, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import CommonButton from "./CommonButton";
import AddImage from "../icons/AddImage";
import { responsiveWidth } from "../utils/layout";
import colors from "../utils/colors";

const FormImagePicker = ({ name }) => {
    const [image, setImage] = useState(null);

    const {
        setFieldValue,
        setFieldTouched,
        values
    } = useFormikContext();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            await setImage(result.uri);
            await setFieldValue(name, image)
        }
    };

    return (
        <CommonButton
            borderRadius={20}
            buttonHeight={responsiveWidth(33)}
            borderColor={colors.darkSkyBlue}
            style={{
                marginBottom: responsiveWidth(24),
                padding: 0,
                marginTop: responsiveWidth(10),
                marginBottom: responsiveWidth(26)
            }}
            titleStyle={{
                marginRight: 0
            }}
            title="הוסף לוגו"
            titleColor={colors.darkSkyBlue}
            onPress={pickImage}
        >
            <View
                style={{
                    position: 'absolute',
                    right: responsiveWidth(10)
                }}
            >
                <AddImage />
            </View>

        </CommonButton>
    )
}

export default FormImagePicker;