import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RadioForm from "react-native-simple-radio-button";

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function App() {
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("male");
  const [calories, setCalories] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [intensityItems, setIntensityItems] = useState([
    { label: "Sedentary", value: 1.3 },
    { label: "Lightly Active", value: 1.5 },
    { label: "Moderately Active", value: 1.7 },
    { label: "Very Active", value: 2 },
    { label: "Extremely Active", value: 2.2 },
  ]);
  const [open, setOpen] = useState(false);

  const calculateCalories = () => {
    let result = 0;
    if (gender === "male") {
      result = (879 + 10.2 * weight) * intensity;
    } else {
      result = (795 + 7.18 * weight) * intensity;
    }
    setCalories(result.toFixed(0));
  };

  useEffect(() => {
    weight == 0 || weight === "" || intensity === 0
      ? setButtonDisabled(true)
      : setButtonDisabled(false);
  }, [weight, intensity, buttonDisabled]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>CALORIE EXPENDITURE CALCULATOR</Text>
      </View>
      <View style={styles.containerTwo}>
        <Text style={styles.textStyle}>WEIGHT</Text>

        <TextInput
          style={styles.textStyleInput}
          keyboardType="numeric"
          placeholder="enter your weight"
          placeholderTextColor="lightGray"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.textStyle}>ACTIVITY LEVEL</Text>
        <DropDownPicker
          open={open}
          value={intensity}
          items={intensityItems}
          setOpen={setOpen}
          setValue={setIntensity}
          setItems={setIntensityItems}
          placeholder="Select your activity level"
          containerStyle={{
            width: "60%",
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <Text style={styles.textStyleGender}>GENDER</Text>
        <RadioForm
          radio_props={genders}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={"#2196f3"}
          animation={true}
          onPress={(value) => setGender(value)}
        />
        <TouchableOpacity
          style={[buttonDisabled ? styles.buttonDisabled : styles.button]}
          onPress={calculateCalories}
          disabled={buttonDisabled}
        >
          <Text>CALCULATE</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>CALORIE EXPENDITURE</Text>
        <Text style={styles.textStyle}>{calories !== 0 && calories}</Text>
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
  containerTwo: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#80ff80",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#808080",
    padding: 10,

    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 24,
  },
  textStyleGender: {
    fontSize: 24,
    marginBottom: 10,
  },
  textStyleInput: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
});
