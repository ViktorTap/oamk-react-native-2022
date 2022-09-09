import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
    msec: 0,
  });

  const resetTimer = () => {
    setTime({
      min: 0,
      sec: 0,
      msec: 0,
    });
  };
  useEffect(() => {
    let interval = null;
    if (isToggleOn) {
      interval = setInterval(() => {
        if (time.msec !== 99) {
          setTime({
            ...time,
            msec: ++time.msec,
          });
        } else if (time.sec !== 59) {
          setTime({
            ...time,
            msec: 0,
            sec: ++time.sec,
          });
        } else {
          setTime({
            msec: 0,
            sec: 0,
            min: ++time.min,
          });
        }
      }, 1);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, isToggleOn]);

  const twoNumPad = (number) => (number <= 9 ? `0${number}` : number);
  // add presseble long press for reseting stopwatch
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.watchText}>{twoNumPad(time.min)} : </Text>
        <Text style={styles.watchText}>{twoNumPad(time.sec)} : </Text>
        <Text style={styles.watchText}>{twoNumPad(time.msec)}</Text>
      </View>
      <Button
        title={isToggleOn ? "stop" : "start"}
        onPress={() => setIsToggleOn(!isToggleOn)}
      />
      <Text> </Text>
      <Button title="RESET" onPress={resetTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderEndColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    width: "50%",
    justifyContent: "center",
    padding: 8,
  },
  watchText: {
    fontSize: 24,
    padding: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#AFEEEE",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonStyle: {
    marginTop: 16,
    color: "red",
  },
});
