import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const LocationModal = ({ isVisible, onClose, locationData }) => {
  if (!locationData) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome5 name="times" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{locationData.title || 'Location Details'}</Text>
          <View style={styles.detailsContainer}>
            {locationData.details?.map((detail, index) => (
              <View key={index} style={styles.detailRow}>
                <FontAwesome5 name={detail.icon || 'info-circle'} size={16} color="white" />
                <Text style={styles.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#064E3B',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 32,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 24,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    color: 'white',
    flex: 1,
  },
});

export default LocationModal;
