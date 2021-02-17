import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import layout, { responsiveHeight, responsiveWidth } from "../utils/layout";
import Plus from "../icons/Plus";
import UserList from "../icons/UserList";
import useStatusBar from "../hooks/useStatusBar";
import fonts from "../utils/fonts";
import useModal from "../hooks/useModal";
import ModalHeader from "../common/CommonHeader";
import UsersListScreen from "./UsersListScreen";
import CommonHeader from "../common/CommonHeader";
import Reports from "../icons/Reports";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";

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

export default function ReportsScreen({ route }) {
  useStatusBar("dark-content", colors.paleGrayBg);

  const { isAdmin } = route.params;

  console.log("---ReportsScreen/route.params.isAdmin", isAdmin);

  const [openModal, closeModal, ModalContent] = useModal();

  return (
    <SafeView>
      <ScrollView>
        <HeaderView>
          <ShadowView
            shadowStyle={{
              paddingHorizontal: 0
            }}
          >
            <CommonHeader
              closeButton={false}
              title={"מערכת דוחות"}
              subTitle={"ניהול טפסי בדיקות"}
              headerStyles={{
                paddingHorizontal: responsiveWidth(28)
              }}
            >
              <Reports
                height={responsiveWidth(46)}
              />
            </CommonHeader>
            <DropDown array={userData} searchTitle={"מזהה בדיקה"} />
          </ShadowView>

        </HeaderView>
        <ButtomView>
          <CommonButton
            title={"הוסף בדיקה חדשה"}
            titleColor={colors.white}
            titleFontSize={fonts.large}
            buttonColor={colors.darkSkyBlue}
            buttonHeight={responsiveWidth(51)}
            // buttonWidth={responsiveWidth(300)}
            buttonWidth={layout.width < 600 ? "100%" : "37.5%"}
            buttonShadow={true}
            buttonShadowColor={colors.clearBlue}
            borderRadius={10}
            style={{
              marginTop: responsiveWidth(24),
              marginBottom: responsiveWidth(24),
              marginRight: layout.width > 600 ? responsiveWidth(10) : 0,
            }}
          >
            <View
              style={{
                position: layout.width < 600 ? "absolute" : "relative",
                right: 0,
                marginRight: layout.width < 600 ? responsiveWidth(10) : 0,
              }}
            >
              <Plus />
            </View>
          </CommonButton>

          {isAdmin && (
            <>
              <CommonButton
                onPress={() => openModal()}
                title={"ניהול משתמשים"}
                titleColor={colors.darkSkyBlue}
                titleFontSize={fonts.large}
                buttonColor={colors.white}
                buttonHeight={responsiveWidth(51)}
                // buttonWidth={responsiveWidth(300)}
                buttonWidth={layout.width < 600 ? "100%" : "37.5%"}
                buttonShadow={false}
                borderColor={colors.darkSkyBlue}
                borderRadius={10}
              >
                <View
                  style={{
                    position: layout.width < 600 ? "absolute" : "relative",
                    right: 0,
                    marginRight: layout.width < 600 ? responsiveWidth(10) : 0,
                  }}
                >
                  <UserList />
                </View>
              </CommonButton>

              <ModalContent modalContentStyle={{ flex: 1 }}>
                <UsersListScreen closeModal={closeModal} />
              </ModalContent>
            </>
          )}
        </ButtomView>
      </ScrollView>
    </SafeView>
  );
}
