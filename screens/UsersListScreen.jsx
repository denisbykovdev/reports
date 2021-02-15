import React from "react";
import { View } from "react-native";
import ModalHeader from "../common/ModalHeader";

const UsersListScreen = ({ closeModal }) => {
  return (
    <>
      <ModalHeader title={"Title"} subTitle={"SubTitle"} close={closeModal} />
      <View>
          
      </View>
    </>
  );
};

export default UsersListScreen;
