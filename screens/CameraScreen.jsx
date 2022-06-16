import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawWithOptions, DrawCore } from '@archireport/react-native-svg-draw';
import { LinearGradient } from 'expo-linear-gradient';
import useStatusBar from '../hooks/useStatusBar';
import colors from '../utils/colors';
import SafeView from '../common/SafeView';
import * as FileSystem from 'expo-file-system';

import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
]);
LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
]);
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function CameraScreen() {
    useStatusBar("dark-content", colors.paleGrayBg);

    const navigation = useNavigation();
    const route = useRoute();

    const routeImage = route?.params?.image;

    console.log(
        `--- edit/routeImage:`, routeImage
    );

    const takeSnap = async(value) => {
        try {
            const image = await Promise.resolve(value);

            const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });

            console.log(
                `--- edit/image:`, image
            );

            navigation.navigate(
                "AppStack",
                      {
                          screen: "Report",
                          params: {
                              image,
                              base64: `data:image/png;base64,${base64}`
                          }
                      }
              );

        } catch (error) {
            console.log(
                `--- edit/error:`, error
            )
        }
    };

    return (
        <SafeView>
            <View style={styles.container}>
                <DrawWithOptions
                    linearGradient={LinearGradient}
                    image={{ uri: routeImage }}
                    takeSnapshot={(value) => takeSnap(value)}
                    close={() => navigation.goBack()}
                />
            </View>
        </SafeView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});