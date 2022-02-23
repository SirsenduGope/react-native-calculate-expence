import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { addNewItem } from "../Actions/ExpencesAction";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";

function AddItemComponent(props) {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const dispatch = useDispatch();
  const addItem = (navigation) => {
    dispatch(addNewItem({ image: image, name: name, price: price }));
    showMessage({
      message: "Item Addted Successfully",
      type: "success",
    });
    navigation.navigate("Home");
  };

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };

  return (
    <View>
      <View style={styles.content}>
        <View style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity
              onPress={() => addImage()}
              style={styles.uploadBtn}
            >
              <Text>{image ? "Edit" : "Upload"} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.price}>
            <Text style={styles.input}>Name : </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
            />
          </View>

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
      <TouchableOpacity onPress={() => addItem(props.navigation)}>
        <Text style={styles.save}>Add</Text>
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
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "black",
    width: 160,
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
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddItemComponent;
