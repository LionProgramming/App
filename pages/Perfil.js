import { StatusBar } from 'expo-status-bar';
import {   ImageBackground, View, TextInput, Button, StyleSheet, Alert,Image, Text} from 'react-native';
import React, { useState } from 'react'; 

export function Perfil() {
  const [userData, setUserData] = useState(null);

 

  const image2 = { uri: 'https://image.slidesdocs.com/responsive-images/background/business-simple-gradient-blue-technology-light-blue-powerpoint-background_f6faa583ee__960_540.jpg' };

  return (

    <ImageBackground source={image2} resizeMode="cover" style={styles.image2}>
    <View style={styles.container}>
    <Image style={styles.imagelogo} source={require('../assets/escudo.png')} />

    <Text style={styles.baseText}>
      ¡BIENV
      
      <Text style={styles.innerText}> ENIDO!</Text>
    </Text>
    <Text style={styles.textuser}> HARLON FELIPE PEREZ PEÑARETE </Text>
    
    <Image style={styles.image} source={require('../assets/harlon.png')} />
     
    
    <Text style={styles.textuserdata2}>
      Gmail:
      
      <Text style={styles.textuserdata}> harlon.felipe@outlook.com </Text>
    </Text>   
    <Text style={styles.textuserdata2}>
      Contacto:
      
      <Text style={styles.textuserdata}> 3214271274</Text>
    </Text>   
    <Text style={styles.textuserdata2}>
      Rol:
      
      <Text style={styles.textuserdata}> Admin!</Text>
    </Text>   
    <StatusBar style="auto" />
    
    </View>
    
    </ImageBackground>

        
  );
}

const styles = StyleSheet.create({

  container: {
   marginHorizontal:50,
   marginVertical:50,
   alignItems: 'center',
   top: -150,
   

  },
  baseText: {
    fontWeight: 'bold',
    top:5,
    letterSpacing: 5,
    fontSize: 30,
  },
  innerText: {
    color: 'blue',
  },

  image: {
    height:200,
    width:150,
    alignItems: 'center',
    top: 50,  
    borderColor: '#1A3BA9', 
    borderWidth: 8,  
    borderRadius: 10,


  },
  
  image2: {
    flex: 1,
    justifyContent: 'center',


  },

  imagelogo: {
    height:50,
    width:50,
    alignItems: 'center',
    top:-10,
    left:160,


  },

  textuser: {
  
  color: 'blue',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',

  },

  textuserdata:{
    color: 'black',
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'center',
  top: 90,

  },

  textuserdata2:{
    color: 'blue',
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'center',
  top: 90,

  },
});