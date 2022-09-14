import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGreen, setIsGreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsGreen(false);
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        {isLoading && <ActivityIndicator size="large" />}
      </View>
      <Button title="ON/OFF" onPress={() => setIsLoading(!isLoading)} />
      <View
        style={{
          marginTop: 50,
        }}
      >
        {isGreen && <ActivityIndicator size="large" color="#00ff00" />}
      </View>
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
});
