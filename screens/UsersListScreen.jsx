import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import AvoidingView from "../common/AvoidingView";
import CommonHeader from "../common/CommonHeader";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import UserPlus from "../icons/UserPlus"
import layout, { responsiveWidth } from "../utils/layout";
import Spinner from "../common/Spinner"
import useUsersState from "../hooks/useUsersState";
import useUsersDispatch from "../hooks/useUsersDispatch";
import { useUsersProvider } from "../providers/UsersProvider";
import Table from "../common/Table";
import DropDownItem from "../common/DropDownItem";
import DropDownAddUser from "../components/DropDownAddUser";
// import UsersProvider from "../providers/UsersProvider";

const UsersListScreen = ({ closeModal }) => {

  // const usersState = useUsersState();
  // const usersDispatch = useUsersDispatch();

  const [usersState, usersDispatch] = useUsersProvider()

  useEffect(() => {
    console.log(
      "___UsersList/usersState.users:", 
      usersState.users, 
      layout.width
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
        {
          layout.width > 600 ?
            (
              <Table
                arrayProp={
                  usersState.users !== null &&
                  usersState.users
                }
                searchTitle={"שם"}
                dispatchMethod={usersDispatch}
              >
                <UserPlus />
              </Table>
            ) : (
              <DropDown
                arrayProp={
                  usersState.users !== null &&
                  usersState.users
                }
                // searchTitle={"שם"}
                dispatchMethod={usersDispatch}
              >
                {/* <UserPlus /> */}
                <DropDownAddUser 
                  dispatchMethod={usersDispatch}
                />
              </DropDown>
            )
        }


      </ShadowView>
    </AvoidingView>

  );
};

export default UsersListScreen;
