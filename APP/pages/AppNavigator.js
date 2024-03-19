// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// layous
import { Login } from './layouts/Login';
// import { Buscar } from './teacher/Buscar';

// // profesor
import PerfilTeacher from './teacher/PerfilTeacher.jsx';
import CreateObservation from './teacher/CreateObservation';
import SearchObservation from'./teacher/SearchObservation';
import HorarioProfesor from './teacher/HorarioProf.jsx';
// VistaEstudiante
import PerfilStudent from './student/PerfilStudent.jsx';
import HorarioEstudent from './student/Horario.jsx';
import ObservationStudent from './student/ObservadorStudent.jsx';
//  import Horario from './student/Horario';




const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Buscar" component={Buscar} />  */}
          {/* profesor  */}
          <Stack.Screen name="PerfilTeacher" component={PerfilTeacher} />
         <Stack.Screen name="CreateObservation" component={CreateObservation} /> 
         <Stack.Screen name="SearchObservation" component={SearchObservation} /> 
         <Stack.Screen name="HorarioProfesor" component={HorarioProfesor} />
         
          {/* estudiante  */}
         <Stack.Screen name="PerfilStudent" component={PerfilStudent} />
         <Stack.Screen name="HorarioEstudent" component={HorarioEstudent} />
         <Stack.Screen name="Observacion" component={ObservationStudent} />

  
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
