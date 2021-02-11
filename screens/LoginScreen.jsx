import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../common/FormButton";
import FormContainer from "../common/FormContainer";
import FormErrorMessage from "../common/FormErrorMessage";
import FormField from "../common/FormField";
import SafeView from "../common/SafeView";
import { loginSchema } from "../constants/validationSchema";
import useStatusBar from "../hooks/useStatusBar";
import useAuth from "../hooks/useAuth";
import Spinner from "../common/Spinner";
import AvoidingView from "../common/AvoidingView";
import { responsiveWidth } from "../utils/layout";
import fonts from "../utils/fonts";
import colors from "../utils/colors";
import Logo from "../icons/Logo";
import EmailInput from "../icons/EmailInput";
import PassInput from "../icons/PassInput";
import Enter from "../icons/Enter";

export default function LoginScreen({ navigation }) {
  useStatusBar("dark-content");

  const [loading, token, isAdmin, error, logIn] = useAuth("useAuth");

  async function handleOnLogin(values) {
    const { email, password } = values;

    console.log(
      "---LoginScreen:handleOnLogin/creds:", email, password
    )

    await logIn(email, password);

    console.log(
      "---LoginScreen:handleOnLogin/after logIn:", loading, token, isAdmin, error
    )
    

    await loading === false && navigation.navigate(
      "AppStack", {
        screen: "Reports",  params: {isAdmin: isAdmin}
      }
    )
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
            onSubmit={(values) => handleOnLogin(values)}
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

            {loading && <Spinner />}

            {<FormErrorMessage error={error !== null && String(error)} visible={true} />}

            <FormButton
              title={"כניסה"}
              titleColor={colors.white}
              buttonHeight={43}
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