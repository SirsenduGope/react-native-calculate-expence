import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import BodyComponent from "./BodyComponent";

function HomeComponent({ navigation }) {
  const state = useSelector((state) => state.expencesState);
  // console.log("State : ", state);
  return (
    <SafeAreaView>
      <Pressable
        style={[styles.header, styles.shadowProp]}
        onPress={() => navigation.navigate("OrderView")}
      >
        <View style={styles.header1}>
          <Text style={styles.header_text}>Total Expences : </Text>
        </View>
        <View style={styles.header2}>
          <Text style={styles.header_text}>{state.totalExpence} Rs </Text>
        </View>
      </Pressable>
      <BodyComponent navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 0,
    borderRadius: 2,
    borderColor: "black",
    shadowColor: "red",
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 15,
  },

  header1: {
    backgroundColor: "#fff",
    flex: 3,
  },
  header2: {
    backgroundColor: "orange",
    flex: 1,
  },

  header_text: {
    fontSize: 20,
    padding: 15,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default HomeComponent;
