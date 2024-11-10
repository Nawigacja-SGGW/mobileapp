import MapLibreGL from '@maplibre/maplibre-react-native';
import { Drawer } from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import SearchIcon1 from '../../assets/search1.svg';

import TopHeader from '~/components/TopHeader';
import BookIcon from '../../assets/book1.svg';
import BuildingIcon from '../../assets/building3.svg';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

// Locations
const locations = [
  { id: 1, name: 'Basen', icon: <BuildingIcon width={24} height={24} /> },
  { id: 2, name: 'Biblioteka Główna', icon: <BookIcon width={24} height={24} /> },
  {
    id: 3,
    name: 'Biblioteka przy Instytucie Inżynierii',
    icon: <BookIcon width={24} height={24} />,
  },
  {
    id: 4,
    name: 'Biblioteka przy Instytucie Medycyny',
    icon: <BookIcon width={24} height={24} />,
  },
  {
    id: 5,
    name: 'Biblioteka przy Instytucie Nauk o Zdrowiu',
    icon: <BookIcon width={24} height={24} />,
  },
];

// Type for each location
interface Location {
  id: number;
  name: string;
  icon: JSX.Element;
}

export default function MapExample() {
  const { t } = useTranslation();
  const camera = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const expandFullSearchBar = () => {
    setIsExpanded(true);
    setFilteredLocations([]);
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
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter((location) =>
        location.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  const handleLocationSelect = (locationName: string) => {
    setSearchQuery(locationName);
    setIsExpanded(false);
    setFilteredLocations([]);
  };

  // Render each location item
  const renderLocationItem = (item: Location) => (
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
              {/* Expanded search */}
              <View className="mb-2 ml-4 flex-row items-center">
                <View>
                  <LightGreenDot width={20} height={20} className="ml-4 mr-2" />
                </View>
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder={t('map.search.startingPoint')}
                  placeholderTextColor="#000"
                />
              </View>
              <View className="my-1 ml-16 h-px w-5/6 bg-gray-300" />
              <View className="ml-4 flex-row items-center">
                <View>
                  <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
                </View>
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

        {/* Display filtered locations */}
        {!isExpanded && filteredLocations.length > 0 && (
          <View
            className="absolute left-4 right-4 z-10 max-h-60 bg-white shadow"
            style={{
              top: isExpanded ? 140 : 160, // Example pixel values
              borderBottomLeftRadius: 100, // Rounded bottom-left corner
              borderBottomRightRadius: 100, // Rounded bottom-right corner
            }}>
            {/* Separator */}
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
