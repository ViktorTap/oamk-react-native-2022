import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function TaskCard({ task }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.basicInfoContainer}>
          <Text style={styles.basicText}>{task.title}</Text>
          <Text style={styles.basicText}>{task.deadline}</Text>
        </View>

        {isOpen && (
          <View>
            <Text>{task.description}</Text>
            <Text>DELETE icon</Text>
            <Text>EDIT icon</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "#F8C286",
  },
  pressContainer: {
    padding: 10,
  },
  basicInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  descriptionContainer: {},
  basicText: {
    fontSize: 18,
  },
});
