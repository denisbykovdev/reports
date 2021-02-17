import React from "react";
import { ScrollView, View } from "react-native";
import CommonHeader from "../common/CommonHeader";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import UserPlus from "../icons/UserPlus"
import { responsiveWidth } from "../utils/layout";

const userData = [
  {
    name: "first",
    last_name: "one",
    phone: "1234567",
    email: "first@mail.com",
    password: "123456"
  },
  {
    name: "second",
    last_name: "two",
    phone: "7654321",
    email: "second@mail.com",
    password: "123456"
  }
]

const UsersListScreen = ({ closeModal }) => {
  return (
    <ScrollView>
      <ShadowView shadowStyle={{
        paddingHorizontal: 0
      }}>
        <CommonHeader title={"ניהול משתמשים"} close={closeModal} headerStyles={{
          paddingHorizontal: responsiveWidth(28)
        }} />
        <DropDown array={userData} searchTitle={"not clear"}>
          <UserPlus />
        </DropDown>
      </ShadowView>
    </ScrollView>

  );
};

export default UsersListScreen;
