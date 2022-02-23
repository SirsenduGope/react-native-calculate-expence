import React, { componentDidMount } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  AppState,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetExpences, restoreStateValue } from "../Actions/ExpencesAction";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BodyComponent from "./BodyComponent";

function HomeComponent({ navigation }) {
  const state = useSelector((state) => state.expencesState);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );

  const dispatch = useDispatch();
  const restore = (value) => {
    dispatch(restoreStateValue(value));
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const resroteState = _retrieveData();
        restore(resroteState);
        console.log("aaactive");
      } else {
        console.log("inactive");
        _storeData();
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      }
    });
  }, [state]);

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("currentState", JSON.stringify(state));
    } catch (error) {
      console.log("error");
    }
  };

  _retrieveData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem("currentState"));
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("error");
    }
  };

  const reset = () => {
    dispatch(resetExpences());
    showMessage({
      message: "Reset Successful",
      type: "success",
    });
  };

  const confrimReset = () => {
    Alert.alert("Reset Expence", "Do you want to clear all your expences?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => reset(),
        style: "ok",
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View></View>
      <TouchableOpacity
        style={[styles.header, styles.shadowProp]}
        onPress={() => navigation.navigate("OrderView")}
      >
        <View style={styles.header1}>
          <Text style={styles.header_text}>Total Expences : </Text>
        </View>
        <View style={styles.header2}>
          <Text style={styles.header_text}>{state.totalExpence} Rs </Text>
        </View>
      </TouchableOpacity>

      <BodyComponent navigation={navigation} />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => confrimReset()}
      >
        <Text style={styles.reset}>Reset Expence</Text>
      </TouchableOpacity>
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

  reset: {
    textAlign: "right",
    padding: 10,
    fontSize: 16,
  },

  resetButton: {
    backgroundColor: "red",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 100,
  },
});

export default HomeComponent;
