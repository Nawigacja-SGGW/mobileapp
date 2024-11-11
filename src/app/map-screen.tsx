import MapLibreGL from '@maplibre/maplibre-react-native';
import { Drawer } from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import SearchIcon1 from '../../assets/search1.svg';

import TopHeader from '~/components/TopHeader';
import useLocationStore from '../store/useLocationStore';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapExample() {
  const { t } = useTranslation();
  const camera = useRef<MapLibreGL.CameraRef | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Zustand store
  const {
    searchQuery,
    filteredLocations,
    setSearchQuery,
    filterLocations,
    clearFilteredLocations,
  } = useLocationStore();

  const expandFullSearchBar = () => {
    setIsExpanded(true);
    clearFilteredLocations();
    setSearchQuery('');      
  };

  const handleMapPress = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      expandFullSearchBar();
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      clearFilteredLocations();
    } else {
      filterLocations(text);
    }
  };

  const handleLocationSelect = (locationName: string) => {
    setSearchQuery(locationName);
    setIsExpanded(false);
    clearFilteredLocations();
  };

  // Render location
  const renderLocationItem = (item: { id: number; name: string; icon: JSX.Element }) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center bg-white p-2"
      onPress={() => handleLocationSelect(item.name)}>
      <View>{item.icon}</View>
      <Text className="ml-3 text-lg text-black">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Drawer.Screen
        options={{
          header: () => <TopHeader isExpanded={isExpanded} toggleSearchBar={expandFullSearchBar} />,
        }}
      />
      <Text>Map</Text>
      <View className="mt-20 flex-1">
        {/* Search Bar */}
        <View
          className={`absolute left-4 right-4 z-10 mt-6 rounded-[25] bg-white p-3 ${
            isExpanded ? 'h-32' : 'h-15'
          }`}>
          {isExpanded ? (
            <View className="flex-col">
              <View className="mb-2 ml-4 flex-row items-center">
                <LightGreenDot width={20} height={20} className="ml-4 mr-2" />
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder={t('map.search.startingPoint')}
                  placeholderTextColor="#000"
                />
              </View>
              <View className="my-1 ml-16 h-px w-5/6 bg-gray-300" />
              <View className="ml-4 flex-row items-center">
                <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder={t('map.search.destination')}
                  placeholderTextColor="#000"
                />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center">
              <SearchIcon1 width={28} height={28} className="mr-2" />
              <TextInput
                className="ml-3 flex-1 text-lg"
                placeholder="Search"
                placeholderTextColor="#000"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={!isExpanded}
              />
            </View>
          )}
        </View>

        {/* Wyświetlanie filtrowanych lokalizacji */}
        {!isExpanded && filteredLocations.length > 0 && (
          <View
            className="absolute left-4 right-4 z-10 max-h-60 bg-white shadow"
            style={{
              top: isExpanded ? 140 : 160,
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
            }}>
            <View className="h-px bg-gray-300" />
            {filteredLocations.map((item) => renderLocationItem(item))}
          </View>
        )}

        {/* Map View */}
        <MapLibreGL.MapView
          style={{ flex: 1 }}
          logoEnabled={false}
          styleURL="https://americanamap.org/style.json"
          onPress={handleMapPress}
          compassEnabled={false}>
          <MapLibreGL.Camera
            ref={camera}
            centerCoordinate={campusCenter}
            zoomLevel={14}
            heading={60}
            maxBounds={campusBounds}
            minZoomLevel={12.5}
          />
        </MapLibreGL.MapView>
      </View>
    </>
  );
}
