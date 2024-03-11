// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './layouts/Login';
import { Buscar } from './teacher/Buscar';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Buscar" component={Buscar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
