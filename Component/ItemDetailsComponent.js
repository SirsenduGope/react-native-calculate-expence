import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteCurrentItem, updateItem } from "../Actions/ExpencesAction";
import { showMessage } from "react-native-flash-message";

function ItemDetailsComponent(props) {
  const item = props.route.params.item;

  const [name, setName] = React.useState(item.name);
  const [price, setPrice] = React.useState(item.price);

  const dispatch = useDispatch();
  const update = (item, navigation) => {
    dispatch(updateItem(item, { name: name, price: price }));
    showMessage({
      message: "Item Saved Successfully",
      type: "success",
    });
    navigation.navigate("Home");
  };

  const deleteItem = (item, navigation) => {
    dispatch(deleteCurrentItem(item));
    showMessage({
      message: "Item Deleted Successfully",
      type: "success",
    });
    navigation.navigate("Home");
  };

  const deleteItemAlert = (item, nevigation) => {
    Alert.alert("Delete Item", "Do you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => deleteItem(item, nevigation),
        style: "ok",
      },
    ]);
  };

  return (
    <View>
      <View style={styles.content}>
        <Image
          source={item.type === "static" ? item.img : { uri: item.img }}
          style={styles.item_image}
        />
        <View>
          <TextInput style={styles.input} onChangeText={setName} value={name} />
          <View style={styles.price}>
            <Text style={styles.input}>Price : </Text>
            <TextInput
              style={styles.input}
              onChangeText={setPrice}
              keyboardType="numeric"
              value={`${price}`}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => update(item, props.navigation)}>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItemAlert(item, props.navigation)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item_image: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "#222b41",
  },
  item: {
    flexBasis: "25%",
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 20,
  },
  price: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  input: {
    fontSize: 30,
    padding: 15,
  },
  save: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#6ada43",
    padding: 10,
    margin: 10,
    borderWidth: 0,
    borderRadius: 2,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 5,
  },

  delete: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#f54242",
    padding: 10,
    margin: 10,
    borderWidth: 0,
    borderRadius: 2,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default ItemDetailsComponent;
