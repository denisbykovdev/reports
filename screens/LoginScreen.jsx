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

  const [loading, token, error, logIn] = useAuth();

  async function handleOnLogin(values) {
    const { email, password } = values;

    console.log(
      "---LoginScreen:handleOnLogin/creds:", email, password
    )

    await logIn(email, password);

    console.log(
      "---LoginScreen:handleOnLogin/after logIn:", token, loading, error
    )

    await token === null && navigation.navigate("AppStack")
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
              width={responsiveWidth(110)}
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
              width={responsiveWidth(110)}
              style={styles.loginField}
            >
              <PassInput />
            </FormField>

            {loading && <Spinner />}

            {<FormErrorMessage error={error !== null && String(error)} visible={true} />}

            <FormButton
              title={"כניסה"}
              titleColor={colors.white}
              buttonHeight={50}
              buttonColor={colors.darkSkyBlue}
              buttonWidth={responsiveWidth(255)}
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
    alignItems: 'center',
    // width: responsiveWidth(300)
  },
  loginField: {
    marginBottom: responsiveWidth(12),
    width: responsiveWidth(255)
  }
})