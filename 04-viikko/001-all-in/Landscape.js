import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Landscape({ route, navigation }) {
  const [screenOrientation, setScreenOrientation] = useState(
    "SCREEN ORIENTATION IS PORTRAIT"
  );
  const [isPortrait, setIsPortrait] = useState(true);
  const [locked, setLocked] = useState(false);
  const { loaded } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#f0f0f0",
      },
      headerTitleStyle: {
        fontFamily: "Gruppo",
        fontSize: 30,
      },
      headerRight: () => (
        <AntDesign
          style={styles.navButton}
          name="home"
          size={24}
          onPress={() => navigation.navigate("Home")}
        />
      ),
      headerShown: isPortrait ? true : false,
    });
  }, [navigation, isPortrait]);

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
    setLocked(true);
  };

  const unLockOrientation = async () => {
    await ScreenOrientation.unlockAsync();
    setLocked(false);
  };

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (value) => {
        if (
          value.orientationInfo.orientation ===
          ScreenOrientation.Orientation.PORTRAIT_UP
        ) {
          setScreenOrientation("SCREEN ORIENTATION IS PORTRAIT");
          setIsPortrait(true);
        } else if (
          value.orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
          value.orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_LEFT
        ) {
          setScreenOrientation("SCREEN ORIENTATION IS LANDSCAPE");
          setIsPortrait(false);
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [screenOrientation]);

  return (
    <View
      style={isPortrait ? styles.containerPortrait : styles.containerLandscape}
    >
      <Text style={styles.textStyleTeko}>USE LOCK TO LOCK PORTRAIT SCREEN</Text>

      <Pressable
        style={
          isPortrait
            ? styles.pressableContainerPortrait
            : styles.pressableContainerLandscape
        }
      >
        <AntDesign
          name={!locked ? "unlock" : "lock"}
          size={60}
          onPress={!locked ? lockToPortrait : unLockOrientation}
        />
      </Pressable>

      <Text style={styles.textStyleTeko}>{screenOrientation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyleTeko: {
    fontFamily: "Teko",
    fontSize: 28,
    width: 150,
    textAlign: "center",
  },

  containerLandscape: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },

  pressableContainerPortrait: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 85,
    marginBottom: 85,
    borderWidth: 3,
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  pressableContainerLandscape: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 100,
    // marginBottom: 100,
    borderWidth: 3,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  navButton: {
    marginRight: 5,
    padding: 4,
  },
});
