import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import Data from "../Data";

export default function Home() {
  const [todos, setTodos] = useState();

  const getAllTasks = () => {
    const mappedData = Data.DATA.map((task) => {
      return <TaskCard task={task} key={task.id} />;
    });
    setTodos(mappedData.reverse());
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.todosContainer}>{todos}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // flex: 1,
    backgroundColor: "#ECECEC",
    // alignItems: "center",
    // justifyContent: "center",
  },
  todosContainer: {
    height: "100%",
  },
});
