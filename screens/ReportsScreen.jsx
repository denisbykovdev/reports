import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
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
import ModalHeader from "../common/ModalHeader";
import UsersListScreen from "./UsersListScreen";

export default function ReportsScreen({ route }) {
  useStatusBar("dark-content", colors.paleGrayBg);

  const { isAdmin } = route.params;

  console.log("---ReportsScreen/route.params.isAdmin", isAdmin);

  const [openModal, closeModal, ModalContent] = useModal();

  return (
    <SafeView>
      <HeaderView>
        <View>
          <Text>/test</Text>
        </View>
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
    </SafeView>
  );
}
