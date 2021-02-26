import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Close from "../icons/Close";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const CommonHeader = ({ title, subTitle, close, children, closeButton = true, headerStyles }) => (
  <View style={[styles.modalHeaderContainer, headerStyles]}>
    {
      closeButton &&
      <TouchableOpacity style={styles.modalHeaderClose} onPress={close}>
        <Close width={7} height={7} />
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
    // backgroundColor: colors.white,
    flexDirection: "row",
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
    justifyContent: 'flex-end'
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
