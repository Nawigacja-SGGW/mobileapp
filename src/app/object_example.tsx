import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const LocationModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const locationData = {
    title: "Centrum Wodne SGGW",
    buildingNo: "Budynek nr 49",
    address: "ul. Nowoursynowska 159, 02-776 Warszawa",
    email: "centrum_wodne@sggw.edu.pl"
  };

  // Launch button component
  const LaunchButton = () => (
    <TouchableOpacity
      onPress={() => setIsVisible(true)}
      style={styles.launchButton}
    >
      <FontAwesome5 name="map-marker-alt" size={16} color="white" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Show Location Details</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <LaunchButton />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            {/* Close button */}
            <TouchableOpacity 
              onPress={() => setIsVisible(false)}
              style={styles.closeButton}
            >
              <FontAwesome5 name="times" size={20} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>
              {locationData.title}
            </Text>

            {/* Location details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <FontAwesome5 name="building" size={16} color="white" />
                <Text style={styles.detailText}>{locationData.buildingNo}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <FontAwesome5 name="map-marker-alt" size={16} color="white" />
                <Text style={styles.detailText}>{locationData.address}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <FontAwesome5 name="envelope" size={16} color="white" />
                <Text style={styles.detailText}>{locationData.email}</Text>
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // Add navigation logic here
                  setIsVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Nawiguj</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // Add more info logic here
                  setIsVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Więcej informacji</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  launchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#047857',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#047857',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default LocationModal;