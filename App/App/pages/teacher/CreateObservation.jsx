import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import DropObmenu from './DropdownMenu'

export function CreateObservation() {
  const [observationData, setObservationData] = useState({
    usuario_documento: "",
    informe: "",
  });

  const [respuesta, setRespuesta] = useState("");

  const handlePostRequest = async () => {
    try {
      const response = await fetch(
        "https://observadorlion.azurewebsites.net/api/v1/observaciones/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(observationData),
        }
      );

      const result = await response.json();
      setRespuesta(JSON.stringify(result));
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  return (
    <><DropObmenu/>
    <View style={styles.container}>
      <Text style={styles.title}>Observación</Text>

      <TextInput
        style={styles.input}
        placeholder="Id estudiante"
        value={observationData.usuario_documento}
        onChangeText={(text) =>
          setObservationData({ ...observationData, usuario_documento: text })
        }
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        value={observationData.informe}
        onChangeText={(text) =>
          setObservationData({ ...observationData, informe: text })
        }
      ></TextInput>

      <Button title="Realizar observacion" onPress={handlePostRequest}></Button>

      {respuesta !== "" && (
        <View>
          <Text>Respuesta de la API:</Text>
          <Text>{respuesta}</Text>
        </View>
      )}
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    padding:20,

  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 70,
    textAlign:'center',
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: 250,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 4,
  },
  inputdesc: {
    borderWidth: 1,
    height: 120,
    width: 250,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 4,
    alignContent: "start",
  },
});

export default CreateObservation;