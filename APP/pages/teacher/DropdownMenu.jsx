import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';

const MenuDesplegable = ({ onClose }) => {
  const opcionesMenu = [
    'Salir',
    'Perfil',
    'Realizar Observación',
    'Visualización de Observaciones',
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const handleMenuClick = (opcion) => {
    setOpcionSeleccionada(opcion);

    console.log(`Opción seleccionada: ${opcion}`);
    // Cerrar el menú
    setMenuVisible(false);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Text style={styles.menuButtonText}>Menú</Text>
      </Pressable>
      <Modal transparent animationType="slide" visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
        <Pressable
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            {opcionesMenu.map((opcion) => (
              <Pressable
                key={opcion}
                style={[
                  styles.opcionContainer,
                  opcion === opcionSeleccionada && styles.opcionSeleccionada,
                ]}
                onPress={() => handleMenuClick(opcion)}
              >
                <Text
                  style={[
                    styles.opcionTexto,
                    opcion === opcionSeleccionada && styles.opcionTextoSeleccionada,
                  ]}
                >
                  {opcion}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
     
    
  },
  menuButtonText: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: 'bold',

  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: '#e6f7ff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  opcionContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b3d9ff',
  },
  opcionTexto: {
    fontSize: 16,
    color: '#333',
  },
  opcionTextoSeleccionada: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default MenuDesplegable;
