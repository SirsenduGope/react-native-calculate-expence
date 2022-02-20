import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addOrder, subtractOrder } from "../Actions/ExpencesAction";

function OrderViewComponent(props) {
  const state = useSelector((state) => state.expencesState);
  const dispatch = useDispatch();
  const add = (item) => {
    dispatch(addOrder(item));
  };
  const subtract = (item) => {
    dispatch(subtractOrder(item));
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text style={styles.header_text}>Total Expences : </Text>
        </View>
        <View style={styles.header2}>
          <Text style={styles.header_text}>{state.totalExpence} Rs </Text>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={state.orders}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.item}>{item.name}</Text>
              <View style={styles.button_group}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => add(item)}
                >
                  <Text style={styles.buttonTest}>+</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.qty}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => subtract(item)}
                >
                  <Text style={styles.buttonTest}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>=</Text>
                <Text style={styles.quantity}>{item.total}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    position: "relative",
    padding: 12,
    backgroundColor: "white",
    marginBottom: 3,
    fontSize: 20,
  },
  buttonTest: {
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#43cfda",
    padding: 12,
    width: "20%",
  },
  button_group: {
    position: "absolute",
    alignSelf: "flex-end",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "50%",
  },
  quantity: {
    fontSize: 20,
    padding: 10,
  },

  header: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 0,
    borderRadius: 2,
    borderColor: "black",
    shadowColor: "black",
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
});

export default OrderViewComponent;
