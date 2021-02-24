import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import AvoidingView from "../common/AvoidingView";
import CommonHeader from "../common/CommonHeader";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";
import UserPlus from "../icons/UserPlus"
import { responsiveWidth } from "../utils/layout";
import Spinner from "../common/Spinner"

const UsersListScreen = ( closeModal ) => {

  const [usersState, usersDispatch] = useUsers()

  // console.log(
  //   "___UsersList/usersState.users:", usersState.users
  // )

  return (

    <AvoidingView>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ShadowView shadowStyle={{
          paddingHorizontal: 0
        }}>
          <CommonHeader
            title={"ניהול משתמשים"}
            close={closeModal}
            headerStyles={{
              paddingHorizontal: responsiveWidth(28)
            }}
          />
          <DropDown
            arrayProp={
              // !usersState.fetching &&
              usersState.users !== null &&
              usersState.users
            }
            searchTitle={"not clear"}
          >
            <UserPlus />
          </DropDown>

        </ShadowView>
      </ScrollView>
    </AvoidingView>



  );
};

export default UsersListScreen;
