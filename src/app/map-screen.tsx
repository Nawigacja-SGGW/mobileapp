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

import TopHeader from '~/components/TopHeader';
import { OSM_RASTER_STYLE } from '~/core/OSRM-tiles';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import type { MapLocation } from '~/store/useLocationStore';
import useLocationStore from '~/store/useLocationStore';

import { FontAwesome5 } from '@expo/vector-icons';
import { Touchable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapScreen() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  // const [locationFrom, setlocationFrom] = useState<undefined | [number, number] | MapLocation>(
  //   undefined
  // );
  // const [locationTo, setlocationTo] = useState<undefined | [number, number] | MapLocation>(
  //   undefined
  // );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [points, setPoints] = useState<[number, number][] | null>(null);
  const userLocation = useRef<Location.LocationObject>();

  const waypoints = useMemo(() => [locationFrom, locationTo], [locationFrom, locationTo]);

  // Zustand store
  const {
    locations,
    setSearchQuery,
    filterLocations,
    clearFilteredLocations,
    searchQuery,
    filteredLocations,
    searchMode,
    locationTo,
    locationFrom,
    setRoute,
    setSearchMode,
  } = useLocationStore();
  const { route } = useRouteQuery('foot');

  const camera = useRef<MapLibreGL.CameraRef | null>(null);
  const map = useRef(null);
  const lastRoutePoint = route?.at(-1);

  const expandFullSearchBar = () => {
    setIsExpanded(true);
    clearFilteredLocations();
    setSearchQuery('');
  };

  const toggleSearchBar = () => {
    if (searchMode === 'idle') setSearchMode('searchto');
    else setSearchMode('idle');
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
      if (userLocation.current !== undefined && locationFrom === undefined) {
        setRoute({
          locationFrom: [
            userLocation.current.coords.longitude,
            userLocation.current.coords.latitude,
          ],
        });
      }
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

  const handleLocationSelect = (location: string) => {
    if (userLocation.current === undefined) setSearchMode('idle');
    console.log('Selected location:', location);
    setRoute({
      locationFrom: [userLocation.current.coords.longitude, userLocation.current.coords.latitude],
    });
  };

  const handleMarkerPress = (id: number, location: [number, number]) => {
    const locationObject = locations.find((l) => l.id == id);
    setIsExpanded(true);
    console.log('location Object ', locationObject, id, locations);
    switch (searchMode) {
      case 'searchfrom':
        setRoute({
          locationFrom: locationObject,
        });
        break;
      case 'searchto':
        setRoute({
          locationTo: locationObject,
        });
        break;
    }
  };

  return (
    <>
      <Drawer.Screen
        options={{
          header: () => (
            <TopHeader modeSearch={searchMode !== 'idle'} toggleSearchBar={toggleSearchBar} />
          ),
        }}
      />
      <View className="flex-1">
        {/* Pasek wyszukiwania */}
        <SearchBar
          handleSearch={handleSearch}
          handleLocationSelect={handleLocationSelect}
          isExpanded={isExpanded}
        />

        <MapLibreGL.MapView
          ref={map}
          style={{ flex: 1, paddingTop: 90 }}
          logoEnabled={false}
          styleJSON={OSM_RASTER_STYLE}
          onPress={() => {
            setSearchMode('idle');
            setSearchQuery('');
          }}
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

interface MapMarkersProps {
  lastRoutePoint?: [number, number];
  locations: MapLocation[];
  onMarkerPress?: (id: number, location: [number, number]) => void;
}

function MapMarkers({ lastRoutePoint, locations, onMarkerPress }: MapMarkersProps) {
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
          if (e.features.length > 0) {
            onMarkerPress(e.features[0].id, e.features[0].geometry.coordinates);
          }
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
              id: n.id,
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

interface SearchBarProps {
  handleSearch: (text: string) => void;
  handleLocationSelect: (name: MapLocation) => void;
  isExpanded: boolean;
}

function SearchBar({ handleSearch, handleLocationSelect, isExpanded }: SearchBarProps) {
  const { t } = useTranslation();
  const {
    setRoute,
    searchQuery,
    filteredLocations,
    locations,
    locationTo,
    locationFrom,
    setSearchMode,
    searchMode,
  } = useLocationStore();
  const _locations =
    searchQuery.length !== 0 ? filteredLocations.slice(0, 8) : locations.slice(0, 8);
  console.log('locations', _locations, searchQuery);

  const showSearchbar = searchMode !== 'idle';
  return (
    <>
      <View
        className={`absolute left-4 right-4 top-16 z-10 mt-16 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl ${
          showSearchbar ? 'min-h-28 py-4' : 'h-15'
        }`}>
        {!showSearchbar ? (
          <View className="flex-col">
            <View className="mb-2 ml-4 flex-row items-center">
              <LightGreenDot width={20} height={20} className="ml-4 mr-2" />
              <TextInput
                className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                placeholder={t('map.search.startingPoint')}
                placeholderTextColor="#000"
                value={
                  typeof locationFrom === 'object' && !Array.isArray(locationFrom)
                    ? locationFrom.name
                    : t('map.search.startingPoint')
                }
                onPressIn={() => {
                  setSearchMode('searchfrom');
                  console.log('press in top');
                }}
              />
            </View>
            <View className="my-1 ml-16 h-px w-5/6 bg-gray-300" />
            <View className="ml-4 flex-row items-center">
              <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
              <TextInput
                className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                placeholder={t('map.search.destination')}
                placeholderTextColor={locationTo ? '#000' : '#888'}
                value={
                  typeof locationTo === 'object' && !Array.isArray(locationTo)
                    ? locationTo.name
                    : ''
                }
                onChangeText={handleSearch}
                onPressIn={() => {
                  setSearchMode('searchto');
                  console.log('press bottom');
                }}
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
              autoFocus={showSearchbar}
            />
          </View>
        )}
      </View>

      {/* Lista wyników wyszukiwania */}
      {showSearchbar && (
        <View
          className="absolute left-4 right-4 z-10 max-h-60 bg-white shadow"
          style={{
            top: !showSearchbar ? 140 : 160,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}>
          <View className="h-px bg-gray-300" />
          <View className="flex-col gap-5 overflow-hidden rounded-3xl bg-white ">
            {searchMode === 'searchfrom' && searchQuery.length === 0 && (
              <TouchableOpacity
                key={0}
                className="flex-row items-center bg-white p-2"
                onPress={() => {
                  handleLocationSelect('mylocation');
                }}>
                <View>
                  <FontAwesome5 name="location-arrow" size={20} color="black" />
                </View>
                <Text className="ml-3 text-lg text-black">{t('map.search.startingPoint')}</Text>
              </TouchableOpacity>
            )}
            {_locations.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row items-center bg-white p-2"
                onPress={() => {
                  if (searchMode === 'searchfrom') {
                    setRoute({
                      locationFrom: item,
                    });
                  } else if (searchMode === 'searchto') {
                    setRoute({
                      locationTo: item,
                    });
                  }
                  console.log('press in list');
                  setSearchMode('idle');
                }}>
                <View>{item.icon}</View>
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
              </TouchableOpacity>
            ))}
            {_locations.length === 0 && (
              <View key={0} className="flex-row justify-center bg-white p-2 text-center">
                <Text className="text-lg text-gray-600">No locations found</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}
