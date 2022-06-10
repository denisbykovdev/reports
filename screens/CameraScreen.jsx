import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawWithOptions, DrawCore } from '@archireport/react-native-svg-draw';
import { LinearGradient } from 'expo-linear-gradient';
import useStatusBar from '../hooks/useStatusBar';
import colors from '../utils/colors';
import SafeView from '../common/SafeView';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen() {
    useStatusBar("dark-content", colors.paleGrayBg);

    const navigation = useNavigation();
    const route = useRoute();

    const routeImage = route?.params?.image;

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
                              base64
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
                    // image={{ uri: `data:image/png;base64,${routeImage}` }}
                    takeSnapshot={(value) => takeSnap(value)}
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