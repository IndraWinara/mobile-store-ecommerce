import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigatorApp from "./NavigatorApp";
import GlobalProvider from "../context/GlobalContext";

const Navigator = () => {
  return (
    <GlobalProvider>
     <NavigatorApp/>
    </GlobalProvider>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
