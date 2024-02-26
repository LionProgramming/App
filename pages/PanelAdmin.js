import { StatusBar } from 'expo-status-bar';
import {  ImageBackground,TouchableOpacity, View, TextInput, Button, StyleSheet, Alert,Image, Text} from 'react-native';
import React, { useState } from 'react'; 
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

export function PanelAdmin() {
  const image2 = { uri: 'https://image.slidesdocs.com/responsive-images/background/business-simple-gradient-blue-technology-light-blue-powerpoint-background_f6faa583ee__960_540.jpg' };
  const tableHead = ['ID', 'NOMBRE', 'EDITAR','ELIMINAR','VER'];
  const tableData = [
    ['#1033812342', 'Anamaria Gonzales Rojas', <TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>✏️</Text></TouchableOpacity>,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>☠️</Text></TouchableOpacity>,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>👁️</Text></TouchableOpacity> ],
    ['#1205441641', 'Juan Pablo Roa', <TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>✏️</Text></TouchableOpacity> ,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>☠️</Text></TouchableOpacity>,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>👁️</Text></TouchableOpacity>],
    ['#369885162', 'Jose Luis Salas', <TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>✏️</Text></TouchableOpacity>,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>☠️</Text></TouchableOpacity>,<TouchableOpacity onPress={() => handleButtonPress(1)}><Text style={styles.button}>👁️</Text></TouchableOpacity>],
  ];

  return (

    <ImageBackground source={image2} resizeMode="cover" style={styles.image2}>
    <View style={styles.container}>
    <Image style={styles.imagelogo} source={require('../assets/escudo.png')} />

    <Text style={styles.baseText}>
      LIST
      <Text style={styles.innerText}> USERS </Text>
    </Text>


    
    <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>

       
      
      
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
    fontSize: 20,
    textAlign: 'center',
  },
  innerText: {
    color: 'blue',
  },

  image: {
    height:130,
    width:130,
    alignItems: 'center',
    top: -20,
  },

  container: {
   flex: 1, 
   padding: 16, 
   paddingTop: 30, 
   top: 150,
   
  },

  head: { height: 40, 
    backgroundColor: '#f1f8ff'
   },

  text: { 

    margin: 6 
  
  },
  
   

  
  

  image2: {
    flex: 1,
    justifyContent: 'center',

  },

  imagelogo: {
    height:50,
    width:50,
    alignItems: 'center',
    top:-173,
    left:310,


  },

});