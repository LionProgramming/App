import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import DropdownMenu from'./DropdownMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilTeacher = () => {
  useEffect(() => {
    const datoSave = async () => {
      try {
        const datoStudent = await AsyncStorage.getItem('userData');
        const datoFilter = JSON.parse('{' + datoStudent.slice(1, -1) + '}');      
        fetchUserData(datoFilter.documento);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
    
    datoSave();
  }, []);

  const [userData, setUserData] = useState(null);

  const fetchUserData = async (documento) => {
    try {
      
      const userResponse = await axios.get(`https://observadorlion.azurewebsites.net/api/v1/users/${documento}`);


      setUserData(userResponse.data);
    } catch (error) {
      console.error('Error al obtener datos de usuario desde la API:', error.message || 'Error desconocido');
    }
  };

  useEffect(() => {
    
    fetchUserData();
  }, []);

  return (
    <><DropdownMenu/>
    <View style={styles.container}>
      {userData && (
        <View style={styles.userInfo}>
          
          <Image source={{ uri: userData.urlfoto }} style={styles.profileImage} />
          <Text style={styles.label}>Documento: <Text style={styles.info}>{userData.documento}</Text></Text>
          <Text style={styles.label}>Fecha de Nacimiento: <Text style={styles.info}>{userData.fechanacimiento}</Text></Text>
          <Text style={styles.label}>Nombre: <Text style={styles.info}>{`${userData.nombre1} ${userData.nombre2}`}</Text></Text>
          <Text style={styles.label}>Apellido: <Text style={styles.info}>{`${userData.apellido1} ${userData.apellido2}`}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.info}>{userData.email}</Text></Text>
          <Text style={styles.label}>Teléfono Fijo: <Text style={styles.info}>{userData.telefono_fijo}</Text></Text>
          <Text style={styles.label}>Teléfono Celular: <Text style={styles.info}>{userData.telefono_celular}</Text></Text>
          <Text style={styles.label}>Estado: <Text style={styles.info}>{userData.estado === 1 ? 'activo' : 'inactivo'}</Text></Text>
        </View>
      )}
    </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 200,
    height: 250,
    marginTop: 40,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#0077cc',
    borderRadius: 5,
    alignSelf: 'center',
  },
  userInfo: {
    width: '100%',
  },
  label: {
    color: '#004080',
    fontSize: 18,
    marginBottom: 15,
  },
  info: {
    color: '#004080',
    fontSize: 16,
    marginBottom: 15,
  },
});

export default PerfilTeacher;
