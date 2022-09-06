import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";

export default function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [bmiText, setBmiText] = useState("");
  const [colorBmi, setColorBmi] = useState("");

  // VALIDATION AND FOCUSING
  const REGEX_W_H = /\b[1-9]/;

  const [validWeight, setValidWeight] = useState(false);
  const [focusWeight, setFocusWeight] = useState(false);

  const [validHeight, setValidHeight] = useState(false);
  const [focusHeight, setFocusHeight] = useState(false);

  // WEIGHT
  const validateWeight = () =>
    REGEX_W_H.test(weight) ? setValidWeight(true) : setValidWeight(false);

  const focusedWeight = () => setFocusWeight(true);
  const blurredWeigth = () => setFocusWeight(false);

  // HEIGHT
  const validateHeight = () =>
    REGEX_W_H.test(height) && height.length > 2
      ? setValidHeight(true)
      : setValidHeight(false);

  const focusedHeight = () => setFocusHeight(true);
  const blurredHeigth = () => setFocusHeight(false);

  // BMI CALCULATION
  const calculateBmi = () => {
    setBmi(((weight / (height * height)) * 10000).toFixed(1));
    setWeight(0);
    setHeight(0);
    Keyboard.dismiss();
  };

  useEffect(() => {
    validateWeight();
    validateHeight();

    bmi < 18.5
      ? setBmiText("alipaino")
      : bmi >= 18.5 && bmi < 25
      ? setBmiText("normaali paino")
      : bmi >= 25 && bmi < 30
      ? setBmiText("lievä lihavuus")
      : bmi >= 30 && bmi < 35
      ? setBmiText("merkittävä lihavuus")
      : bmi >= 35 && bmi < 40
      ? setBmiText("vaikea lihavuus")
      : bmi >= 40
      ? setBmiText("sairaalloinen lihavuus")
      : "";

    bmi < 18.5 && bmi > 0
      ? setColorBmi("red")
      : bmi >= 18.5 && bmi < 25
      ? setColorBmi("green")
      : bmi >= 25 && bmi < 30
      ? setColorBmi("green")
      : bmi >= 30 && bmi < 35
      ? setColorBmi("orange")
      : bmi >= 35 && bmi < 40
      ? setColorBmi("orange")
      : bmi >= 40
      ? setColorBmi("red")
      : "";
  }, [weight, height]);

  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>PAINO (kg) </Text>
      <TextInput
        style={styles.textInputBox}
        onChangeText={setWeight}
        value={weight}
        keyboardType="numeric"
        maxLength={3}
        placeholder="paino"
        placeholderTextColor="lightgrey"
        onFocus={focusedWeight}
        onBlur={blurredWeigth}
        blurOnSubmit={true}
      />
      <Text>{!validWeight && focusWeight ? "Esimerkki: 80" : ""}</Text>
      <Text style={styles.textBox}>PITUUS (cm)</Text>
      <TextInput
        style={styles.textInputBox}
        onChangeText={setHeight}
        value={height}
        keyboardType="numeric"
        maxLength={3}
        placeholder="pituus"
        placeholderTextColor="lightgrey"
        onFocus={focusedHeight}
        onBlur={blurredHeigth}
        blurOnSubmit={true}
      />
      <Text>{!validHeight && focusHeight ? "Esimerkki: 185" : ""}</Text>
      <Text style={styles.textBox}>PAINOINDEKSI:</Text>
      <Text
        style={{
          color: colorBmi,
          fontSize: 24,
          marginTop: 8,
          marginBottom: 8,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {bmi == 0 ? " " : bmi}
      </Text>
      <Text
        style={{
          color: colorBmi,
          fontSize: 24,
          borderWidth: 3,
          borderRadius: 15,
          marginBottom: 20,
          width: 278,
          textAlign: "center",
          fontWeight: "bold",
          borderColor: colorBmi,
        }}
      >
        {bmi == 0 ? " " : bmiText}
      </Text>
      <Button
        title="LASKE"
        onPress={calculateBmi}
        disabled={!validWeight || !validHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    fontSize: 24,
  },
  textInputBox: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    width: 278,
  },
});
