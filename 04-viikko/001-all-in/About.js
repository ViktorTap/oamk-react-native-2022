import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useLayoutEffect, useEffect } from "react";
import Radiobutton from "./components/Radiobutton";
import { AntDesign } from "@expo/vector-icons";

export default function About({ route, navigation }) {
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const { loaded } = route.params;

  useEffect(() => {
    if (route.params?.message) {
      alert(route.params.message);
    }
    BackHandler.addEventListener("hardwareBackPress", close);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", close);
    };
  }, []);

  function close() {
    navigation.goBack(null);
    return true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#f0f0f0",
      },
      headerTitleStyle: {
        fontFamily: "Gruppo",
        fontSize: 30,
      },
      headerRight: () => (
        <AntDesign
          style={styles.navButton}
          name="arrowright"
          size={24}
          onPress={() => navigation.navigate("Landscape")}
        />
      ),
    });
  }, []);

  const options = [
    {
      label: "label one",
      value: "first value",
    },
    {
      label: "label two",
      value: "second value",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        This page is about custom RadioButton
      </Text>
      <Radiobutton
        options={options}
        onPress={(value) => {
          setRadioButtonValue(value);
        }}
      />
      <Text style={styles.textStyle}>
        {radioButtonValue ? radioButtonValue : "Select some value"}
      </Text>
      <Pressable style={styles.btnStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("Landscape")}>
          <Text style={styles.touchableOpac}> Go to landscape world! </Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    marginRight: 5,
    padding: 4,
  },
  textStyle: {
    fontFamily: "Teko",
    fontSize: 20,
    marginBottom: 20,
  },
  btnStyle: {
    borderWidth: 3,
    borderRadius: 15,
    padding: 5,
  },
  touchableOpac: {
    fontFamily: "Gruppo",
    fontSize: 30,
    width: 150,
    textAlign: "center",
  },
});
