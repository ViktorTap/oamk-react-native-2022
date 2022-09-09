// import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";

export default function App() {
  const [age, setAge] = useState("");
  const [lowerHr, setLowerHr] = useState(0);
  const [upperHr, setUpperHr] = useState(0);

  function handleAgeChange(age) {
    setAge(age ? parseInt(age) : "");
    setLowerHr(0);
    setUpperHr(0);
  }

  function handleHearRateCalculation() {
    setLowerHr(Math.round((220 - age) * 0.65));
    setUpperHr(Math.round((220 - age) * 0.85));
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headlines}>Age ✏️</Text>
      <TextInput
        style={styles.inputFields}
        value={age}
        onChangeText={handleAgeChange}
        maxLength={2}
        keyboardType="number-pad"
      />
      <Text style={styles.headlines}>❤️ Rate Limits</Text>
      <View style={styles.heartRateLimitsField}>
        <Text
          style={{
            fontSize: 24,
          }}
        >{`${lowerHr > 0 ? lowerHr : ""} - ${
          upperHr > 0 ? upperHr : ""
        }`}</Text>
      </View>
      <Button
        title="Show My Hear Rate Limits"
        onPress={handleHearRateCalculation}
        disabled={!age}
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
  headlines: {
    fontSize: 30,
    marginBottom: 8,
  },
  textField: {
    fontSize: 24,
    marginBottom: 8,
  },
  heartRateLimitsField: {
    width: 206,
    height: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inputFields: {
    height: 50,
    borderWidth: 3,
    borderColor: "darkblue",
    borderRadius: 15,
    textAlign: "center",
    marginBottom: 8,
    fontSize: 24,
    width: 206,
  },
});
