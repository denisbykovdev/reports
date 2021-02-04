import * as React from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";
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

// I18nManager.forceRTL(true);

export default function LoginScreen({ navigation }) {
  useStatusBar("dark-content");

  //   const [loading, token, error, logIn] = useAuth();

  async function handleOnLogin(values) {
    const { email, password } = values;
    // await logIn(email, password);
    // await token && navigation.navigate("AppStack");
  }

  return (
    <SafeView>
      <AvoidingView>
        <View style={styles.loginContainer}>

          <View style={styles.logoContainer}>
            <Text style={styles.logoTitle}>Eitan Peretz</Text>
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
            ></FormField>

            <FormField
              name="password"
              placeholder="סיסמה"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              width={responsiveWidth(110)}
              style={styles.loginField}
            ></FormField>

            {/* {loading && <Spinner />} */}
            <FormButton title={"כניסה"} />
            {/* {<FormErrorMessage error={error} visible={true} />} */}
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
    marginBottom: responsiveWidth(12)
  },
  loginField: {
    marginBottom: responsiveWidth(12)
  },
  logoTitle: {
    fontSize: fonts.xlarge,
    color: colors.azul
  }
})