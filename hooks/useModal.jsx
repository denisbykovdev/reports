import React, { useState } from "react";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import { StyleSheet, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import AvoidingView from "../common/AvoidingView";
import useType from "../hooks/useType"

const useModal = () => {
  const {type} = useType()

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
      // onSwipeComplete={() => modalClose()}
      // swipeDirection={"down"}
      supportedOrientations={["portrait", "landscape"]}
      style={[styles.modalContainer, {
        alignItems: layout.width > 600 ? "center" : 'stretch'
      }]}
      propagateSwipe={true}
      scrollVertical={true}
    >
      <AvoidingView>
        <ScrollView
          contentContainerStyle={[
            styles.modalScrollContainer,
            {
              width: type === 2 ? responsiveWidth(360) : '100%'
            }
          ]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >

          {/* <View style={styles.modalContent}> */}
          {children}
          {/* </View> */}


        </ScrollView>
      </AvoidingView>
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
