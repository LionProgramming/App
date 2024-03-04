import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export function CreateObservation() {
  const [observationData, setObservationData] = useState({
    usuario_documento: "",
    informe: "",
  });

  const [respuesta, setRespuesta] = useState("");

  const handlePostRequest = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/observaciones/",
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
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