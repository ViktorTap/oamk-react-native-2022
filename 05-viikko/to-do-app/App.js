import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import NewTask from "./components/NewTask";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Archive from "./components/Archive";
import { Ionicons } from "@expo/vector-icons";
import { ToastProvider } from "react-native-toast-notifications";
import { useFonts } from "expo-font";

export default function App() {
  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    "FuzzyBubbles-Regular": require("./assets/fonts/FuzzyBubbles-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    console.log("No problem with fonts");
  }

  return (
    <ToastProvider
      successColor="#00D4A2"
      warningColor="#FF3F32"
      textStyle={{
        color: "#000",
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "New Task") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Archive") {
                iconName = focused ? "archive" : "archive-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerStyle: {
              backgroundColor: "#81c8ee",
              elevation: 2,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 15,
              shadowColor: "#000",
            },
            headerTintColor: "#102A57",
            tabBarItemStyle: {
              backgroundColor: "#ede8e4",
            },
            headerTitleStyle: {
              fontFamily: "Poppins-Bold",
            },
            tabBarActiveTintColor: "#284277",
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: "true",
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerTitle: "Home",
            }}
            initialParams={fontsLoaded}
          />
          <Tab.Screen
            name="New Task"
            component={NewTask}
            options={{
              title: "New Task",
              headerTitle: "Create a Task",
            }}
            initialParams={fontsLoaded}
          />
          <Tab.Screen
            name="Archive"
            component={Archive}
            options={{
              title: "Archive",
              headerTitle: "Archive",
            }}
            initialParams={fontsLoaded}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
