import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import { responsiveWidth } from '../utils/layout';

export default function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveWidth(10)
  }
});
