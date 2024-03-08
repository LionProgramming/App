import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import MenuDesplegable from './DropdownMenu';

export const BuscarObservacion = ({ cantidadCuadros = 5 }) => {
  const [busqueda, setBusqueda] = useState('');
  const [observaciones, setObservaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/observaciones/');
        const data = await response.json();
        setObservaciones(data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, []);

  const cuadrosFiltrados = filtrarCuadros(observaciones);

  function filtrarCuadros(cuadros) {
    return cuadros.filter((cuadro) =>
      cuadro.usuario_documento.toString().includes(busqueda)
    );
  }

  return (
    <View style={styles.container1}>
      <View style={styles.busquedaContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
        />
        <MenuDesplegable />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cuadrosFiltrados.map((cuadro) => (
          <View key={cuadro.idobservacion} style={styles.cuadro}>
            <View style={styles.infoContainer}>

              <Text style={styles.observacion}>
                Observacion {cuadro.idobservacion}
              </Text>
 
              <Text style={styles.informe}>
                <Text style={styles.numeroID}>
                  Informe: {cuadro.numeroID}
                </Text>
                {cuadro.informe}
              </Text>

              <Text style={styles.usuarioDocumento}>
                <Text style={styles.numeroID}>
                  Documento:
                  {cuadro.numeroID}</Text>
                {cuadro.usuario_documento}
              </Text>

            </View>
          </View>
        ))}
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
    alignItems: 'center',
    marginTop: 70,
    padding: 10,
    width:350,
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

export default BuscarObservacion;
