import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { DATA } from "./Data";

export default function App() {
  const [persons, setPersons] = useState([]);

  function renderItem({ item }) {
    return <Text>{item.name}</Text>;
  }

  useEffect(() => {
    const testArray = Array();
    for (let i = 0; i <= 10; i++) {
      testArray.push({
        id: i,
        name: "Raven " + i,
        image:
          "https://images.unsplash.com/photo-1613685087813-0739f218a464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      });
    }
    setPersons(testArray);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentScrollView}
      >
        {persons.map((item) => {
          return (
            <View style={styles.rowContainer} key={item.id}>
              <Image
                style={styles.miniLogo}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={styles.rowText}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
      <FlatList
        style={styles.flatListStyle}
        data={DATA}
        renderItem={renderItem}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    // marginTop: 3,
    marginBottom: 3,
    borderWidth: 3,
    padding: 5,
  },
  rowText: {
    fontSize: 20,
    marginLeft: 5,
  },
  miniLogo: {
    width: 32,
    height: 32,
  },
  scrollViewStyle: {
    borderWidth: 3,
    height: "50%",
    width: "50%",
    //padding: 5,
  },
  contentScrollView: {
    padding: 5,
  },
  flatListStyle: {
    marginTop: 20,
    height: "25%",
    borderWidth: 3,
    width: "50%",
  },
});
