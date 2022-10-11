import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ArchiveData } from "../ArchiveData";
import { DATA } from "../Data";

export default function ArchiveTaskCard({ task, getAllArchiveTasks }) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteTaskBtn = (id) => {
    const indexToDelete = ArchiveData.findIndex((element) => element.id === id);
    ArchiveData.splice(indexToDelete, 1);
    getAllArchiveTasks();
  };

  const restoreTaskBtn = (id) => {
    const indexToDelete = ArchiveData.findIndex((element) => element.id === id);
    DATA.push(ArchiveData[indexToDelete]);
    deleteTaskBtn(id);
  };

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

            <TouchableOpacity onPress={() => restoreTaskBtn(task.id)}>
              <MaterialIcons name="restore" size={32} />
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
});
