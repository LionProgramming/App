import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Overlay, ListItem } from 'react-native-elements';
import axios from 'axios';

const image2 = { uri: 'https://image.slidesdocs.com/responsive-images/background/business-simple-gradient-blue-technology-light-blue-powerpoint-background_f6faa583ee__960_540.jpg' };

export function Horario() {
  const [isOverlayVisible1, setOverlayVisible1] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/grados/');
        setCursos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCursos();
  }, []); 

  const toggleOverlay1 = () => {
    setOverlayVisible1(!isOverlayVisible1);
    if (!isOverlayVisible1) {
      setSelectedCurso(null);
    }
  };

  const buscar = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/horarios/', {
        params: {
          curso: selectedCurso ? selectedCurso.urlhorario : null,
        },
      });

      setResultadosBusqueda(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  const resetearBusqueda = () => {
    setResultadosBusqueda([]);
  };

  return (
    <ImageBackground source={image2} resizeMode="cover" style={styles.image2}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Cursos"
            onPress={toggleOverlay1}
            containerStyle={styles.firstButton}
          />
          <Button
            title="Buscar"
            onPress={buscar}
            containerStyle={styles.secondButton}
          />
          <Button
            title="Restablecer Búsqueda"
            onPress={resetearBusqueda}
            containerStyle={styles.secondButton}
          />
        </View>

        <Overlay isVisible={isOverlayVisible1} onBackdropPress={toggleOverlay1}>
          <View>
            <Text style={styles.title}>Lista 1</Text>
            {cursos.map((curso, index) => (
              <ListItem
                key={index}
                bottomDivider
                onPress={() => {
                  setSelectedCurso(curso);
                  toggleOverlay1();
                }}
                containerStyle={curso === selectedCurso ? { backgroundColor: 'lightgray' } : null}
              >
                <ListItem.Content>
                  <ListItem.Title>{curso.nombre}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </Overlay>

        {resultadosBusqueda.length > 0 && (
          <View style={styles.resultContainer}>
            
              <Text style={styles.title}>Resultados de la búsqueda</Text>
              <ImageBackground
              source={{ uri: resultadosBusqueda[0].urlhorario }}
              style={{ flex: 1 }}
              resizeMode="cover"
            >
            </ImageBackground>
          </View>
        )}

        {selectedCurso && (
          <Text>Curso Seleccionado: {selectedCurso.nombre}</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100, 
    marginBottom: 100, 
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image2: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  firstButton: {
    marginRight: 5,
  },
  secondButton: {
    marginLeft: 5,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginTop: 100,
    marginBottom: 100,
     overflow: 'hidden', 
    width: '90%',      
    height: '90%',  
  },
});
