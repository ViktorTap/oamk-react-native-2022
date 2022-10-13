import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { ArchiveData } from "../ArchiveData";
import { useIsFocused } from "@react-navigation/native";
import ArchiveTaskCard from "./ArchiveTaskCard";

export default function Archive() {
  const [archive, setArchive] = useState([]);

  const isFocused = useIsFocused();

  const getAllArchiveTasks = () => {
    const mappedData = ArchiveData.map((task, index) => {
      return (
        <ArchiveTaskCard
          task={task}
          key={index}
          getAllArchiveTasks={getAllArchiveTasks}
        />
      );
    });

    setArchive(mappedData.reverse());
  };

  useEffect(() => {
    getAllArchiveTasks();
  }, [isFocused]);

  return (
    <View style={styles.containerMain}>
      <ScrollView style={styles.archiveContainer}>{archive}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    padding: 10,
    backgroundColor: "#ECECEC",
  },

  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "#F8C286",
  },

  archiveContainer: {
    height: "100%",
  },
});
