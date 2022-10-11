import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import { DATA } from "../Data";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const isFocused = useIsFocused();

  const getAllTasks = () => {
    const mappedData = DATA.map((task) => {
      return <TaskCard task={task} key={task.id} getAllTasks={getAllTasks} />;
    });
    setTodos(mappedData.reverse());
  };

  useEffect(() => {
    getAllTasks();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.todosContainer}>
        {todos.length === 0 ? (
          <Text>"No tasks yet. Add new task." </Text>
        ) : (
          todos
        )}
      </ScrollView>
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
