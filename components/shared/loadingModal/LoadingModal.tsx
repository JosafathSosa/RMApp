import React from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface LoadingModalProps {
  isLoading: boolean;
  message?: string; // Mensaje opcional
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isLoading,
  message = "Cargando...",
}) => {
  return (
    <Portal>
      <Modal
        visible={isLoading}
        dismissable={false}
        contentContainerStyle={styles.modalContainer}
      >
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{message}</Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
  },
});
