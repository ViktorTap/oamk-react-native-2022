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

export default function NewTask({ route, navigation }) {
  const [createdDate] = useState(new Date().toLocaleDateString());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [prioritized, setPrioritized] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const regex = /(\d+).(\d+).(\d+)/;
  const [task, setTask] = useState({
    id: DATA.length === 0 ? 1 : DATA.length + 1,
    title: "",
    description: "",
    prioritized: prioritized,
    created: createdDate.replace(regex, "$2.$1.$3"),
    deadline: "",
    archived: "",
    isEnabled: isEnabled,
  });
  const { fontsLoaded } = route.params;
  const toast = useToast();

  // let deadline;
  // if (isEnabled) {
  //   deadline = date.toLocaleDateString().replace(/\//g, ".");
  // }

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

    setDate(new Date());

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
    if (task.title != "") {
      setIsSubmitActive(true);
    } else {
      setIsSubmitActive(false);
    }

    if (prioritized == true) {
      updateTask("prioritized", prioritized);
    } else {
      updateTask("prioritized", false);
    }

    if (isEnabled) {
      updateTask("deadline", date.toLocaleDateString());
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
          <Text
            style={{
              fontFamily: "Poppins-Regular",
            }}
          >
            Prioritized?
          </Text>
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
            <Text
              style={{
                fontFamily: "Poppins-Regular",
              }}
            >
              Deadline?
            </Text>
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
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 15,
    backgroundColor: "#00D4A2",
    color: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
    fontFamily: "Poppins-Regular",
  },
  descriptionBox: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 15,
    height: "15%",
    backgroundColor: "#00D4A2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
    fontFamily: "Poppins-Regular",
  },
  prioritizedBox: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F685",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  deadlineBox: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 15,
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FF9B37",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#284277",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  submitButtonDisabled: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    alignItems: "center",

    backgroundColor: "#ede8e4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
});
