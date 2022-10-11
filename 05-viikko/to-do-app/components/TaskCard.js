import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  Switch,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DATA } from "../Data";
import { ArchiveData } from "../ArchiveData";

export default function TaskCard({ task, getAllTasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // const [prioritized, setPrioritized] = useState(false);

  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    prioritized: task.prioritized,
    created: task.created,
    deadline:
      task.deadline === "no deadline"
        ? "no deadline"
        : task.deadLine && setIsEnabled(true),
  });

  let deadLine;
  if (isEnabled) {
    deadLine = date.toLocaleDateString().replace(/\//g, ".");
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const toggleSwitchPrio = () => {
    updateTask("prioritized", !editTask.prioritized);
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

  const deleteTaskBtn = (id) => {
    const indexToDelete = DATA.findIndex((element) => element.id === id);
    DATA.splice(indexToDelete, 1);
    getAllTasks();
  };

  const editTaskBtn = (id) => {
    console.log("EDITING: ", id);
    const indexToDelete = DATA.findIndex((element) => element.id === id);
  };

  const archiveTaskBtn = (id) => {
    const indexToDelete = DATA.findIndex((element) => element.id === id);
    ArchiveData.push(DATA[indexToDelete]);
    deleteTaskBtn(id);
    console.log(ArchiveData);
  };

  const updateTask = (key, value) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));

    console.log(DATA);
  };

  const submitNewTask = (event) => {
    event.preventDefault();

    Keyboard.dismiss();

    task.title = editTask.title;
    task.description = editTask.description;
    task.prioritized = editTask.prioritized;
    task.deadline = editTask.deadline;

    console.log(task);
  };

  useEffect(() => {
    if (isEnabled) {
      updateTask("deadline", date.toLocaleDateString().replace(/\//g, "."));
    } else {
      updateTask("deadline", "no deadline");
    }
  }, [date, isEnabled]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.basicInfoContainer}>
          <Text style={styles.basicText}>{task.title}</Text>
          <Text style={styles.basicText}>{task.deadline}</Text>
        </View>

        {isOpen && (
          <View>
            <Text>{task.description}</Text>
            <TouchableOpacity
              style={styles.touchableOpacityStyle}
              onPress={() => deleteTaskBtn(task.id)}
            >
              <FontAwesome name="trash" size={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => archiveTaskBtn(task.id)}>
              <Ionicons name="archive" size={32} />
            </TouchableOpacity>

            {/* --- --- --- --- MODAL --- --- --- --- */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Edit task: {task.title}</Text>
                  <Text>NewTask</Text>
                  <TextInput
                    placeholder="Title"
                    value={editTask.title}
                    onChangeText={(value) => updateTask("title", value)}
                  />
                  <TextInput
                    placeholder="description"
                    multiline={true}
                    value={editTask.description}
                    onChangeText={(value) => updateTask("description", value)}
                  />
                  <Text>Prioritized?</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={editTask.prioritized ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPrio}
                    value={editTask.prioritized}
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
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => editTaskBtn(task.id)}
                  >
                    <Text style={styles.textStyle}>EDIT</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="edit" size={32} />
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "#F8C286",
  },
  pressContainer: {
    padding: 10,
  },
  basicInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  descriptionContainer: {},
  basicText: {
    fontSize: 18,
  },

  touchableOpacityStyle: {
    borderWidth: 1,
    alignSelf: "flex-start",
  },

  // --- --- --- --- MODAL --- --- --- ---
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-start",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
