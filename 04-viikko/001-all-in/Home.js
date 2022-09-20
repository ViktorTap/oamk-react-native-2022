import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";

export default function Home({ route, navigation }) {
  const { loaded } = route.params;

  const [message, setMessage] = useState("");

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
          onPress={() => navigation.navigate("About", { message: message })}
        />
      ),
    });
  }, [message]);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Use Arrow Right to go to About page</Text>
      <TextInput
        style={styles.textInputSylte}
        onChangeText={(value) => setMessage(value)}
        value={message}
        placeholder="Type message here"
      />
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
    fontSize: 28,
    color: "#272AB0",
  },
  textInputSylte: {
    borderWidth: 3,
    borderRadius: 15,
    width: 200,
    height: 50,
    padding: 3,
    textAlign: "center",
    fontFamily: "Teko",
    fontSize: 24,
    marginTop: 40,
    borderColor: "#272AB0",
    color: "E91E63",
  },
});
