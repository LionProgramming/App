import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenuS from'./DropdownMenuStudent';



export function HorarioEstudent() {
  const [data, setData] = useState();
  const [cursoEst, setCursoEst] = useState();
  const [cursoBus, setCursoBus] = useState();
  const [filterData, setFilterData] = useState();
  const [HorarioF, setHorarioF] = useState();

  useEffect(() => {
    const datoSave = async () => {
      try {
        const datoStudent = await AsyncStorage.getItem('userData');
        const datoFilter = JSON.parse('{' + datoStudent.slice(1, -1) + '}');      
        fetchData(datoFilter.documento);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
    
    datoSave();
  }, []);

  const fetchData = async (documento) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${documento}`);
      const jsonData = await response.json();
      setData(jsonData);
      const cursoEst = jsonData.curso;
      setCursoEst(cursoEst);
    } catch (error) {
      console.error('Error al realizar la solicitud GET:', error);
    }
  };
  console.log(cursoEst)

  useEffect(() => {
    const fetchDataC = async () => {
      try {
        const response1 = await fetch(`http://127.0.0.1:8000/api/v1/horarios`);
        const cursosBus = await response1.json();
        setCursoBus(cursosBus);
      } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
      }
    };

    fetchDataC();
  }, []);

  console.log(cursoBus)

  useEffect(() => {
    if (cursoBus && cursoEst) {
      const filterCursos = cursoBus.filter(curso => curso.numero_curso === cursoEst);
      const urlHorario = filterCursos[0].urlhorario
      setHorarioF(urlHorario)
      setFilterData(filterCursos);
      console.log("Curso:" + urlHorario)
    }
  }, [cursoBus, cursoEst]);

  
  console.log(HorarioF)


  return (
    <View style={styles.container}>
      <DropdownMenuS/>
      <View style={styles.informacionTable}>
        <View style={styles.titleTable}>
          <Text style={styles.fontTitle}>Curso:</Text>
        </View>
        <img src={HorarioF} alt=""/>
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
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    color: "#000000"
  },
  infoText: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 10,
  }
});

export default HorarioEstudent