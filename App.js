import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./routes/Navigator";
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
