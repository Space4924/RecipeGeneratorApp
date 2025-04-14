// Loader.tsx
import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ valid }: { valid: boolean }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={valid}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Loader;
