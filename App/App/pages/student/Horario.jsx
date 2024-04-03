import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenuS from'./DropdownMenuStudent';

const windowWidth = Dimensions.get('window').width;

export function HorarioEstudent() {
  const[student, setStudent] = useState([])
  const[horario, setHorario] = useState([])

  useEffect(() => {
    

    const datoSave = async () => {
      try {
        const datoStudent = await AsyncStorage.getItem('userData');
        const datoFilter = JSON.parse('{' + datoStudent.slice(1, -1) + '}');
        console.log(datoFilter);
        console.log(datoFilter.documento);
        fetchData(datoFilter.documento);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    const fetchData = async (documento) => {
      try {
        const response = await fetch(`https://observadorlion.azurewebsites.net/api/v1/users/${documento}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setStudent("documento: ", jsonData);
        const cursoEstudent = jsonData.curso;
        console.log("curso: ", cursoEstudent)
        fetchDataC(cursoEstudent)
  
      } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
      }
    };

    const fetchDataC = async (curso) => {
      try {
        console.log(curso)
        const response1 = await fetch(`https://observadorlion.azurewebsites.net/api/v1/horarios`);
        const cursosBus = await response1.json();
        console.log(cursosBus)
        const filterCursos = cursosBus.filter(a => a.numero_curso === curso);
        console.log(filterCursos);
        const urlHorario = filterCursos[0].urlhorario
        console.log("1: ",urlHorario)
        setHorario(urlHorario);
      } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
      }
    };
    
    datoSave();
  }, []);

  console.log("Horario :", horario)

  return (
    <View style={styles.container}>
      <DropdownMenuS/>
      <View style={styles.informacionTable}>
        <View style={styles.titleTable}>
          <Text style={styles.fontTitle}>Curso:</Text>
        </View>
        <View>
          {horario.length > 0 ? (
            <Image source={{ uri: horario }} style={styles.ImageEst} />
          ) : (
            <Text>Cargando horario...</Text>
          )}
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informacionTable: {
    margin: 'auto',
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderRadius: 5,
    padding: 20,
    borderWidth: 3,
    borderColor: "#DADADA",

  },
  titleTable: {
    borderBottomWidth: 2,
    borderBottomColor: "#0077cc",
    paddingBottom: 5,
    marginBottom: 10,
  },
  fontTitle: {
    marginLeft: 20,
    fontSize: 14,
    color: "#000000"
  },
  infoText: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  ImageEst: {
    width: windowWidth * 0.8, // Utilizar el 80% del ancho de la ventana
    height: undefined, // Permitir que la altura se ajuste automáticamente
    aspectRatio: 16 / 9, // Establecer una relación de aspecto de 16:9
    alignSelf: 'center', // Alinear la imagen al centro horizontalmente
}
});

export default HorarioEstudent