import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import AvoidingView from "../common/AvoidingView";
import CommonHeader from "../common/CommonHeader";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import UserPlus from "../icons/UserPlus"
import { responsiveWidth } from "../utils/layout";
import Spinner from "../common/Spinner"
import useUsersState from "../hooks/useUsersState";
import useUsersDispatch from "../hooks/useUsersDispatch";
import UsersProvider from "../providers/UsersProvider";

const UsersListScreen = ({ closeModal }) => {

  const usersState = useUsersState();
  const usersDispatch = useUsersDispatch();

  useEffect(() => {
    console.log(
      "___UsersList/usersState.users:", usersState.users
    )
  }, [usersState.users])

  return (
    <AvoidingView>
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
        {
          usersState && usersState.fetching && <Spinner />
        }
        <DropDown
          arrayProp={
            usersState.users !== null &&
            usersState.users
          }
          searchTitle={"not clear"}
          dispatchMethod={usersDispatch}
        >
          <UserPlus />
        </DropDown>
      </ShadowView>
    </AvoidingView>
  );
};

export default UsersListScreen;
