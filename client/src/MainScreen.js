import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const MainScreen = ({ navigation }) => {
  function onStart() {
    navigation.navigate("Chat");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title1}>가고 싶은 곳,</Text>
        <Text style={styles.title2}>오데고!?</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleWrapper: {
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: "100%",
    height: "45%",
    alignItems: "center",
    paddingTop: 90,
  },
  title1: {
    fontSize: 40,
  },
  title2: {
    fontSize: 65,
  },
  button: {
    width: "40%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 25,
  },
});