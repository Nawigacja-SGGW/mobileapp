import MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import MapPin from '../../assets/map-pin.png';
import SearchIcon1 from '../../assets/search1.svg';
<<<<<<< HEAD

import TopHeader from '~/components/TopHeader';
import { OSM_RASTER_STYLE } from '~/core/OSRM-tiles';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import type { MapLocation } from '~/store/useLocationStore';
import useLocationStore from '~/store/useLocationStore';
=======
import SearchIcon2 from '../../assets/search2.svg'; // Icon in top bar
import BookIcon from '../../assets/book1.svg';
import BuildingIcon from '../../assets/building3.svg';
>>>>>>> a11acc4 (add search location feature and 2 icons next to location in filtered search list)

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

<<<<<<< HEAD
export default function MapScreen() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [locationFrom, setlocationFrom] = useState<undefined | [number, number] | MapLocation>(
    undefined
  );
  const [locationTo, setlocationTo] = useState<undefined | [number, number] | MapLocation>(
    undefined
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [points, setPoints] = useState<[number, number][] | null>(null);
  const userLocation = useRef<Location.LocationObject>();

  const waypoints = useMemo(() => [locationFrom, locationTo], [locationFrom, locationTo]);
  const { route } = useRouteQuery(waypoints ?? [], 'foot');
  // Zustand store
  const { locations, setSearchQuery, filterLocations, clearFilteredLocations } = useLocationStore();

  const camera = useRef<MapLibreGL.CameraRef | null>(null);
  const map = useRef(null);
  const lastRoutePoint = route?.at(-1);

  const expandFullSearchBar = () => {
    setIsExpanded(true);
    clearFilteredLocations();
    setSearchQuery('');
  };

  const toggleSearchBar = () => {
    setIsExpanded((n) => !n);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 100,
        },
        (location) => {
          userLocation.current = location;
          console.log(location);
        }
      );

      const location = await Location.getCurrentPositionAsync({});
      userLocation.current = location;
      console.log(userLocation.current);
    })();
  }, []);

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

  const handleMarkerPress = (id: number, location: [number, number]) => {
    const locationObject = locations.find((l) => l.id === id);
    setIsExpanded(true);
    console.log(locationObject);

    if (userLocation.current !== undefined) {
      setlocationFrom(
        (n) => n ?? [userLocation.current.coords.longitude, userLocation.current.coords.latitude]
      );
      setlocationTo(location);
=======
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
>>>>>>> a11acc4 (add search location feature and 2 icons next to location in filtered search list)
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
<<<<<<< HEAD
          header: () => <TopHeader isExpanded={isExpanded} toggleSearchBar={toggleSearchBar} />,
        }}
      />
      <View className="flex-1">
        <SearchBar
          handleSearch={handleSearch}
          isExpanded={isExpanded}
          handleLocationSelect={handleLocationSelect}
        />

