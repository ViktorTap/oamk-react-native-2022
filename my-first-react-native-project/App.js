import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./components/Main";
import ProfileItem from "./components/ProfileItem";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ProfileItem" component={ProfileItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
