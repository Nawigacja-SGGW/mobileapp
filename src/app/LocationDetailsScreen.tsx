import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import TopHeader from '~/components/TopHeader';
import useLocationStore from '~/store/useLocationStore';
import { useObjectsStore, AreaObject } from '~/store/useObjectsStore';

const LocationDetailsScreen = () => {
  const router = useRouter();
  const { objectId } = useLocalSearchParams();

  const { setRoute } = useLocationStore();
  const locations = useObjectsStore().sortedBy((a, b) => a.name.localeCompare(b.name));

  const object = locations.find((n) => n.id === Number(objectId));
  if (!object) return null;
  object.coordinates = [object.longitude, object.latitude];

  const locationData = {
    title: object.name ?? 'title',
    buildingNo: 'number' in object ? 'Budynek nr ' + (object as AreaObject).number : '',
    address: `${object?.address?.city} ${object?.address?.street} ${object?.address?.postalCode}`,
    website: object?.website,
    coordinates: [object?.longitude, object?.latitude],
    description:
      object.description ??
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    photos: [1, 2, 3], // Replace with actual photo URLs
  };

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch="" toggleSearchBar={() => {}} />,
        }}
      />
      <View style={styles.container}>
        {/* Header */}

        <ScrollView className="mt-28" style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{locationData.title}</Text>

          {/* Location Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              {'number' in object && (
                <>
                  <FontAwesome5 name="building" size={16} color="white" />
                  <Text style={styles.detailText}>{locationData.buildingNo}</Text>
                </>
              )}
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5 name="map-marker-alt" size={16} color="white" />
              <Text style={styles.detailText}>{locationData.address}</Text>
            </View>
            {object?.website && (
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="web" size={16} color="white" />
                <Text style={styles.detailText}>{locationData.website}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description}>{locationData.description}</Text>

          {/* Navigation Button */}
          <TouchableOpacity
            onPress={async () => {
              const location = await Location.getCurrentPositionAsync({});

              setRoute({
                locationFrom: [location.coords.longitude, location.coords.latitude],
                locationTo: object,
              });
              router.navigate('/map-screen');
            }}
            style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}>Nawiguj</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#064E3B',
    backgroundColor: '#003228',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  logo: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 32,
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
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  navigationButton: {
    backgroundColor: 'white',
    marginLeft: '25%',
    maxWidth: '50%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  navigationButtonText: {
    color: '#003228',
    fontWeight: '600',
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
  photoButton: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8,
  },
  Left: {
    left: 10,
  },
  Right: {
    right: 10,
  },
});

export default LocationDetailsScreen;
