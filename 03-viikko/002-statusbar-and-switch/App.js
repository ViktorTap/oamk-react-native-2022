import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import Constants from "expo-constants";

// USING ANDROID!

export default function App() {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={isHidden} backgroundColor="#C2185B" />
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
        }}
      >
        {!isHidden
          ? "Switch statusbar state 😉"
          : "NO STATUSBAR! 🤓 TRY AGAIN!"}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#C2185B" }}
        thumbColor={isHidden ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsHidden(!isHidden)}
        value={isHidden}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    alignItems: "center",
    //justifyContent: "center",
  },
});
