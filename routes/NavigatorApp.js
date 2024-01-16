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
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { theme } from "../style/theme";
import { Image, Text, View } from "react-native";
import logoUser from '../assets/logo/logouser.png'
import logoStore from '../assets/logo/logostore.png'
import CouponSection from "../components/ListScreen/CouponSection";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const NavigatorApp = () => {
  const { sendToken } = useContext(GlobalContext);
  const { token } = sendToken;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
        <Stack.Screen name="drawer" component={MyDrawer} />
        {/* <Stack.Screen name="coupon" component={CouponSection} /> */}
        </>
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
    <Drawer.Navigator screenOptions={{headerRight: () => {
      return (
        <View
          style={{
            marginRight: 30,
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{justifyContent : "center", alignItems : "center"}}>
            <Image source={logoStore}/>
          </View>
          <View style={{justifyContent : "center", alignItems : "center"}}>
          <Image source={logoUser}/>
          </View>
        </View>
      );
    }}}>
      <Drawer.Screen name="User" component={MyTabs} options={{drawerLabel : 'test',title : false}} />
    </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home-outline";
          } else if (route.name === "wishlist") {
            iconName = "heart-outline";
          } else if (route.name === "cart") {
            iconName = "cart-outline";
          }else if (route.name === "search") {
            iconName = "search";
          }else if (route.name === "setting") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.secodary,
        // tabBarActiveBackgroundColor: theme.background,
        // tabBarInactiveBackgroundColor: theme.background,
      })}
>
      <Tab.Screen name="home" component={MainSection} options={{title : 'Home'}} />
      <Tab.Screen name="wishlist" component={MainSection} options={{title : 'Wishlist'}}/>
      <Tab.Screen name="cart" component={CartSection} options={{title : 'Cart'}} />
      <Tab.Screen name="search" component={ListSection} options={{title : 'Search'}}/>
      <Tab.Screen name="setting" component={ListSection} options={{title : 'Setting'}}/>
    </Tab.Navigator>
  );
}

//stuck -> drawer -> tab (index)
