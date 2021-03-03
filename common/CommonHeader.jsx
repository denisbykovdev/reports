import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Close from "../icons/Close";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";

const CommonHeader = ({ title, subTitle, close, children, closeButton = true, headerStyles }) => (

  <View style={[styles.modalHeaderContainer, headerStyles, {
      justifyContent: layout.width > 600 && !children ? "center" : "flex-end",
      flexDirection:"row"
  }]}>

    {
      closeButton &&
      <TouchableOpacity style={styles.modalHeaderClose} onPress={close}>
        <Close 
          width={layout.width > 600 ? responsiveWidth(15) : responsiveWidth(7)} 
          height={layout.width > 600 ? responsiveWidth(15) : responsiveWidth(7)} 
          stroke={layout.width > 600 ? colors.black : colors.paleGrayLight}
          strokeWidth={layout.width > 600 ? 0.5 : 2}
        />
      </TouchableOpacity>
    }

    <View style={[styles.contentContainer, {
      width: children || closeButton === true ? "90%" : "100%"
    }]}>
      <Text style={styles.modalHeaderTitle}>{title}</Text>
      <Text style={styles.modalHeaderSubTitle}>{subTitle}</Text>
    </View>

    <View style={{
      marginLeft: children && responsiveWidth(20)
    }}>
      {children}
    </View>
  
  </View>
);

const styles = StyleSheet.create({
  modalHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveWidth(24)
  },
  contentContainer: {
    alignItems: "flex-end"
  },
  modalHeaderClose: {
    height: responsiveWidth(22),
    width: responsiveWidth(22),
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: "flex-start"
  },
  modalHeaderTitle: {
    color: colors.darkBlueGray,
    fontSize: fonts.xlarge,
    fontWeight: weights.semiBold,
    textAlign: "right"
  },
  modalHeaderSubTitle: {
    color: colors.blueGray,
    fontSize: fonts.medium,
    fontWeight: weights.regular,
    textAlign: "right"
  }
});

export default CommonHeader;
