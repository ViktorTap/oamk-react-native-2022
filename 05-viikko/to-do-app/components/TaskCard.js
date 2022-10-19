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
import * as Animatable from "react-native-animatable";

export default function TaskCard({ task, getAllTasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(
    task.deadline != "no deadline" ? new Date(task.deadline) : new Date()
  );
  const [todayIs, setTodayIs] = useState(new Date().toLocaleDateString());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const regex = /(\d+).(\d+).(\d+)/;

  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    prioritized: task.prioritized,
    created: task.created,
    deadline: date.toLocaleDateString(),
    isEnabled: task.isEnabled,
    archived: task.archived,
  });

  const toggleSwitch = () => {
    updateTask("isEnabled", !editTask.isEnabled);
  };

  const toggleSwitchPrio = () => {
    updateTask("prioritized", !editTask.prioritized);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShow(false);

    if (event?.type === "dismissed") {
      setDate(currentDate);
    }

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
    task.archived = date.toLocaleDateString();

    const indexToDelete = DATA.findIndex((element) => element.id === id);
    ArchiveData.push(DATA[indexToDelete]);
    deleteTaskBtn(id);

    // console.log(ArchiveData);
  };

  const updateTask = (key, value) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));

    // console.log(DATA);
  };

  const submitNewTask = (event) => {
    event.preventDefault();

    console.log(" <--- SUBMITTED ---> ");

    Keyboard.dismiss();

    task.title = editTask.title;
    task.description = editTask.description;
    task.prioritized = editTask.prioritized;
    task.deadline = editTask.deadline;
    task.isEnabled = editTask.isEnabled;
  };

  useEffect(() => {
    if (editTask.isEnabled) {
      updateTask("deadline", date.toLocaleDateString());
    } else {
      updateTask("deadline", "no deadline");
    }

    console.log(" <--- DATE ---> " + date.toLocaleDateString());
    console.log(" <--- TASK DATE ---> " + task.deadline);
  }, [date, editTask.isEnabled, task.deadline]);

  return (
    <Animatable.View
      style={
        todayIs === task.deadline
          ? styles.containerDeadline
          : todayIs > task.deadline
          ? styles.containerOld
          : styles.container
      }
      animation={todayIs === task.deadline ? "flash" : ""}
      easing="ease-out"
      iterationCount="infinite"
      iterationDelay={5000}
    >
      <Pressable
        style={styles.pressContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.basicInfoContainer}>
          <Text style={styles.basicText}>
            {task.title}{" "}
            {task.prioritized && (
              <FontAwesome name="star" size={18} color="gold" />
            )}
          </Text>

          <Text style={styles.basicText}>
            {task.deadline.replace(regex, "$2.$1.$3")}
          </Text>
        </View>

        {isOpen && (
          <View>
            <Text style={styles.infoContainerDescription}>
              {task.description}
            </Text>
            <View style={styles.openInfoButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => deleteTaskBtn(task.id)}
              >
                <FontAwesome name="trash" size={18} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonArchive]}
                onPress={() => archiveTaskBtn(task.id)}
              >
                <Ionicons name="archive" size={18} color="#FFFFFF" />
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
                    <Text style={styles.modalText}>
                      Edit task: {task.title}
                    </Text>
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
                      thumbColor={editTask.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={editTask.isEnabled}
                    />
                    {editTask.isEnabled && (
                      <Pressable onPress={showDatepicker}>
                        <Text>Show Calendar</Text>
                      </Pressable>
                    )}

                    <Pressable onPress={submitNewTask}>
                      <Text>SUBMIT NEW TASK</Text>
                    </Pressable>

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
                style={[styles.button, styles.buttonEdit]}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome name="edit" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Pressable>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "#F8C286",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  containerDeadline: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "red",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  containerOld: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "grey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },

  pressContainer: {
    padding: 10,
  },
  basicInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoContainerDescription: {
    marginTop: 10,
  },
  basicText: {
    fontSize: 18,
  },

  touchableOpacityStyle: {
    borderWidth: 1,
    alignSelf: "flex-start",
  },

  openInfoButtonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 10,
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
  buttonEdit: {
    backgroundColor: "#5B58EC",
  },
  buttonArchive: {
    backgroundColor: "#102A57",
  },
  buttonDelete: {
    backgroundColor: "#FF8E86",
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
