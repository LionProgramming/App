import { StatusBar } from 'expo-status-bar';
import { ScrollView, SafeAreaView, ImageBackground, View, TextInput, Button, StyleSheet, Alert, Image, Text} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import axios from 'axios';

export function Register() {
  const [nombre1, setnombre1] = useState('');
  const [nombre2, setnombre2] = useState('');
  const [apellido1, setapellido1] = useState('');
  const [apellido2, setapellido2] = useState('');
  const [documento, setdocumento] = useState('');
  const [telefono_celular, settelefono_celular] = useState('');
  const [email, setemail] = useState('');
  const [contrasenia, setcontrasenia] = useState('');
  const [confirmarContrasenia, setconfirmarContrasenia] = useState('');
  const [error, setError] = useState('');
  const [telefono_fijo, settelefono_fijo] = useState('');
  const [selected, setSelected] = React.useState("");
  
  const image2 = { uri: 'https://image.slidesdocs.com/responsive-images/background/business-simple-gradient-blue-technology-light-blue-powerpoint-background_f6faa583ee__960_540.jpg' };

  const rol_idrol = [
    { key: '1', value: 'Estudiante' },
    { key: '2', value: 'Profesor' },
    { key: '3', value: 'Coordinador (Admin)' },
  ];

  const tipo_idtipodocumento = [
    { key: '1', value: 'Tarjeta de identidad' },
    { key: '2', value: 'Cédula de ciudadanía' },
    { key: '3', value: 'PEP' },
    { key: '4', value: 'Pasaporte' },
    { key: '5', value: 'Cedula de extranjeria' },
  ]

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', {
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        tipo_idtipodocumento,
        documento,
        telefono_fijo,
        telefono_celular,
        email,
        contrasenia,
        confirmarContrasenia,
        rol_idrol,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        Alert.alert('Éxito', 'Registro exitoso');
      } else {
        Alert.alert('Error', 'Error al registrar. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Alert.alert('Error', 'Error al registrar. Inténtalo de nuevo.');
    }
  };

  // VALIDACION DE FORMULARIO//

  const handleDateValidation = () => {
    if (isValid(parseISO(inputDate))) {
      Alert.alert('Fecha válida', 'La fecha ingresada es válida.');
    } else {
      Alert.alert('Fecha inválida', 'La fecha ingresada no es válida. Por favor, ingresa una fecha en formato válido.');
    }
  };

  const handleValidation = () => {
    // Lógica de validación de contraseñas
    if (contrasenia.length < 8) {
      Alert.alert('La contraseña debe tener al menos 8 caracteres.');
    } else if (contrasenia !== confirmarContrasenia) {
      Alert.alert('Las contraseñas no coinciden.');
    } else {
      setError(''); // Si no hay errores, se borra el mensaje de error
      // Aquí puedes realizar cualquier acción adicional, como enviar la contraseña al servidor, etc.
    }
  };

  const handleTelefono = () => {
    // Validar el número de teléfono con una expresión regular
    const phoneRegex = /^[0-9]{7}$/; // Esta expresión regular asume un número de teléfono de 10 dígitos

    if (phoneRegex.test(telefono_fijo)) {
      // Número de teléfono válido, puedes proceder con la lógica de registro

    } else {
      // Número de teléfono no válido, muestra un mensaje de error
      Alert.alert('Número de teléfono no válido. Intenta de nuevo.');
    }
  };



  const validanombre1 = () => {
    // Verifica si el nombre tiene al menos 3 caracteres
    if (nombre1.length < 3) {
      Alert.alert('Error', 'El Nombre debe tener al menos 3 caracteres');
      return;
    }

    // Verifica si el nombre contiene solo letras (puedes ajustar esto según tus necesidades)
    if (!/^[a-zA-Z]+$/.test(nombre1)) {
      Alert.alert('Error', 'El Nombre solo puede contener letras');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí

  };

  const validanombre2 = () => {
    // Verifica si el nombre tiene al menos 3 caracteres
    if (nombre2.length < 3) {
      Alert.alert('Error', 'El Nombre debe tener al menos 3 caracteres');
      return;
    }

    // Verifica si el nombre contiene solo letras (puedes ajustar esto según tus necesidades)
    if (!/^[a-zA-Z]+$/.test(nombre2)) {
      Alert.alert('Error', 'El Nombre solo puede contener letras');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí

  };

  const validaapellido1 = () => {
    // Verifica si el nombre tiene al menos 3 caracteres
    if (apellido1.length < 3) {
      Alert.alert('Error', 'El Nombre debe tener al menos 3 caracteres');
      return;
    }

    // Verifica si el nombre contiene solo letras (puedes ajustar esto según tus necesidades)
    if (!/^[a-zA-Z]+$/.test(apellido1)) {
      Alert.alert('Error', 'El Nombre solo puede contener letras');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí


  };

  const validaapellido2 = () => {
    // Verifica si el nombre tiene al menos 3 caracteres
    if (apellido2.length < 3) {
      Alert.alert('Error', 'El Nombre debe tener al menos 3 caracteres');
      return;
    }

    // Verifica si el nombre contiene solo letras (puedes ajustar esto según tus necesidades)
    if (!/^[a-zA-Z]+$/.test(apellido2)) {
      Alert.alert('Error', 'El Nombre solo puede contener letras');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí

  };


  const validardocumento = () => {
    const longituddocumento = documento.length;

    if (longituddocumento >= 6 && longituddocumento <= 12 && !isNaN(documento)) {
      // Documento válido, aquí puedes realizar acciones adicionales si es necesario

    } else {
      // Documento no válido, muestra un mensaje de error
      Alert.alert('Error', 'El documento debe tener entre 6 y 12 dígitos y ser numérico.');
    }
  };



  const validartelefono_celular = () => {
    // Expresión regular para validar el número de celular
    const regex = /^[0-9]{10}$/;

    if (!regex.test(telefono_celular)) {
      Alert.alert('Error', 'Ingrese un número de celular válido.');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí

  };

  const validaremail = () => {
    // Expresión regular para validar un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      Alert.alert('Error', 'Ingrese un correo electrónico válido.');
      return;
    }

    // La validación ha pasado, puedes realizar acciones adicionales aquí
    Alert.alert('Éxito', 'Correo electrónico válido');
  };
  return (

    <SafeAreaView >
      <ScrollView >
        <ImageBackground source={image2} resizeMode="cover" style={styles.image2}>

          <View style={styles.container}>
          <Image style={styles.imagelogo} source={require('../assets/escudo.png')} />



            <View style={styles.loglog}>


              <Text style={styles.textoo}>
                <Text style={styles.baseText}>
                  REGI
                  <Text style={styles.innerText}> STER <Image style={styles.image} source={require('../assets/agguser.png')} /> </Text>
                </Text>
              </Text>
            </View>


            <TextInput
              style={styles.input}
              placeholder="Primer Nombre"
              value={nombre1}
              onChangeText={text => setnombre1(text)}
              onBlur={validanombre1}
              placeholderTextColor={'black'}
            />

            <TextInput
              style={styles.input}
              placeholder="Segundo Nombre"
              value={nombre2}
              onChangeText={text => setnombre2(text)}
              placeholderTextColor={'black'}
              onBlur={validanombre2}
            />

            <TextInput
              style={styles.input}
              placeholder="Primer Apellido"
              value={apellido1}
              onChangeText={text => setapellido1(text)}
              placeholderTextColor={'black'}
              onBlur={validaapellido1}
            />


            <TextInput
              style={styles.input2}
              placeholder="Segundo Apellido"
              value={apellido2}
              onChangeText={text => setapellido2(text)}
              placeholderTextColor={'black'}
              onBlur={validaapellido2}

            />

            {rol_idrol && Array.isArray(rol_idrol) && (
              <SelectList
                setSelected={value => {
                  console.log("Selected value:", value);
                  setSelected(value);
                }}
                options={rol_idrol}  
                save="value"
                placeholder='Seleccione su Rol'
                boxStyles={{
                  borderColor: 'white', borderWidth: 2, height: 50, width: 344, textAlign: 'center', justifyContent: 'center',
                  alignItems: 'center', margin: 20
                }}
                inputStyles={{ fontSize: 14, color: 'black' }}
                dropdownStyles={{ alignItems: 'center' }}
                maxHeight={130}
              />
            )}

            {console.log("Selected value:", selected)}
            <SelectList
              setSelected={setSelected}
              options={tipo_idtipodocumento} 
              save="value"
              placeholder='Seleccione Tipo de identidad'
              boxStyles={{
                borderColor: 'white',
                borderWidth: 2,
                height: 50,
                width: 344,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
              inputStyles={{ fontSize: 14, color: 'black' }}
              dropdownStyles={{ alignItems: 'center' }}
              maxHeight={130}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de documento"
              keyboardType="numeric"
              value={documento}
              onChangeText={text => setdocumento(text)}
              placeholderTextColor={'black'}
              onBlur={validardocumento}
            />
            <TextInput
              style={styles.input}
              placeholder="Número Celular"
              keyboardType="phone-pad"
              value={telefono_celular}
              onChangeText={text => settelefono_celular(text)}
              placeholderTextColor={'black'}
              onBlur={validartelefono_celular}
            />

            <TextInput
              style={styles.input}
              placeholder="Número Telefono"
              keyboardType="phone-pad"
              value={telefono_fijo}
              onChangeText={text => settelefono_fijo(text)}
              placeholderTextColor={'black'}
              onBlur={handleTelefono}
            />

            <TextInput
              style={styles.input2}
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              value={email}
              onChangeText={text =>setemail(text)}
              placeholderTextColor={'black'}
              onBlur={validaremail}
            />


            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={contrasenia}
              onChangeText={text => setcontrasenia(text)}
              placeholderTextColor={'black'}
              onBlur={handleValidation}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Verificar Contraseña"
              value={confirmarContrasenia}
              onChangeText={text => setconfirmarContrasenia(text)}
              placeholderTextColor={'black'}
              onBlur={handleValidation}
              secureTextEntry

            />
            <Button title="Registrar" onPress={handleRegister} />

          </View>

        </ImageBackground>
      </ScrollView>
    </SafeAreaView>

        
  );
}

const styles = StyleSheet.create({
  textoo: {
    padding: 5,
    fontSize: 25,

  },
  loglog: {
    flexDirection: 'row',
    height: 120,


  },

  image: {

    height: 60,
    width: 60,
    alignItems: 'center',



  },

  baseText: {
    fontWeight: 'bold',
    letterSpacing: 10,

  },
  innerText: {
    color: 'blue',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,

  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,

  },

  input2: {
    height: 50,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
  },

  styleselect: {
    flex: 1,
    margin: 1,


  },

  image2: {
    flex: 1,
    justifyContent: 'center',

  },

  imagelogo: {
    height:50,
    width:50,
    alignItems: 'center',
    left: 160,
    top:-10
  },
});