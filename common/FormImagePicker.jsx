import React, { useState } from "react"
import { useFormikContext } from "formik";
import { Platform, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import CommonButton from "./CommonButton";
import AddImage from "../icons/AddImage";
import { responsiveWidth } from "../utils/layout";
import colors from "../utils/colors";
import useChecked from "../hooks/useChecked";

const FormImagePicker = ({ name, style }) => {
    const [image, setImage] = useState(null);

    const {
        setFieldValue,
        setFieldTouched,
        values
    } = useFormikContext();

    const { isChecked, setChecked } = useChecked()

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true
                });

                // console.log(result.base64);

                if (result) {
                    setImage(result.base64);
                    setFieldTouched(name)
                    setFieldValue(name, result.base64)
                    isChecked && setChecked(false)
                }
            }

            // alert('Sorry, we need camera roll permissions to make this work!');
        }

    };

    return (
        <CommonButton
            borderRadius={20}
            buttonHeight={responsiveWidth(33)}
            borderColor={colors.darkSkyBlue}
            style={[{
                marginBottom: responsiveWidth(22),
                padding: 0,
                marginTop: responsiveWidth(10),
                // marginBottom: responsiveWidth(26)
            }, style]}
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