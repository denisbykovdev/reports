import React from "react";
import AvoidingView from "../common/AvoidingView";
import CommonHeader from "../common/CommonHeader";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import layout, { responsiveWidth } from "../utils/layout";
import Spinner from "../common/Spinner"
import Table from "../common/Table";
import DropDownAddUser from "../components/DropDownAddUser";
import TableAddUser from "../components/TableAddUser";
import useUsers from "../hooks/useUsers";

const UsersListScreen = ({ closeModal }) => {

  const [usersState, usersDispatch] = useUsers()

  const usersTitles = {
    id: "",
    name: "",
    last_name: "",
    phone: "",
    email: "",
    password: ""
  }
  return (
    <AvoidingView>
      <ShadowView shadowStyle={{
        paddingHorizontal: 0
      }}>
        <CommonHeader
          title={"ניהול משתמשים"}
          close={closeModal}
          headerStyles={{
            paddingHorizontal: layout.width < 600 ? responsiveWidth(28) : 0
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
                // searchTitle={"שם"}
                dispatchMethod={usersDispatch}
                tableTitles={usersTitles}
              >
                <TableAddUser
                  dispatchMethod={usersDispatch}
                />
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
