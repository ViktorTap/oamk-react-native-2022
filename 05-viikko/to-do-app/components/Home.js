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
import moment from "moment";
import "moment/locale/fi";

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
    }).map((task) => (
      <TaskCard task={task} key={task.id} getAllTasks={getAllTasks} />
    ));

    // console.log(search);

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
            Today is {weekday[date.getDay()]} {moment().format("l")}
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
    // paddingVertical: Constants.statusBarHeight,
    // paddingHorizontal: 10,
    padding: 10,
    // flex: 1,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  todosContainer: {
    height: "95%",
    // borderWidth: 1,
    marginTop: 10,
  },
  searchBoxBlur: {
    flexDirection: "row",
    // marginBottom: ,
    alignItems: "center",
    // borderWidth: 1,
    // borderRadius: 15,
    padding: 3,
    marginRight: 15,
    alignContent: "flex-start",
  },
  searchBoxFocus: {
    flexDirection: "row",
    // marginBottom: ,
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
