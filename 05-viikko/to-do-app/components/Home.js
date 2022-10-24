import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, {
  useEffect,
  useState,
  useLayoutEffect,
  createRef,
  forwardRef,
  useRef,
} from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import TaskCard from "./TaskCard";
import { DATA } from "../Data";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ route, navigation }) {
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
  const ref = createRef();

  const { fontsLoaded } = route.params;

  const regex = /(\d+).(\d+).(\d+)/;

  const SearchBarHeader = (props) => (
    <TextInput
      style={props.searchBoxStyleProp}
      placeholder="search..."
      onChangeText={(search) => props.setSearch(search.toLowerCase())}
      defaultValue={props.search}
      autoFocus={true}
      returnKeyType="search"
    />
  );

  useLayoutEffect(() => {
    const searchBoxActive = () => {
      if (!searchBarFocused) {
        setSearchBarFocused(true);
      } else {
        setSearchBarFocused(false);

        setSearch("");
      }
    };

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

  const getAllTasks = () => {
    const mappedData = DATA.filter((task) => {
      return search.toLowerCase() === ""
        ? task
        : task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);
    }).map((task, index) => (
      <TaskCard
        task={task}
        key={index}
        getAllTasks={getAllTasks}
        fonts={fontsLoaded}
      />
    ));

    setTodos(mappedData.reverse());
  };

  useEffect(() => {
    getAllTasks();
    // console.log(searchBarFocused);
    const sBarRef = ref.current;
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
