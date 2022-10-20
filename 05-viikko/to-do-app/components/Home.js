import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import TaskCard from "./TaskCard";
import { DATA } from "../Data";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const [date] = useState(new Date());
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isFocused = useIsFocused();
  const searchRef = useRef();

  const regex = /(\d+).(\d+).(\d+)/;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={
            searchBarFocused ? styles.searchBoxFocus : styles.searchBoxBlur
          }
        >
          {searchBarFocused ? (
            <TouchableOpacity onPress={() => searchBoxActive()}>
              <MaterialCommunityIcons name="cancel" size={18} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => searchBoxActive()}>
              <FontAwesome name="search" size={18} />
            </TouchableOpacity>
          )}

          {searchBarFocused && (
            <TextInput
              style={styles.searchBoxText}
              placeholder="search..."
              onChangeText={(search) => setSearch(search.toLowerCase())}
              defaultValue={search}
              ref={searchRef}
              autoFocus={true}
              returnKeyType="search"
            />
          )}
        </View>
      ),
    });
  }, [searchBarFocused]);

  const searchBoxActive = () => {
    if (!searchBarFocused) {
      setSearchBarFocused(true);
    } else {
      setSearchBarFocused(false);
      setSearch("");
    }
  };

  const getAllTasks = () => {
    const mappedData = DATA.filter((task) => {
      return search.toLowerCase() === ""
        ? task
        : task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);
    }).map((task, index) => (
      <TaskCard task={task} key={index} getAllTasks={getAllTasks} />
    ));

    setTodos(mappedData.reverse());
  };

  useEffect(() => {
    getAllTasks();
  }, [isFocused, search, searchBarFocused]);

  return (
    <LinearGradient
      colors={["#81c8ee", "#ede8e4"]}
      start={{ x: 0.4, y: 0.3 }}
      end={{ x: 0.2, y: 0.95 }}
    >
      <View style={styles.container}>
        <View>
          <Text>Ready to start your day?</Text>
          <Text>
            Today is {weekday[date.getDay()]}{" "}
            {date.toLocaleDateString().replace(regex, "$2.$1.$3")}
          </Text>
        </View>
        <ScrollView style={styles.todosContainer}>
          {todos.length === 0 ? (
            <Text>"No tasks yet. Add new task." </Text>
          ) : (
            todos
          )}
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  todosContainer: {
    height: "92%",
    marginTop: 10,
  },
  searchBoxBlur: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    marginRight: 15,
    alignContent: "flex-start",
  },
  searchBoxFocus: {
    flexDirection: "row",

    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 3,
    marginRight: 15,
    width: "75%",
  },
  searchBoxText: {
    marginLeft: 5,
  },
});
