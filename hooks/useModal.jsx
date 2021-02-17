import Modal from "react-native-modal";
import { useState } from "react";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import React from "react";
import { StyleSheet, View } from "react-native";

const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  const closeModal = () => setVisible(false);

  const openModal = () => setVisible(true);

  const ModalContent = ({
    children,
    modalStyle,
    modalContentStyle,
  }) => (
    <Modal
      isVisible={isVisible}
      backdropColor={colors.popUpBg}
      // backdropOpacity={1}
      children
      onBackdropPress={() => closeModal()}
      deviceWidth={layout.width}
      deviceHeight={layout.height}
      onSwipeComplete={() => closeModal()}
      swipeDirection="down"
      supportedOrientations={["portrait", "landscape"]}
      propagateSwipe
      style={[modalStyle, styles.modalContainer]}
    >
      <View style={modalContentStyle}>
        {children}
      </View>
    </Modal>
  );

  return [openModal, closeModal, ModalContent];
};

const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: colors.paleGrayLight,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 18,
    shadowOpacity: 1,
    elevation: 10,

    marginTop: responsiveWidth(91),
    marginRight: responsiveWidth(31),
    marginLeft: responsiveWidth(31),
  },
});

export default useModal;
