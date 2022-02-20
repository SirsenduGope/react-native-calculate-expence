import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addExpence } from "../Actions/ExpencesAction";
import { MaterialIcons } from "@expo/vector-icons";

function BodyComponent({ navigation }) {
  const state = useSelector((state) => state.expencesState);
  const dispatch = useDispatch();
  const addItem = (item) => {
    dispatch(addExpence(item));
  };

  return (
    <View style={styles.content}>
      {state.items.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.item}
          onPress={() => addItem(item)}
          onLongPress={() =>
            navigation.navigate("ItemDetails", { item }, { navigation })
          }
        >
          <Image source={item.img} style={styles.item_image} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("AddNewItem")}
      >
        <MaterialIcons name="add-box" size={100} color="gray" />
        <Text style={styles.itemText}>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item_image: {
    width: 100,
    height: 100,
  },
  item: {
    flexBasis: "25%",
    padding: 1.5,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 5, height: -6 },
    shadowOpacity: 5,
    shadowRadius: 1,
    elevation: 1,
  },
  itemText: {
    textAlign: "center",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default BodyComponent;
