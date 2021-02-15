import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Close from "../icons/Close";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const ModalHeader = ({ title, subTitle, close }) => (
  <View style={styles.modalHeaderContainer}>
    <TouchableOpacity style={styles.modalHeaderClose} onPress={close}>
      <Close width={7} height={7} />
    </TouchableOpacity>
    <View style={styles.contentContainer}>
      <Text style={styles.modalHeaderTitle}>{title}</Text>
      <Text style={styles.modalHeaderSubTitle}>{subTitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  modalHeaderContainer: {
    paddingTop: responsiveWidth(24),
    paddingHorizontal: responsiveWidth(28),
    paddingBottom: responsiveWidth(24),
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
  },
  contentContainer: {
    alignItems: "flex-end",
  },
  modalHeaderClose: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    alignItems: "flex-start",
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

export default ModalHeader;
