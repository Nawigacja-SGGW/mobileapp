import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import TopHeader from '~/components/TopHeader';
import useLocationStore from '~/store/useLocationStore';
import { useObjectsStore, AreaObject } from '~/store/useObjectsStore';

export default function LocationDetailsScreen() {
  const router = useRouter();
  const { objectId } = useLocalSearchParams();
  const {t} = useTranslation();

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
    description: object.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    photos: [1, 2, 3], // Replace with actual photo URLs
  };

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch={false} toggleSearchBar={() => {}} />,
        }}
      />
      <View className="flex-1 bg-[#003228]">
        {/* Header */}

        <ScrollView className="mt-28 px-4">
          {/* Title */}
          <Text className="text-white text-4xl font-bold mb-5 mt-3">{locationData.title}</Text>

          {/* Location Details */}
          <View className="gap-4 mb-12">
            <View className="flex-row items-center gap-3">
              {'number' in object && (
                <>
                  <FontAwesome5 name="building" size={20} color="white" />
                  <Text className="text-white text-xl">{locationData.buildingNo}</Text>
                </>
              )}
            </View>

            <View className="flex-row items-center gap-3">
              <FontAwesome5 name="map-marker-alt" size={20} color="white" />
              <Text className="text-white text-xl">{locationData.address}</Text>
            </View>
            {object?.website && (
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons name="web" size={20} color="white" />
                <Text className="text-white text-xl">{locationData.website}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text className="text-white text-lg leading-6 mb-6">{locationData.description}</Text>

          {/* Navigation Button */}
          <TouchableOpacity
            className="bg-white mx-auto w-[50%] py-3 rounded-3xl items-center mb-6"
            onPress={async () => {
              const location = await Location.getCurrentPositionAsync({});

              setRoute({
                locationFrom: [location.coords.longitude, location.coords.latitude],
                locationTo: object,
              });
              router.navigate('/map-screen');
            }}>
            <Text className="text-[#003228] font-semibold">{t('object.navigate')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};
