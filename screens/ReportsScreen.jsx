import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import SafeView from "../common/SafeView";
import HeaderView from "../common/HeaderView";
import ButtomView from "../common/BottomView";
import CommonButton from "../common/CommonButton";
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";
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
import useType from "../hooks/useType";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setReports, watchDeleteReport, watchGetReports, watchPostReport, watchUpdateReport } from "../actionCreators/sagaReport";
import useAuth from "../hooks/useAuth";
// import { useIsConnected } from "react-native-offline";

function ReportsScreen({ route, navigation }) {

  useStatusBar("dark-content", colors.paleGrayBg);

  const initialMount = useRef(true);

  const { isAdmin } = route.params;

  const [userModalOpen, userModalClose, UserModalContent] = useModal();

  // const [reportsState, reportsDispatch] = useReports();

  const { type } = useType()

  const dispatch = useDispatch();

  const reportsSelector = useSelector((state) => state.sagaReport.reports, shallowEqual)

  const networkSelector = useSelector((state) => state.network, shallowEqual)

  const { authState } = useAuth()

  const { token } = authState

  // const isConnected = useIsConnected()

  useEffect(() => {
    console.log(
      "--- ReportsScreeen/isConnected:",
      // isConnected,
      networkSelector.isConnected,
      reportsSelector
    )
    dispatch(watchGetReports(token))
  }, [])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
    } else {
      if (
        networkSelector.isConnected === true
        && networkSelector.actionQueue
        && networkSelector.actionQueue.length >= 0
      ) {
        networkSelector.actionQueue.map(action =>
          action.type === 'WATCH_POST_REPORT'
            ? dispatch(watchPostReport(
              action.payload.token,
              action.payload.report,
              action.payload.areas,
              action.payload.notes
            ))
            : action.type === 'WATCH_UPDATE_REPORT'
              ? dispatch(watchUpdateReport(
                action.payload.token,
                action.payload.report,
                action.payload.areas,
                action.payload.notes
              ))
              : action.type === 'WATCH_DELETE_REPORT'
                ? dispatch(watchDeleteReport(
                  action.payload.token,
                  action.payload.report.id
                ))
                : action
        )
      }
    }
  }, [networkSelector.isConnected])

  const openPureReportHandler = () =>
    navigation.navigate(
      "AppStack",
      {
        screen: "Report",
        params: {
          reportId: null
        }
      }
      // "Report"
    )

  const reportsTitles = {
    // id: "",
    // status: "", //положение дел
    // customerNumber: "",
    // client: "",
    // address: "",
    // date: "",
    // editorsName: "",
    id: "מזהה בדיקה",
    status: "סטטוס",
    customer_name: "מספר לקוח",
    customer_full_name: "לקוח",
    report_adress: "כתובת",
    examination_date: "תאריך",
    tester_name: "שם העורך"
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
                  type === 2 ?
                    (
                      <Table
                        arrayProp={
                          // reportsState.reports !== null &&
                          // reportsState.reports
                          reportsSelector !== null && reportsSelector
                        }
                        searchTitle={"מזהה בדיקה"}
                        // dispatchMethod={reportsDispatch}
                        dispatchMethod={dispatch}
                        tableTitles={reportsTitles}
                      >
                      </Table>
                    ) : (
                      <DropDown
                        arrayProp={
                          // reportsState.reports !== null &&
                          // reportsState.reports
                          reportsSelector !== null && reportsSelector
                        }
                        searchTitle={"מזהה בדיקה"}
                        // dispatchMethod={reportsDispatch}
                        dispatchMethod={dispatch}
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
                buttonWidth={type === 2 ? "27%" : "100%"}
                buttonShadow={true}
                buttonShadowColor={colors.clearBlue}
                borderRadius={10}
                style={{
                  marginVertical: responsiveWidth(24),
                  marginRight: type === 2 ? responsiveWidth(10) : 0,
                }}
                onPress={() => openPureReportHandler()}
                titleStyle={{
                  marginEnd: type === 2 ? responsiveWidth(10) : 0
                }}
              >
                <View
                  style={{
                    position: type === 2 ? "relative" : "absolute",
                    right: type === 2 ? 0 : responsiveWidth(10)
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
                    buttonWidth={type === 2 ? "27%" : "100%"}
                    buttonShadow={false}
                    borderColor={colors.darkSkyBlue}
                    borderRadius={10}
                    titleStyle={{
                      marginEnd: type === 2 ? responsiveWidth(10) : 0
                    }}
                    style={{

                      marginRight: type === 2 ? responsiveWidth(10) : 0,
                    }}
                  >
                    <View
                      style={{
                        position: type === 2 ? "relative" : "absolute",
                        right: type === 2 ? 0 : responsiveWidth(10)
                      }}
                    >
                      <UserList />
                    </View>
                  </CommonButton>
                  <UserModalContent fullWidth>
                    <UsersListScreen closeModal={userModalClose} />
                  </UserModalContent>
                </>
              )}
            </ButtomView>
          </>
        </ScrollView>
      </AvoidingView>
    </SafeView >
  );
}

export default ReportsScreen;