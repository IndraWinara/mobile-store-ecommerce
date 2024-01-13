import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { theme, themeInput } from "../../style/theme";
import {
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topLogin}>
        <Text style={styles.title}>Forgot Password?</Text>
      </View>
      <View style={styles.midLog}>
        <View style={styles.inputContainer}>
          <View style={{ position: "absolute", top: "60%", left: "5%" }}>
          <MaterialIcons name="email" size={24} color={themeInput.iconColor} />
          </View>
          <TextInput
            inputMode="email"
            placeholder="Enter your email address"
            style={styles.inputText}
          />
        </View>
        <Text style={{ color: themeInput.text }}>
          <Text style={{ color: theme.secodary }}>*</Text>We will send you a
          message to set or reset your new password
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('login')}>
          <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
  },
  topLogin: {
    marginTop: "30%",
    marginBottom: "15%",
  },
  title: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 15,
    backgroundColor: themeInput.background,
    borderRadius: 10,
    borderColor: themeInput.front,
    borderWidth: 2,
    position: "relative",
  },
  inputText: {
    color: themeInput.front,
    paddingLeft: 30,
    fontSize: 15,
  },
  midLog: {
    gap: 20,
  },
  forgotPass: {
    textAlign: "right",
    color: theme.secodary,
  },
  loginButton: {
    backgroundColor: theme.secodary,
    padding: 17,
    borderRadius: 8,
    alignItems: "center",
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.primary,
  },
  botLog: {
    marginTop: "20%",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
    width: "100%",
  },
  logoWraper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.primary,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.secodary,
  },
  signWrapper: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  linkText: {
    color: theme.secodary,
    fontWeight: "900",
    textDecorationLine: "underline",
    textDecorationColor: theme.secodary,
    textDecorationStyle: "solid",
  },
});
