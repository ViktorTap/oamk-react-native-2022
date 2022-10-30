import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import ArchiveTaskCard from "./ArchiveTaskCard";
import { LinearGradient } from "expo-linear-gradient";
import {
  getDocs,
  tasksCollectionRef,
  addDoc,
  archivedCollectionRef,
  deleteDoc,
  db,
  doc,
} from "../firebase/Config";

export default function Archive({ route }) {
  const [archive, setArchive] = useState([]);
  const { fontsLoaded } = route.params;
  const isFocused = useIsFocused();

  const getArchive = async () => {
    const archiveData = await getDocs(archivedCollectionRef);

    setArchive(archiveData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getArchive();
  }, [isFocused]);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["#81c8ee", "#ede8e4"]}
      start={{ x: 0.4, y: 0.3 }}
      end={{ x: 0.2, y: 0.95 }}
    >
      <View style={styles.containerMain}>
        <ScrollView style={styles.archiveContainer}>
          {archive.length === 0 ? (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                marginTop: 35,
              }}
            >
              No archived tasks 🙈
            </Text>
          ) : (
            archive.map((task) => {
              return (
                <ArchiveTaskCard
                  task={task}
                  key={task.id}
                  getAllArchiveTasks={getArchive}
                  fonts={fontsLoaded}
                  addDoc={addDoc}
                  tasksCollectionRef={tasksCollectionRef}
                  deleteDoc={deleteDoc}
                  db={db}
                  doc={doc}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    padding: 10,
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
