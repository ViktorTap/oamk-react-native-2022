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
  const regex = /(\d+).(\d+).(\d+)/;

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
              <Text style={styles.basicText}>
                Archieved:{` `}
                {task.archived.replace(regex, "$2.$1.$3")}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => deleteTaskBtn(task.id)}
              >
                <FontAwesome name="trash" size={18} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonRestore]}
                onPress={() => restoreTaskBtn(task.id)}
              >
                <MaterialIcons name="restore" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

  descriptionContainer: {
    marginTop: 10,
  },
  basicText: {
    fontSize: 18,
  },
  infoContainerDescription: {
    marginTop: 10,
  },

  openInfoButtonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 10,
  },

  touchableOpacityStyle: {
    borderWidth: 1,
    alignSelf: "flex-start",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-start",
  },
  buttonDelete: {
    backgroundColor: "#FF3F32",
  },
  buttonRestore: {
    backgroundColor: "#5B58EC",
  },
});
