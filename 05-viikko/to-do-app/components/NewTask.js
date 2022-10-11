import {
  Switch,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DATA } from "../Data";

export default function NewTask() {
  const [createdDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [prioritized, setPrioritized] = useState(false);

  const [task, setTask] = useState({
    id: DATA.length === 0 ? 1 : DATA.length + 1,
    title: "",
    description: "",
    prioritized: prioritized,
    created: createdDate.toLocaleDateString().replace(/\//g, "."),
    deadline: "",
    archived: "",
  });

  let deadLine;
  if (isEnabled) {
    deadLine = date.toLocaleDateString().replace(/\//g, ".");
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
      created: createdDate.toLocaleDateString().replace(/\//g, "."),
      deadline: "",
      archived: "",
    });

    console.log("This is the new task: ", task);

    setIsEnabled(false);
    setPrioritized(false);
  };

  useEffect(() => {
    console.log(" <--- USEEFFECT ---> ");
    console.log("PRIORITIZED: ---> " + prioritized);

    if (prioritized == true) {
      updateTask("prioritized", prioritized);
      // console.log(prioritized);
    } else {
      updateTask("prioritized", false);
      // console.log(prioritized);
    }

    if (isEnabled) {
      updateTask("deadline", date.toLocaleDateString().replace(/\//g, "."));
    } else {
      updateTask("deadline", "no deadline");
    }
  }, [date, isEnabled, prioritized]);

  return (
    <View style={styles.container}>
      <Text>NewTask</Text>
      <TextInput
        placeholder="Title"
        value={task.title}
        onChangeText={(value) => updateTask("title", value)}
      />
      <TextInput
        placeholder="description"
        multiline={true}
        value={task.description}
        onChangeText={(value) => updateTask("description", value)}
      />
      <Text>Prioritized?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={prioritized ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchPrio}
        value={prioritized}
      />
      <Text>Deadline?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {isEnabled && (
        <Pressable onPress={showDatepicker}>
          <Text>Show Calendar</Text>
        </Pressable>
      )}

      <Pressable onPress={submitNewTask}>
        <Text>SUBMIT NEW TASK</Text>
      </Pressable>
      <Text>selected: {date.toLocaleDateString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "center",
  },
});
