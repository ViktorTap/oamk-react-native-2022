import { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [euros, setEuros] = useState(0);
  const [pounds, setPounds] = useState(0);
  const [reverseCalc, setReverseCalc] = useState(false);

  const handleChange = (num) => {
    !reverseCalc ? setEuros(num) : setPounds(num);
  };

  const handleSwap = () => {
    setReverseCalc(!reverseCalc);
    setEuros(0);
    setPounds(0);
  };
  const calculateEuroToPounds = () => {
    if (!reverseCalc) {
      const result = euros.replace(",", ".") * 0.9;
      setPounds(result);
    } else {
      const result = pounds.replace(",", ".") * 1.16;
      setEuros(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        {!reverseCalc
          ? "Calculate Euros to Pounds"
          : "Calculate Pounds to Euros"}
      </Text>
      <Text style={styles.text}>{reverseCalc ? "Pounds" : "Euros"}</Text>

      <TextInput
        style={styles.textInput}
        value={!reverseCalc ? euros : pounds}
        onChangeText={(num) => handleChange(num)}
        keyboardType="decimal-pad"
        autoComplete="off"
        clearTextOnFocus="true"
        maxLength={10}
        placeholder="enter amount"
        placeholderTextColor="lightgray"
      />

      <Text style={styles.text}>{reverseCalc ? "Euros" : "Pounds"}</Text>

      <Text>{!reverseCalc ? pounds.toFixed(2) : euros.toFixed(2)}</Text>

      {/* set empty space if zero */}

      <Button title="calculate" onPress={calculateEuroToPounds} />
      <Button title="Swap" onPress={handleSwap} />
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
  text: {
    margin: 8,
  },
  textInput: {
    borderWidth: 2,
    borderBottomColor: "black",
    borderRadius: 15,
    textAlign: "center",
    height: 40,
  },
});
