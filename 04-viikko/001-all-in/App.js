import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import Home from "./Home";
import About from "./About";
import Landscape from "./Landscape";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Gruppo: require("./assets/fonts/Gruppo-Regular.ttf"),
    Teko: require("./assets/fonts/Teko-SemiBold.ttf"),
  });

  if (!loaded) return null;

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={loaded}
          options={{
            title: "Home",
            headerTitle: "Home",
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          initialParams={loaded}
          options={{
            title: "About",
            headerTitle: "About",
          }}
        />
        <Stack.Screen
          name="Landscape"
          component={Landscape}
          initialParams={loaded}
          options={{
            title: "Landscape",
            headerTitle: "Landscape",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
