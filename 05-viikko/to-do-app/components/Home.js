import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import TaskCard from "./TaskCard";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { getDocs, tasksCollectionRef } from "../firebase/Config";
import * as Animatable from "react-native-animatable";

export default function Home({ route, navigation }) {
  const [search, setSearch] = useState("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  // <----- TESTING FIREBASE -----> //

  const [fbTasks, setFbTasks] = useState([]);

  // <----- TESTING FIREBASE -----> //

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

  const { fontsLoaded } = route.params;

  const regex = /(\d+).(\d+).(\d+)/;

  const SearchBarHeader = (props, searchRef) => (
    <TextInput
      style={props.searchBoxStyleProp}
      placeholder="search..."
      onChangeText={(search) => props.setSearch(search.toLowerCase())}
      defaultValue={props.search}
      autoFocus={true}
      returnKeyType="search"
    />
  );

  const searchBoxActive = () => {
    if (!searchBarFocused) {
      setSearchBarFocused(true);
    } else {
      setSearchBarFocused(false);

      setSearch("");
    }
  };

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
            <SearchBarHeader
              search={search}
              setSearch={setSearch}
              searchBoxStyleProp={styles.searchBoxText}
            />
          )}
        </View>
      ),
    });
  }, [searchBarFocused]);

  const getTasks = async () => {
    const tasksData = await getDocs(tasksCollectionRef);
    console.log(tasksData.docs);
    setFbTasks(tasksData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getTasks();
  }, [isFocused, search, searchBarFocused]);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["#81c8ee", "#ede8e4"]}
      start={{ x: 0.4, y: 0.3 }}
      end={{ x: 0.2, y: 0.95 }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.basicText}>
            Today is {weekday[date.getDay()]}{" "}
            {date.toLocaleDateString().replace(regex, "$2.$1.$3")}
          </Text>
        </View>
        <ScrollView
          style={styles.todosContainer}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          {fbTasks.length === 0 ? (
            <View
              style={[
                styles.container,
                {
                  justifyContent: "space-between",
                  height: 550,
                },
              ]}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 35,
                  }}
                >
                  No tasks yet 🙈
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Add new task ✍️
                </Text>
              </View>

              <Animatable.View
                animation="bounce"
                easing="ease-in-out"
                iterationCount="infinite"
                iterationDelay={2500}
              >
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="arrow-down" size={48} />
                </View>
              </Animatable.View>
            </View>
          ) : (
            fbTasks
              .filter((task) => {
                return search.toLowerCase() === ""
                  ? task
                  : task.title.toLowerCase().includes(search) ||
                      task.description.toLowerCase().includes(search);
              })
              .map((task) => (
                <TaskCard
                  task={task}
                  key={task.id}
                  getAllTasks={getTasks}
                  fonts={fontsLoaded}
                />
              ))
          )}
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  todosContainer: {
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
  searchBoxTextHidden: {
    display: "none",
  },
  basicText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
});
