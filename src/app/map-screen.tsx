import MapLibreGL from '@maplibre/maplibre-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon1 from '../../assets/search1.svg';
import SearchIcon2 from '../../assets/search2.svg';

import TopBar from '~/app/TopPanel';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapExample() {
  const camera = useRef(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSearchBar = () => {
    console.log('toggle');
    setIsExpanded((n) => !n);
  };

  const handleMapPress = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <Drawer.Screen
        options={{
          header: () => <TopBar isExpanded={isExpanded} toggleSearchBar={toggleSearchBar} />,
        }}
      />
      <Text>Map</Text>
      <View className="mt-20 flex-1">
        {/* Navbar */}

        {/* Search Bar */}
        <View
          className={`absolute left-4 right-4 z-10 mt-6 rounded-[25] bg-white p-3 ${
            isExpanded ? 'h-32' : 'h-15'
          }`}>
          {isExpanded ? (
            <>
              <View className="mb-2 ml-4 flex-row items-center">
                <LightGreenDot width={20} height={20} className="ml-4 mr-2" />
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder="Your location"
                  placeholderTextColor="#000"
                />
              </View>
              <View className="my-1 ml-16 h-px w-5/6 bg-black" />
              <View className="ml-4 flex-row items-center">
                <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder="Destination"
                  placeholderTextColor="#000"
                />
              </View>
            </>
          ) : (
            <View className="flex-1 flex-row items-center">
              <SearchIcon1 width={28} height={28} className="mr-2" />
              <TextInput
                className="ml-3 flex-1 text-lg"
                placeholder="Search"
                placeholderTextColor="#000"
              />
            </View>
          )}
        </View>

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
