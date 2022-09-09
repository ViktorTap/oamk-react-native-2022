import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleAddClick = () => {
    setCount(count + 1);
  };
  const handleSubClick = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text>This is demo!</Text>
      <TextInput onChangeText={setText} value={text} />
      <Text>This is the new text</Text>
      <Text>{count}</Text>

      <Button title="+" onPress={handleAddClick} />

      <Button title="-" onPress={handleSubClick} disabled={count == 0} />
      <Text>{text}</Text>
      <StatusBar style="auto" />
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
