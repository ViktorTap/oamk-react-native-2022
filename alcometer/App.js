import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import NumericInput from "react-native-numeric-input";

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState("male");
  const [alcoLevel, setAlcoLevel] = useState(0);

  const genders = [
    { label: "♂️", value: "male" },
    { label: "♀️", value: "female" },
  ];

  function calculateAlcoLevel() {
    if (!weight) {
      alertFun();
    }

    const litres = bottles * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = weight / 10;
    const gramsLeft = grams - burning * time;

    const result =
      gender === "male"
        ? gramsLeft / (weight * 0.7)
        : gramsLeft / (weight * 0.6);

    result < 0 ? setAlcoLevel(0) : setAlcoLevel(result.toFixed(2));
  }

  function alertFun() {
    Alert.alert("Weight is missing", "Enter your weight into weight input", [
      {
        text: "Roger That",
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.mainHeader}>ALCOMETER</Text>
        <Text style={styles.header}>WEIGHT</Text>
        <TextInput
          style={styles.inputTextStyle}
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
          placeholder="enter your weight"
        />
        <Text style={styles.header}>BOTTLES 🍻</Text>

        <NumericInput
          value={bottles}
          onChange={(value) => setBottles(value)}
          minValue={1}
          maxValue={10}
          totalWidth={200}
          totalHeight={50}
          iconSize={25}
          step={1}
          rounded
          borderColor={"#000000"}
          textColor="#2F2D51"
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor={bottles !== 10 ? "#0D94D3" : "gray"}
          leftButtonBackgroundColor={bottles !== 1 ? "#93D8F8" : "gray"}
        />
        <Text style={styles.headerTopBottomMargin}>TIME 🕐</Text>
        <NumericInput
          value={time}
          onChange={(value) => setTime(value)}
          minValue={1}
          borderColor={"#000000"}
          maxValue={10}
          totalWidth={200}
          totalHeight={50}
          iconSize={25}
          step={1}
          rounded
          textColor="#2F2D51"
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor={time !== 10 ? "#0D94D3" : "gray"}
          leftButtonBackgroundColor={time !== 1 ? "#93D8F8" : "gray"}
        />
        <Text style={styles.header}>🧔 GENDER 👩</Text>
        <RadioForm
          radio_props={genders}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={"#93D8F8"}
          selectedButtonColor={"#3BB64D"}
          animation={true}
          onPress={(value) => setGender(value)}
          labelColor={"red"}
        />
        <View
          style={
            alcoLevel === 0
              ? styles.alcoContainerWhite
              : alcoLevel <= 0.5
              ? styles.alcoContainerGreen
              : alcoLevel > 1 && alcoLevel != "Infinity"
              ? styles.alcoContainerRed
              : alcoLevel != "Infinity"
              ? styles.alcoContainerYellow
              : styles.alcoContainerWhite
          }
        >
          <Text style={styles.alcoLevelStyle}>
            {alcoLevel === 0 || alcoLevel == "Infinity" ? "" : alcoLevel}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          // disabled={!weight}
          onPress={calculateAlcoLevel}
        >
          <Text style={styles.buttonText}>🍾</Text>
          <Text style={styles.buttonText2}>CALCULATE</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // alignItems: "center",
    // justifyContent: "center",
  },
  scrollView: {
    height: "80%",
    width: "90%",
    marginTop: 30,
    marginBottom: 15,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
  },
  contentContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F2F7FF",
    height: "100%",
    borderRadius: 5,
    paddingVertical: 30,
  },
  mainHeader: {
    fontSize: 30,
    color: "#2F2D51",

    // marginBottom: 15,
    // marginTop: 15,
  },
  header: {
    fontSize: 20,
    color: "#2F2D51",
    // marginBottom: 10,
  },
  headerTopBottomMargin: {
    fontSize: 20,
    color: "#2F2D51",
    // marginBottom: 10,
    // marginTop: 10,
  },
  inputTextStyle: {
    fontSize: 18,
    marginBottom: 5,
    borderWidth: 1,
    width: "50%",
    height: 50,
    textAlign: "center",
    borderRadius: 5,
    color: "#2F2D51",
    backgroundColor: "#93D8F8",
  },
  alcoContainerWhite: {
    borderWidth: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  alcoContainerGreen: {
    borderWidth: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#3BB64D",
  },
  alcoContainerYellow: {
    borderWidth: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#FFFF5C",
  },
  alcoContainerRed: {
    borderWidth: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#F83E3E",
  },
  alcoLevelStyle: {
    // marginVertical: 15,
    fontSize: 24,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 30,
  },
  buttonText2: {
    fontSize: 10,
    fontWeight: "bold",
  },
  buttonStyle: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93D8F8",
  },
});
