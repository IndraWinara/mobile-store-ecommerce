import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { theme, themeInput } from "../../style/theme";
import {
  FontAwesome,
  Fontisto,
  AntDesign,
  Zocial,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";
import { useMutation } from "../../hooks/useMutations";

const LoginSection = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendToken } = useContext(GlobalContext);
  const { setToken } = sendToken;
  const {mutate} = useMutation()
  const handleLogin = async ()=>{
    const cekData = {email,password}
    for (const key in cekData) {
      if (!cekData[key]) {
        return Alert.alert('Lengkapi dahulu')
      }
    }
    const response = await mutate({url : 'http://192.168.1.68:5000/api/v1/login-user',payload : cekData })
    if(response.success === false){
      return Alert.alert('Email atau Password Salah')
    } else {
      setToken(response.token)
    }
  }
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topLogin}>
        <Text style={styles.title}>Welcome Back !</Text>
      </View>
      <View style={styles.midLog}>
        <View style={styles.inputContainer}>
          <View style={{ position: "absolute", top: "50%", left: "5%" }}>
            <FontAwesome name="user" size={24} color={themeInput.iconColor} />
          </View>
          <TextInput
            onChangeText={(e) => setEmail(e)}
            inputMode="email"
            placeholder="Email"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            style={styles.inputText}
            secureTextEntry
          />
          <View style={{ position: "absolute", top: "50%", left: "5%" }}>
            <Fontisto name="locked" size={24} color={themeInput.iconColor} />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("forgot")}>
          <Text style={styles.forgotPass}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botLog}>
        <View style={styles.chooseText}>
          <Text>- OR Continue with -</Text>
        </View>
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <AntDesign name="google" size={25} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <Ionicons name="logo-apple" size={25} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <AntDesign name="facebook-square" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signWrapper}>
          <Text>Create An Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginSection;

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
