import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Estudiante
// import {HorarioEstuduante} from './pages/student/Horario';
// import {HorarioEstuduante} from './pages/student/Perfil';
// Profesor
 import BuscarObservacionT from './pages/teacher/SearchObservation';
  // import CreateObservationT from './pages/teacher/CreateObservation';
// import {HorarioT} from './pages/teacher/Horario';


export default function App() {
  return (
    <View style={styles.container}>
      <BuscarObservacionT />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
