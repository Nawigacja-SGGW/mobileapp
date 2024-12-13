import React, { MutableRefObject, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { LocationButton } from './LocationDetailsScreen';
import useLocationStore from '~/store/useLocationStore';
import { useTranslation } from 'react-i18next';
import { LocationObject } from 'expo-location';

type LocationModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  objectId: number;
  userLocation: MutableRefObject<LocationObject | undefined>;
};

const LocationModal = ({ isVisible, setIsVisible, objectId, userLocation }: LocationModalProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { locations, setRoute, setNavigationMode } = useLocationStore();
  const object = locations.find((n) => n.id === objectId);
  if (!object) return null;

  const locationData = {
    title: object?.name,
    buildingNo: object?.number ?? '',
    address: `${object?.address.city} ${object?.address.street} ${object?.address.postalCode}`,
    website: object?.website,
    coordinates: object?.coordinates,
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={() => setIsVisible(false)}>
        <Pressable
          className="rounded-t-2xl bg-green-main p-5 pb-8"
          onPress={(e) => e.stopPropagation()}>
          {/* Close button */}
          <TouchableOpacity onPress={() => setIsVisible(false)} className="mb-2 self-end p-2">
            <FontAwesome5 name="times" size={20} color="white" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="mb-4 text-lg font-bold text-white">{locationData.title}</Text>

          {/* Location details */}
          <View className="mb-6 space-y-3">
            <View className="flex-row items-center space-x-3">
              <FontAwesome5 name="building" size={16} color="white" />
              <Text
                className="my-2 flex-1 text-ellipsis px-4 text-white"
                ellipsizeMode="tail"
                numberOfLines={1}>
                {locationData.buildingNo}
              </Text>
            </View>

            <View className="flex-row items-center space-x-3">
              <FontAwesome5 name="map-marker-alt" size={16} color="white" />
              <Text
                className="my-2 flex-1 text-ellipsis px-4 text-white"
                ellipsizeMode="tail"
                numberOfLines={1}>
                {locationData.address}
              </Text>
            </View>

            {object?.website && (
              <View className="my-2 flex-row items-center space-x-3">
                <MaterialCommunityIcons name="web" size={16} color="white" />
                <Text
                  className="flex-1 text-ellipsis px-4 text-white"
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {locationData.website}
                </Text>
              </View>
            )}
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-5">
            <TouchableOpacity
              className="flex-1 items-center rounded-full bg-white p-3"
              onPress={() => {
                setIsVisible(false);
                console.log(userLocation.current);
                if (!userLocation.current) return;

                setRoute({
                  locationTo: object,
                  locationFrom: [
                    userLocation.current.coords.longitude,
                    userLocation.current.coords.latitude,
                  ] as [number, number],
                });
                setNavigationMode('routing');
              }}>
              <Text className="font-bold text-green-main">{t('object.navigate')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center rounded-full bg-white p-3"
              onPress={() => {
                navigation.navigate('LocationDetailsScreen', { objectId });
                setIsVisible(false);
              }}>
              <Text className="font-bold text-green-main">{t('object.moreInfo')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LocationModal;
