import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Close from "../icons/Close";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const CommonHeader = ({ title, subTitle, close, children, closeButton = true, headerStyles }) => (

  <View style={[styles.modalHeaderContainer, headerStyles, {
      justifyContent: layout.width > 600 && !children ? "center" : "space-between" ,
      flexDirection: children && "row"
  }]}>

    {
      closeButton &&
      <TouchableOpacity style={styles.modalHeaderClose} onPress={() => close()}>
        <Close width={responsiveWidth(7)} height={responsiveWidth(7)} />
      </TouchableOpacity>
    }

    <View style={styles.contentContainer}>
      <Text style={styles.modalHeaderTitle}>{title}</Text>
      <Text style={styles.modalHeaderSubTitle}>{subTitle}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  modalHeaderContainer: {
    // paddingTop: responsiveWidth(24),
    // paddingHorizontal: responsiveWidth(28),
    // paddingBottom: responsiveWidth(24),
    // backgroundColor: 'yellow',
    // flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: responsiveWidth(24)
  },
  contentContainer: {
    alignItems: "flex-end"
  },
  modalHeaderClose: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    alignItems: "flex-start",
    justifyContent: 'flex-end',
    position: 'absolute',
    left: responsiveWidth(28)
  },
  modalHeaderTitle: {
    color: colors.darkBlueGray,
    fontSize: fonts.xlarge,
    fontWeight: weights.semiBold,
  },
  modalHeaderSubTitle: {
    color: colors.blueGray,
    fontSize: fonts.medium,
    fontWeight: weights.regular
  },
});

export default CommonHeader;
