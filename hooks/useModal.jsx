import Modal from "react-native-modal";
import { useEffect, useRef, useState } from "react";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

const useModal = () => {

  const [isVisible, setVisible] = useState(false);

  const modalClose = () => setVisible(false);

  const modalOpen = () => setVisible(true);

  const ModalContent = ({
    children
  }) => (

    <Modal
      isVisible={isVisible}
      backdropColor={colors.popUpBg}
      children
      onBackdropPress={() => modalClose()}
      deviceWidth={layout.width}
      deviceHeight={layout.height}
      onSwipeComplete={() => modalClose()}
      swipeDirection={"down"}
      supportedOrientations={["portrait", "landscape"]}
      style={[styles.modalContainer, {
        alignItems: layout.width > 600 ? "center" : 'stretch'
      }]}
      propagateSwipe={true}
      scrollVertical={true}
    >
      <ScrollView
        contentContainerStyle={styles.modalScrollContainer}
        showsVerticalScrollIndicator={false}
        onPress
      >
        <View style={styles.modalContent}>
          {children}
        </View>
        

      </ScrollView>
    </Modal >

  );

  return [modalOpen, modalClose, ModalContent];
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    paddingHorizontal: responsiveWidth(31)
  },
  modalScrollContainer: {
    paddingTop: responsiveWidth(91),
  }
});

export default useModal;
