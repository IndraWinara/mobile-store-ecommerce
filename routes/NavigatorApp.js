import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelloWorld from "../components/HelloWorld";
import Open1 from "../components/SplashScreen/Open1";
import Open2 from "../components/SplashScreen/Open2";
import Open3 from "../components/SplashScreen/Open3";
import LoginSection from "../components/AuthScreen/LoginSection";
import SignupSection from "../components/AuthScreen/SignupSection";
import ForgotPassword from "../components/AuthScreen/ForgotPassword";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainSection from "../components/MainScreen/MainSection";
import CartSection from "../components/CartScreen/CartSection";
import ListSection from "../components/ListScreen/ListSection";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const NavigatorApp = () => {
  const { sendToken } = useContext(GlobalContext);
  const { token } = sendToken;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="drawer" component={MyDrawer} />
      ) : (
        <>
          <Stack.Screen name="open1" component={Open1} />
          <Stack.Screen name="open2" component={Open2} />
          <Stack.Screen name="open3" component={Open3} />
          <Stack.Screen name="login" component={LoginSection} />
          <Stack.Screen name="signup" component={SignupSection} />
          <Stack.Screen name="forgot" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigatorApp;

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="User" component={MyTabs} />
    </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="main" component={MainSection} />
      <Tab.Screen name="cart" component={CartSection} />
      <Tab.Screen name="list" component={ListSection} />
    </Tab.Navigator>
  );
}

//stuck -> drawer -> tab (index)
