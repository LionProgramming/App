import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const [documento, setDocumento] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigation = useNavigation();

  const image2 = { uri: 'https://image.slidesdocs.com/responsive-images/background/business-simple-gradient-blue-technology-light-blue-powerpoint-background_f6faa583ee__960_540.jpg' };

  const validarDocumento = () => {
    const longitudDocumento = documento.length;

    if (longitudDocumento >= 6 && longitudDocumento <= 12 && !isNaN(documento)) {
    } else {
     
      Alert.alert('Error', 'El documento debe tener entre 6 y 12 dígitos y ser numérico.');
    }
  };

  const validarContrasenia = () => {
  
    const regex = /\d.*\d/;
    const contieneDosNumeros = regex.test(contrasenia);

    if (contieneDosNumeros) {
     
    } else {
      
      Alert.alert('Error', 'La contraseña debe contener al menos 2 números.');
    }
  };

  const handleLogin = async () => {
    try {

      const apiUrl = 'http://127.0.0.1:8000/login/';

      const response = await axios.post(apiUrl, {
        documento: documento,
        contrasenia: contrasenia,
      });

 
      console.log('Respuesta de la API:', response.data);

  
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));

      if (response.data.response===1){
        navigation.navigate('PorfilTeacher');
      }

      
      Alert.alert('Éxito', 'Inicio de sesión exitoso');

    } catch (error) {
      
      console.error('Error al iniciar sesión:', error);

 
      Alert.alert('Error', 'Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <ImageBackground source={image2} resizeMode="cover" style={styles.image2}>
      <View style={styles.container}>
       {/*  <Image style={styles.imagelogo} source={require('../assets/escudo.png')} /> */}
        <Text style={styles.baseText}>
          LO
          <Text style={styles.innerText}> GIN</Text>
        </Text>
       {/*  <Image style={styles.image} source={require('../assets/logo.png')} /> */}
        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documento}
          onChangeText={Text => setDocumento(Text)}
          keyboardType='numeric'
          onBlur={validarDocumento}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasenia}
          onChangeText={text => setContrasenia(text)}
          onBlur={validarContrasenia}
          placeholderTextColor={'black'}
        />
        <View>
          <Button title="Inicio de Sesión" onPress={handleLogin} style={styles.botoncito} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    top: -40,
    letterSpacing: 10,
    fontSize: 30,
  },
  innerText: {
    color: 'blue',
  },
  botoncito: {
    flex: 1,
    marginHorizontal: 20,
  },
  image: {
    height: 130,
    width: 130,
    alignItems: 'center',
    top: -20,
  },
  container: {
    marginHorizontal: 50,
    marginVertical: 50,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    color: 'gray',
    textAlign: 'center',
  },
  image2: {
    flex: 1,
    justifyContent: 'center',
  },
  imagelogo: {
    height: 50,
    width: 50,
    alignItems: 'center',
    top: -170,
    left: 160,
  },
});
