// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// layous
import { Login } from './layouts/Login';
// import { Buscar } from './teacher/Buscar';

// // profesor
import PorfilTeacher from './teacher/PorfilTeacher';
import CreateObservation from './teacher/CreateObservation';
import SearchObservation from'./teacher/SearchObservation'
// VistaEstudiante
import PorfilStudent from './student/PerfilStudent';
//  import Horario from './student/Horario';




const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Buscar" component={Buscar} />  */}
          {/* profesor  */}
          <Stack.Screen name="PorfilTeacher" component={PorfilTeacher} />
         <Stack.Screen name="CreateObservation" component={CreateObservation} /> 
         <Stack.Screen name="SearchObservation" component={SearchObservation} />  
          {/* estudiante  */}
         <Stack.Screen name="PorfilStudent" component={PorfilStudent} /> 
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
