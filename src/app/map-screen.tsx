import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon1 from '../../assets/search1.svg';
import SearchIcon2 from '../../assets/search2.svg';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapExample() {
  const camera = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMapPress = () => {
    setIsExpanded(true);
  };

  return (
    <View className="flex-1">
      {/* Navbar */}
      <View className="absolute left-0 right-0 top-0 z-20 h-20 flex-row items-center justify-between bg-[#0F4530] px-4">
        <TouchableOpacity className="p-2">
          <MenuIcon width={40} height={40} fill="#FFF" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">logo/nazwa</Text>
        <TouchableOpacity className="p-2" onPress={toggleSearchBar}>
          {isExpanded ? (
            <NavigationIcon width={40} height={40} fill="#FFF" />
          ) : (
            <SearchIcon2 width={28} height={28} fill="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        className={`absolute left-4 right-4 top-16 z-10 mt-9 rounded-full bg-white p-3 h-20 ${
          isExpanded ? 'h-32' : 'h-15'
        }`}>
        {isExpanded ? (
          <>
            <View className="mb-2 flex-row items-center ml-4">
              <LightGreenDot width={20} height={20} className="ml-4 mr-2" />
              <TextInput
                className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                placeholder="Your location"
                placeholderTextColor="#000"
              />
            </View>
            <View className="my-1 ml-16 h-px w-5/6 bg-black" />
            <View className="flex-row items-center ml-4">
              <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
              <TextInput
                className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                placeholder="Destination"
                placeholderTextColor="#000"
              />
            </View>
          </>
        ) : (
          <View className="flex-row items-center flex-1">
            <SearchIcon1 width={28} height={28} className="mr-2" />
            <TextInput
              className="ml-3 flex-1 text-lg ml-8"
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
        onPress={handleMapPress}>
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
  );
}
