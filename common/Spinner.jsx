import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../utils/colors';
import SafeView from './SafeView';

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={colors.paleGrayBg} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
