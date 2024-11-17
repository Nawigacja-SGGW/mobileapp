import MapLibreGL, { CameraRef } from '@maplibre/maplibre-react-native';
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
import Ionicons from '@expo/vector-icons/Ionicons';

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
  const [currentCameraRotation, setCurrentCameraRotation] = useState(60);

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
          console.log("map-screen.tsx location");
          console.log(location);
        }
      );

      const location = await Location.getCurrentPositionAsync({});
      userLocation.current = location;
      console.log("map-screen.tsx userLocation.current");
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

    }
  };

  const handlePointNorth = () => {
      console.log("handlePointNorth");
      setCurrentCameraRotation(0);
      if (camera.current) {
        camera.current.setCamera({
          heading: 0,
          animationDuration: 1000,
        });
      }
    }

  const compassStyle = {
    transform: `rotate(${(-currentCameraRotation - 45)}deg)`
  };
  console.log(-currentCameraRotation - 45);

  return (
    <>
      <Drawer.Screen
        options={{
          header: () => <TopHeader isExpanded={isExpanded} toggleSearchBar={toggleSearchBar} />,
        }}
      />
      <View className="flex-1">
        <SearchBar
          handleSearch={handleSearch}
          isExpanded={isExpanded}
          handleLocationSelect={handleLocationSelect}
        />

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
            heading={currentCameraRotation}
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
        {/* compass */}
        <TouchableOpacity onPress={handlePointNorth} className='absolute bottom-5 right-5 z-10'>
          <Ionicons name="compass-sharp" size={50} color="#003228" style={compassStyle}/>
        </TouchableOpacity>
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
          //console.log(e);
          //console.log(e.features.length);
          if (e.features.length > 0) {
            //console.log(e.features[0]);
            onMarkerPress(e.features[0].id, e.features[0].geometry.coordinates);
          }

          //e.features.forEach((f) => console.log(f));
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
