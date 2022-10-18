import {
  Switch,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DATA } from "../Data";
import { LinearGradient } from "expo-linear-gradient";

import { useToast } from "react-native-toast-notifications";

import moment from "moment";
import "moment/locale/fi";

export default function NewTask({ navigation }) {
  // moment.locale("fi");
  const [createdDate] = useState(moment().format("L"));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [prioritized, setPrioritized] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [task, setTask] = useState({
    id: DATA.length === 0 ? 1 : DATA.length + 1,
    title: "",
    description: "",
    prioritized: prioritized,
    created: createdDate,
    deadline: "",
    archived: "",
    isEnabled: isEnabled,
  });

  const toast = useToast();

  let deadLine;
  if (isEnabled) {
    deadLine = date.toLocaleDateString().replace(/\//g, ".");
  }

  const toggleSwitch = () => setIsEnabled(() => !isEnabled);
  const toggleSwitchPrio = () => {
    setPrioritized(() => !prioritized);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    {
      setShow(!show);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const updateTask = (key, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const submitNewTask = (event) => {
    event.preventDefault();
    Keyboard.dismiss();

    DATA.push(task);

    // Set task to default
    setTask({
      id: DATA.length === 0 ? 1 : DATA.length + 1,
      title: "",
      description: "",
      prioritized: prioritized,
      created: task.created,
      deadline: "",
      archived: "",
      isEnabled: isEnabled,
    });

    console.log("This is the new task: ", task);

    setIsEnabled(false);
    setPrioritized(false);

    toast.show("Task created successfully", {
      type: "success",
      placement: "bottom",
      duration: 3000,
      offset: 30,
      animationType: "slide-in | zoom-in",
    });

    navigation.navigate("Home");
  };

  useEffect(() => {
    // console.log(" <--- USEEFFECT ---> ");
    // console.log("PRIORITIZED: ---> " + prioritized);
    if (task.title != "") {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }

    if (prioritized == true) {
      updateTask("prioritized", prioritized);
      // console.log(prioritized);
    } else {
      updateTask("prioritized", false);
      // console.log(prioritized);
    }

    if (isEnabled) {
      updateTask("deadline", date.toLocaleDateString().replace(/\//g, "."));
      updateTask("isEnabled", isEnabled);
    } else {
      updateTask("deadline", "no deadline");
      updateTask("isEnabled", false);
    }
  }, [date, isEnabled, prioritized, task.title]);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#81c8ee", "#ede8e4"]}
      start={{ x: 0.4, y: 0.3 }}
      end={{ x: 0.2, y: 0.95 }}
    >
      <View style={styles.informationContainer}>
        <TextInput
          placeholder="Title"
          value={task.title}
          onChangeText={(value) => updateTask("title", value)}
          style={styles.titleBox}
        />

        <TextInput
          placeholder="Description..."
          multiline={true}
          value={task.description}
          onChangeText={(value) => updateTask("description", value)}
          maxLength={150}
          style={styles.descriptionBox}
        />
        <View style={styles.prioritizedBox}>
          <Text>Prioritized?</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={prioritized ? "#284277" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchPrio}
            value={prioritized}
          />
        </View>
        <View style={styles.deadlineBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Deadline?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#284277" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {isEnabled && (
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  padding: 1,
                  width: "50%",
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: "#284277",
                }}
              >
                Show 📆
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={submitNewTask}
          style={
            isSubmitActive ? styles.submitButton : styles.submitButtonDisabled
          }
          disabled={!isSubmitActive}
        >
          {isSubmitActive ? (
            <Text
              style={{
                color: "#fff",
              }}
            >
              CREATE A TASK
            </Text>
          ) : (
            <Text
              style={{
                color: "#000",
              }}
            >
              TITLE IS MISSING
            </Text>
          )}
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            onChange={onChange}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 100,
    alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 1,
  },
  informationContainer: {
    flex: 1,
    // alignContent: "space-around",
    justifyContent: "center",
    // backgroundColor: "grey",
    width: "60%",
  },
  titleBox: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
    // backgroundColor: "#284277",
    // color: "#fff",
  },
  descriptionBox: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
    height: "15%",
  },
  prioritizedBox: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deadlineBox: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginBottom: 15,
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#284277",
  },
  submitButtonDisabled: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    alignItems: "center",

    backgroundColor: "#ede8e4",
  },
});
