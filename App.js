import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import AddItemComponent from "./Component/AddItemComponent";
import BodyComponent from "./Component/BodyComponent";
import HomeComponent from "./Component/HomeComponent";
import ItemDetailsComponent from "./Component/ItemDetailsComponent";
import OrderViewComponent from "./Component/OrderViewComponent";
import { Store } from "./Provider";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeComponent} />
          <Stack.Screen name="OrderView" component={OrderViewComponent} />
          <Stack.Screen name="ItemDetails" component={ItemDetailsComponent} />
          <Stack.Screen name="Body" component={BodyComponent} />
          <Stack.Screen name="AddNewItem" component={AddItemComponent} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
