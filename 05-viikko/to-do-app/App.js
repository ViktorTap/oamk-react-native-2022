import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import NewTask from "./components/NewTask";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Archive from "./components/Archive";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
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
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerTitle: "Home",
          }}
        />
        <Tab.Screen
          name="New Task"
          component={NewTask}
          options={{
            title: "New Task",
            headerTitle: "New Task",
          }}
        />
        <Tab.Screen
          name="Archive"
          component={Archive}
          options={{
            title: "Archive",
            headerTitle: "Archive",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
