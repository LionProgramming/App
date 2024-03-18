import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IdProf = 68120246

export function HorarioProfesor () {
    const [cursos, setCursos] = useState();
    const [filtro, setFiltro] = useState();
    useEffect(() => {
      const datoSave = async () => {
        try {
          const datoStudent = await AsyncStorage.getItem('userData');
          const datoFilter = JSON.parse('{' + datoStudent.slice(1, -1) + '}');  
          console.log(datoFilter.documento); 
          fetchCursos(datoFilter.documento);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }; 
      datoSave();
        
        const fetchCursos = async (documento) => {
            try{
            const response1 = await fetch(`http://127.0.0.1:8000/api/v1/grados`)
            const cursosData = await response1.json()
            setCursos(cursosData)
            console.log(documento);
            const cursosFiltro = cursosData.filter(cursoFiltro => cursoFiltro.director === documento);
            const cursoFiltrado = cursosFiltro[0].salonasignado
            
            
            const response2 = await fetch(`http://127.0.0.1:8000/api/v1/horarios/${cursoFiltrado}`);
            const cursoData = await response2.json();
            const urlCurso = cursoData.urlhorario;
            setFiltro(urlCurso)
            
            
            }
            catch (error){
                console.error('Error al realizar la solicitud GET:', error)
            }
        };
        fetchCursos();
    }, []);


    console.log(cursos)
    console.log(filtro)

    return(
        <View style={styles.container}>
            <View style={styles.informacionTable}>
                <View style={styles.titleTable}>
                    <Text style={styles.fontTitle}>Curso:</Text>

                </View>
                <img src={filtro} alt=""/>
            </View>
        </View>
    )
};

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

export default HorarioProfesor
