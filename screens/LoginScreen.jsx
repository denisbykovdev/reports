import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import FormButton from "../common/FormButton";
import FormContainer from "../common/FormContainer";
import FormErrorMessage from "../common/FormErrorMessage";
import FormField from "../common/FormField";
import SafeView from "../common/SafeView";
import { loginSchema } from "../constants/validationSchema";
import useStatusBar from "../hooks/useStatusBar";
import Spinner from "../common/Spinner";
import AvoidingView from "../common/AvoidingView";
import { responsiveWidth } from "../utils/layout";
import colors from "../utils/colors";
import Logo from "../icons/Logo";
import EmailInput from "../icons/EmailInput";
import PassInput from "../icons/PassInput";
import Enter from "../icons/Enter";
import useAuth from "../hooks/useAuth";
import useSecureToken from "../hooks/useSecureToken";
import useSecureAdmin from "../hooks/useSecureAdmin";

export default function LoginScreen({ navigation }) {
  useStatusBar("dark-content", colors.paleGrayBg);

  const { authState, authDispatch, logIn } = useAuth()
  const secureAdmin = useSecureAdmin()
  const secureToken = useSecureToken()

  // useEffect(() => {
  //   console.log(
  //     "---autoLogin", secureToken, secureAdmin
  //   )
  //   if(secureToken && secureToken !== null) {
  //     authDispatch({
  //       type: "LOAD_TOKEN"
  //     })
  //     authDispatch({
  //       type: "SET_TOKEN",
  //       token: JSON.parse(secureToken),
  //       isAdmin: secureAdmin
  //     });

  //   }
      
  // }, [secureToken])

  // useEffect(() => {
  //   authState.token === null
  //     &&
  //     navigation.navigate(
  //       "AppStack",
  //       {
  //         screen: "Reports",
  //         params: {
  //           isAdmin: authState.isAdmin
  //           // isAdmin: true
  //         }
  //       }
  //     )
  // }, [authState.token])

  useEffect(() => {
 
       navigation.navigate(
        "AppStack",
        {
          screen: "Reports",
          params: {
            // isAdmin: authState.isAdmin
            isAdmin: true
          }
        }
      )
  }, [])

  async function handleOnLogin(values, { resetForm }) {
    const { email, password } = values;

    await logIn(email, password);

    await authState.token !== null && await resetForm();
  }

  return (
    <SafeView>
      <AvoidingView>
        <View style={styles.loginContainer}>

          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <FormContainer
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm }) => handleOnLogin(values, { resetForm })}
          >
            <FormField
              name="email"
              placeholder="שם משתמש"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              // autoFocus={true}
              width={responsiveWidth(180)}
              style={styles.loginField}
            >
              <EmailInput />
            </FormField>

            <FormField
              name="password"
              placeholder="סיסמה"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              width={responsiveWidth(180)}
              style={styles.loginField}
            >
              <PassInput />
            </FormField>

            {authState.loading && <Spinner />}

            {<FormErrorMessage error={authState.error !== null && String(authState.error)} visible={true} />}

            <FormButton
              title={"כניסה"}
              titleColor={colors.white}
              buttonHeight={responsiveWidth(43)}
              buttonColor={colors.darkSkyBlue}
              buttonWidth={responsiveWidth(180)}
              buttonShadow={true}
            >
              <Enter />
            </FormButton>
          </FormContainer>
        </View>
      </AvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    marginBottom: responsiveWidth(12),
    alignItems: 'center'
  },
  loginField: {
    marginBottom: responsiveWidth(12),
    width: responsiveWidth(180)
  }
})