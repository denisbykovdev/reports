import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import layout from '../utils/layout';
import colors from '../utils/colors';

export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.paleGrayBg
  },
  container: {
    flex: 1,
    padding: 0
  }
});
