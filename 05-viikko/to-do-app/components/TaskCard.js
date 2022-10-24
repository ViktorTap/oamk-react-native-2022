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
import { useToast } from "react-native-toast-notifications";
import { useFonts } from "expo-font";

export default function TaskCard({ task, getAllTasks }) {
  const [fontsLoaded] = useFonts({
    "FuzzyBubbles-Regular": require("../assets/fonts/FuzzyBubbles-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(
    task.deadline != "no deadline" ? new Date(task.deadline) : new Date()
  );
  const [todayIs, setTodayIs] = useState(new Date().toLocaleDateString());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const regex = /(\d+).(\d+).(\d+)/;
  const toast = useToast();

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

    toast.show("Task deleted!", {
      type: "warning",
      placement: "bottom",
      duration: 3000,
      offset: 30,

      animationType: "slide-in | zoom-in",
    });

    getAllTasks();
  };

  const deleteAfterArchive = (id) => {
    const indexToDelete = DATA.findIndex((element) => element.id === id);
    DATA.splice(indexToDelete, 1);

    getAllTasks();
  };

  const archiveTaskBtn = (id) => {
    task.archived = date.toLocaleDateString();

    const indexToDelete = DATA.findIndex((element) => element.id === id);
    ArchiveData.push(DATA[indexToDelete]);

    deleteAfterArchive(id);

    toast.show("Task is done and archieved!", {
      type: "success",
      placement: "bottom",
      duration: 3000,
      offset: 30,

      animationType: "slide-in | zoom-in",
    });
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
    setModalVisible(!modalVisible);
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

          <Text
            style={
              todayIs === task.deadline ? styles.basicTextDl : styles.basicText
            }
          >
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
                    <Text style={styles.modalTextHeader}>{task.title}</Text>

                    <TextInput
                      style={styles.titleBox}
                      placeholder="Title"
                      value={editTask.title}
                      onChangeText={(value) => updateTask("title", value)}
                    />
                    <TextInput
                      style={styles.descriptionBox}
                      placeholder="description"
                      multiline={true}
                      value={editTask.description}
                      onChangeText={(value) => updateTask("description", value)}
                    />
                    <View style={styles.prioritizedBox}>
                      <Text style={styles.modalText}>Prioritized?</Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={
                          editTask.prioritized ? "#f5dd4b" : "#f4f3f4"
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPrio}
                        value={editTask.prioritized}
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
                        <Text style={styles.modalText}>Deadline?</Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={
                            editTask.isEnabled ? "#f5dd4b" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitch}
                          value={editTask.isEnabled}
                        />
                      </View>
                      {editTask.isEnabled && (
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
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        onChange={onChange}
                      />
                    )}

                    <View
                      style={{
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Pressable
                        style={[styles.button, styles.buttonSubmitEdit]}
                        onPress={submitNewTask}
                      >
                        <Text style={styles.buttonTextStyle}>SAVE</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonCancelModal]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.buttonTextStyle}>CANCEL</Text>
                      </Pressable>
                    </View>
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
    backgroundColor: "#00D4A2",
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
  containerOld: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "#c1afa8",
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
    fontFamily: "Poppins-Regular",
  },
  basicText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  basicTextDl: {
    // color: "#FF3F32",
    fontSize: 20,
    fontWeight: "bold",
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
    borderWidth: 1,
  },
  modalView: {
    borderWidth: 1,
    // height: "85%",
    width: "75%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleBox: {
    width: "85%",
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
    width: "85%",
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
    width: "85%",
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
    width: "85%",
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

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonEdit: {
    backgroundColor: "#5B58EC",
  },
  buttonArchive: {
    backgroundColor: "#102A57",
  },
  buttonDelete: {
    backgroundColor: "#FF3F32",
  },

  buttonSubmitEdit: {
    backgroundColor: "#5B58EC",
    marginTop: 10,
    width: "55%",
  },
  buttonCancelModal: {
    backgroundColor: "#102A57",
    marginTop: 10,
    width: "55%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonTextStyle: {
    fontFamily: "FuzzyBubbles-Regular",
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  modalTextHeader: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});
