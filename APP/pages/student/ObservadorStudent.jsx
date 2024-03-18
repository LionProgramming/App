import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import DropdownMenuS from'./DropdownMenuStudent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ObservationStudent = () => {
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datoStudent = await AsyncStorage.getItem('userData');
        const datoFilter = JSON.parse('{' + datoStudent.slice(1, -1) + '}');      
        const response = await fetch('http://127.0.0.1:8000/api/v1/observaciones/');
        const data = await response.json();
        console.log("Data from API:", data);
        const dataFilter = data.filter(filtro => filtro.usuarioDocumento === datoFilter.documento);
        console.log("Filtered Data:", dataFilter);
        setObservaciones(dataFilter);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos del usuario o realizar la solicitud:', error);
      }
    };
    
    fetchData();
  }, []);

  console.log("Observaciones:", observaciones);

  return (
    <View style={styles.container1}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : observaciones.length === 0 ? (
          <Text style={styles.noObservationText}>No hay observaciones disponibles</Text>
        ) : (
          observaciones.map(observacion => (
            <View key={observacion.idobservacion} style={styles.cuadro}>
              <View style={styles.infoContainer}>
                <Text style={styles.observacion}>
                  Observacion {observacion.idobservacion}
                </Text>
                <Text style={styles.informe}>
                  Informe: {observacion.numeroID} {observacion.informe}
                </Text>
                <Text style={styles.usuarioDocumento}>
                  Documento: {observacion.usuario_documento}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  busquedaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',  
    marginTop: 0,
    padding: 10,
    width:405,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#0077cc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  cuadro: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 2,
    borderColor: '#0077cc',
    borderRadius: 5,
    backgroundColor: '#e6f7ff',
    width: 350,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
  },
  observacion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#004080',
  },
  numeroID: {
    fontSize: 14,
    color: '#0066cc',
  },
  informe: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  usuarioDocumento: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default ObservationStudent;