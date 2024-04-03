import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

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
            const response1 = await fetch(`https://observadorlion.azurewebsites.net/api/v1/grados`)
            const cursosData = await response1.json()
            setCursos(cursosData)
            console.log(documento);
            const cursosFiltro = cursosData.filter(cursoFiltre => cursoFiltre.director === documento);
            const cursoFiltrado = cursosFiltro[0].salonasignado
            console.log("filtro: ", cursoFiltrado);
            
            
            const response2 = await fetch(`https://observadorlion.azurewebsites.net/api/v1/horarios/`);
            const HorariosData = await response2.json();
            console.log("Horarios: ", HorariosData)
            const HorarioFilter = HorariosData.filter(horario => horario.nombre === cursoFiltrado)
            console.log("filtro horario: ", HorarioFilter)
            const urlCurso = HorarioFilter[0].urlhorario;
            console.log("url:", urlCurso)
            setFiltro(urlCurso)
            
            
            }
            catch (error){
                console.error('Error al realizar la solicitud GET:', error)
            }
        };
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.informacionTable}>
                <View style={styles.titleTable}>
                    <Text style={styles.fontTitle}>Curso:</Text>

                </View>

                <View> 
                  <Image src={filtro} style={[styles.ImageProf, {resizeMode: 'cover'}]}/>
                </View>
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
      marginLeft: 20,
      fontSize: 20,
      color: "#000000"
    },
    infoText: {
      marginLeft: 30,
      marginBottom: 10,
      marginTop: 10,
    },
    ImageProf: {
        width: windowWidth * 0.8, // Utilizar el 80% del ancho de la ventana
        height: undefined, // Permitir que la altura se ajuste automáticamente
        aspectRatio: 16 / 9, // Establecer una relación de aspecto de 16:9
        alignSelf: 'center', // Alinear la imagen al centro horizontalmente
    }
  });

export default HorarioProfesor
