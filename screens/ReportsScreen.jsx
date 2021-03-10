import React from "react";
import { ScrollView, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import layout, { responsiveWidth } from "../utils/layout";
import Plus from "../icons/Plus";
import UserList from "../icons/UserList";
import useStatusBar from "../hooks/useStatusBar";
import fonts from "../utils/fonts";
import useModal from "../hooks/useModal";
import UsersListScreen from "./UsersListScreen";
import CommonHeader from "../common/CommonHeader";
import Reports from "../icons/Reports";
import DropDown from "../common/DropDown";
import ShadowView from "../common/ShadowView";
import AvoidingView from "../common/AvoidingView";
import useReports from "../hooks/useReports";
import Table from "../common/Table";
import { useNavigation } from "@react-navigation/core";

function ReportsScreen({ route }) {

  useStatusBar("dark-content", colors.paleGrayBg);

  const { isAdmin } = route.params;

  console.log(
    "---ReportsScreen/params.isAdmin:", isAdmin
  )

  const [userModalOpen, userModalClose, UserModalContent] = useModal();

  const [reportsState, reportsDispatch] = useReports();

  console.log(
    "---ReportsScreen/reportsState.reports:", reportsState.reports
  )

  const navigation = useNavigation()

  const openReportHandler = () =>
    navigation.navigate(
      "AppStack",
      {
        screen: "Report",
        params: {
          reportId: null
        }
      }
    )

  const reportsTitles = {
    id: "",
    status: "", //положение дел
    customerNumber: "",
    client: "",
    address: "",
    date: "",
    editorsName: ""
  }

  return (
    <SafeView>
      <AvoidingView>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
        >
          <>
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
                {
                  layout.width > 600 ?
                    (
                      <Table
                        arrayProp={
                          reportsState.reports !== null &&
                          reportsState.reports
                        }
                        searchTitle={"מזהה בדיקה"}
                        dispatchMethod={reportsDispatch}
                        tableTitles={reportsTitles}
                      >
                      </Table>
                    ) : (
                      <DropDown
                        arrayProp={
                          reportsState.reports !== null &&
                          reportsState.reports
                        }
                        searchTitle={"מזהה בדיקה"}
                        dispatchMethod={reportsDispatch}
                      >
                      </DropDown>
                    )
                }
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
                onPress={
                  () => openReportHandler()
                }
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
                    onPress={() => userModalOpen()}
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
                  <UserModalContent>
                    <UsersListScreen closeModal={userModalClose} />
                  </UserModalContent>
                </>
              )}
            </ButtomView>
          </>
        </ScrollView>
      </AvoidingView>
    </SafeView>
  );
}

export default ReportsScreen;