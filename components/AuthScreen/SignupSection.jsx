import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";
import { theme, themeInput } from "../../style/theme";
import {
  FontAwesome,
  Fontisto,
  AntDesign,
  Zocial,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CheckIcon, Select } from "native-base";
import { useMutation } from "../../hooks/useMutations";

const SignupSection = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('')
  const navigation = useNavigation();
  const {mutate} = useMutation()
  const handleSubmit = async ()=>{
    const cekData = {username,email,password,role}
    for (const key in cekData) {
      if (!cekData[key]) {
        return Alert.alert('Lengkapi dahulu')
      }
    }
    await mutate({url : 'http://192.168.1.68:5000/api/v1/register-user',payload : cekData })
    Alert.alert('Success Register Silahkan Login')
    navigation.navigate('login')
  }


  
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topLogin}>
        <Text style={styles.title}>Create an account</Text>
      </View>
      <View style={styles.midLog}>
        <View style={styles.inputContainer}>
          <View style={{ position: "absolute", top: "50%", left: "5%" }}>
            <FontAwesome name="user" size={20} color={themeInput.iconColor} />
          </View>
          <TextInput
            onChangeText={(e)=> setUsername(e)}
            inputMode="text"
            placeholder="Username"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(e)=> setEmail(e)}
            placeholder="Email"
            style={styles.inputText}
            keyboardType="email-address"
          />
          <View style={{ position: "absolute", top: "50%", left: "5%" }}>
          <Fontisto name="email" size={20} color={themeInput.iconColor} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(e)=> setPassword(e)}
            placeholder="Password"
            style={styles.inputText}
            secureTextEntry
          />
          <View style={{ position: "absolute", top: "50%", left: "5%" }}>
            <Fontisto name="locked" size={20} color={themeInput.iconColor} />
          </View>
        </View>
          <Select
          selectedValue={role}
          onValueChange={e => setRole(e)}
          backgroundColor={themeInput.background}
          borderWidth={'2'}
          borderColor={themeInput.front}
          borderRadius={'md'}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Role"
          >
            <Select.Item label="User" value="user" />
            <Select.Item label="Seller" value="seller" />
          </Select>

        <Text>
          By clickinng the <Text style={styles.forgotPass}>Register</Text>{" "}
          button, you agree to the public offer
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
        >
          <Text style={styles.textButton}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botLog}>
        <View style={styles.chooseText}>
          <Text>- OR Continue with -</Text>
        </View>
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <AntDesign name="google" size={20} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <Ionicons name="logo-apple" size={20} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoWraper}>
            <Text>
              <AntDesign name="facebook-square" size={20} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signWrapper}>
          <Text>I Already Have an Account</Text>
          <TouchableOpacity  onPress={() => navigation.navigate("login")}>
            <Text style={styles.linkText}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupSection;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
  },
  topLogin: {
    marginTop: "15%",
    marginBottom: "5%",
  },
  title: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 10,
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
    marginTop: "10%",
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