=======
          header: () => (
            <View className="absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-[#0F4530] px-4 pt-4">
              <TouchableOpacity className="p-2">
                <MenuIcon width={40} height={40} fill="#FFF" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-white">logo/nazwa</Text>
              <TouchableOpacity className="p-2">
                {isExpanded ? (
                  <NavigationIcon width={40} height={40} fill="#FFF" />
                ) : (
                  <SearchIcon2 width={28} height={28} fill="#FFF" />
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View className="flex-1">
        {/* Search Bar */}
        <View
          className={`absolute left-4 right-4 top-16 z-10 mt-16 rounded-t-3xl bg-white p-3 ${
            isExpanded ? 'min-h-28 py-4' : 'h-15'
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
                  placeholder="Your location"
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
                  placeholder="Destination"
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
>>>>>>> a11acc4 (add search location feature and 2 icons next to location in filtered search list)
        <MapLibreGL.MapView
          ref={map}
          style={{ flex: 1 }}
          logoEnabled={false}
          styleJSON={OSM_RASTER_STYLE}
          compassEnabled={false}>
          <MapLibreGL.Camera
            ref={camera}
            centerCoordinate={campusCenter}
            zoomLevel={14}
            heading={60}
            maxBounds={campusBounds}
            minZoomLevel={12.5}
          />
          {/* linia trasy */}
          <MapLine route={route} />
          <MapMarkers
            lastRoutePoint={lastRoutePoint}
            locations={locations}
            onMarkerPress={handleMarkerPress}
          />
          <MapLibreGL.UserLocation renderMode="native" androidRenderMode="compass" />
        </MapLibreGL.MapView>
      </View>
    </>
  );
}

interface MapLineProps {
  route: [number, number][];
}

function MapLine({ route }: MapLineProps) {
  return (
    <MapLibreGL.ShapeSource
      id="symbolLocationSource1"
      hitbox={{ width: 20, height: 20 }}
      shape={{
        type: 'FeatureCollection',
        features: [
          route &&
            route.length >= 2 && {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route,
              },
            },
        ].filter(Boolean),
      }}>
      <MapLibreGL.LineLayer
        id="layer1"
        style={{
          lineColor: '#fff',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 10,
          lineSortKey: -2,
        }}
      />
      <MapLibreGL.LineLayer
        id="layer2"
        style={{
          lineColor: '#003228',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 6,
          lineSortKey: -1,
        }}
      />
    </MapLibreGL.ShapeSource>
  );
}

interface mapMarkerProps {
  lastRoutePoint?: [number, number];
  locations: MapLocation[];
  onMarkerPress?: (id: number, location: [number, number]) => void;
}

function MapMarkers({ lastRoutePoint, locations, onMarkerPress }: mapMarkerProps) {
  return (
    <>
      <MapLibreGL.Images
        images={{
          pin: MapPin,
        }}
      />
      <MapLibreGL.ShapeSource
        id="symbolLocationSource"
        hitbox={{ width: 20, height: 20 }}
        onPress={(e) => {
          console.log(e);
          console.log(e.features.length);
          if (e.features.length > 0) {
            console.log(e.features[0]);
            onMarkerPress(e.features[0].id, e.features[0].geometry.coordinates);
          }

          e.features.forEach((f) => console.log(f));
        }}
        shape={{
          type: 'FeatureCollection',
          features: [
            lastRoutePoint && {
              type: 'Feature',
              id: 'endpoint',
              properties: {
                icon: 'pin',
              },
              geometry: {
                coordinates: lastRoutePoint,
                type: 'Point',
              },
            },

            ...locations.map((n, i) => ({
              type: 'Feature',
              id: i,
              properties: {
                icon: 'pin',
              },
              geometry: {
                coordinates: n.coordinates,
                type: 'Point',
              },
            })),
          ].filter(Boolean),
        }}>
        <MapLibreGL.SymbolLayer
          id="symbolLocationSymbols"
          style={{
            iconImage: ['get', 'icon'],
            iconSize: 0.1,
            iconAnchor: 'bottom',
          }}
        />
      </MapLibreGL.ShapeSource>
    </>
  );
}

interface seaarchBarProps {
  handleSearch: (text: string) => void;
  handleLocationSelect: (name: string) => void;
  isExpanded: boolean;
}

function SearchBar({ handleSearch, handleLocationSelect, isExpanded }: seaarchBarProps) {
  const { t } = useTranslation();

  const { searchQuery, filteredLocations } = useLocationStore();
  console.log('render');
  return (
    <>
      <View
        className={`absolute left-4 right-4 top-16 z-10 mt-16 rounded-t-3xl bg-white p-3 ${
          isExpanded ? 'min-h-28 py-4' : 'h-15'
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
              className="ml-3 ml-8 flex-1 text-lg"
              placeholder="Search"
              placeholderTextColor="#000"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus={!isExpanded}
            />
          </View>
        )}
      </View>
      {!isExpanded && filteredLocations.length > 0 && (
        <View
          className="absolute left-4 right-4 z-10 max-h-60 bg-white shadow"
          style={{
            top: isExpanded ? 140 : 160,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}>
          <View className="h-px bg-gray-300" />
          {filteredLocations.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-white p-2"
              onPress={() => {
                handleLocationSelect(item.name);
              }}>
              <View>{item.icon}</View>
              <Text className="ml-3 text-lg text-black">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
