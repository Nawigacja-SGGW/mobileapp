import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

// Button component that appears in the modal
export const LocationButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.moreInfoButton}
      onPress={() => router.push('/location-details')}
    >
      <Text style={styles.buttonText}>Więcej informacji</Text>
    </TouchableOpacity>
  );
};

// Detailed location view
const LocationDetailsScreen = () => {
  const router = useRouter();
  
  const locationData = {
    title: "Centrum Wodne SGGW",
    buildingNo: "Budynek nr 49",
    address: "ul. Nowoursynowska 159, 02-776 Warszawa",
    email: "centrum_wodne@sggw.edu.pl",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    photos: [1, 2, 3] // Replace with actual photo URLs
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome5 name="arrow-left" color="white" size={20} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>logo</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{locationData.title}</Text>

        {/* Location Details */}
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

        {/* Description */}
        <Text style={styles.description}>{locationData.description}</Text>

        {/* Navigation Button */}
        <TouchableOpacity style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Nawiguj</Text>
        </TouchableOpacity>

        {/* Photos Section */}
        <View style={styles.photosContainer}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoText}>photos</Text>
          </View>
          
          {/* Dots indicator */}
          <View style={styles.dotsContainer}>
            {[1, 2, 3].map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot,
                  index === 0 ? styles.activeDot : null
                ]} 
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#064E3B',
  },

  backButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  detailsContainer: {
    gap: 16,
    marginBottom: 24,
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
  description: {
    color: 'white',
    lineHeight: 24,
    marginBottom: 24,
  },
  navigationButton: {
    backgroundColor: '#047857',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  navigationButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  photosContainer: {
    marginBottom: 24,
  },
  photoPlaceholder: {
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoText: {
    color: '#000000',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF40',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  moreInfoButton: {
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

export default LocationDetailsScreen;