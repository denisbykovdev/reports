import Modal from "react-native-modal";
import { useState } from "react";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";


const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  const modalClose = () => setVisible(false);

  const modalOpen = () => setVisible(true);

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
      // onSwipeComplete={() => closeModal()}
      // swipeDirection="down"
      supportedOrientations={["portrait", "landscape"]}
      propagateSwipe
      style={[modalStyle, styles.modalContainer]}
    >
      <ScrollView style={modalContentStyle}>
        {children}
      </ScrollView>
    </Modal>
  );

  return [modalOpen, modalClose, ModalContent];
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

    borderRadius: 10,

    marginTop: responsiveWidth(91),
    marginRight: responsiveWidth(31),
    marginLeft: responsiveWidth(31),
  },
});

export default useModal;
