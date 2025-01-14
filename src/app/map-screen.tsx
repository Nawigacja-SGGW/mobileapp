import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapLibreGL, { UserTrackingMode, CameraRef } from '@maplibre/maplibre-react-native';
import { RegionPayload } from '@maplibre/maplibre-react-native/javascript/components/MapView';
import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Point } from 'react-native-svg/lib/typescript/elements/Shape';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import SearchIcon1 from '../../assets/search1.svg';
import Loading from '../components/Loading';

import NavigationModal from '~/components/NavigationModal';
import NoLocationPermission from '~/components/NoLocationPemission';
import LocationModal from '~/components/ObjectModal';
import TopHeader from '~/components/TopHeader';
import { OSM_RASTER_STYLE } from '~/core/OSRM-tiles';
import { usePlaceNavigation } from '~/hooks/usePlaceNavigation';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import type { MapLocation } from '~/store/useLocationStore';
import useLocationStore from '~/store/useLocationStore';
import { useObjectsStore } from '~/store/useObjectsStore';
import { RoutePreference, useSettingsStore } from '~/store/useSettingsStore';
import { useUserStore } from '~/store/useUserStore';
import { NoInternet } from '~/components/NoInternet';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapScreen() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedObject, setselectedObject] = useState(undefined);
  const userLocation = useRef<Location.LocationObject>();
  const [locationEstablished, setLocationEstablished] = useState(false);
  const { fetchUserHistory, updateUserHistory } = useUserStore();

  const {
    locations,
    setSearchQuery,
    filterLocations,
    clearFilteredLocations,
    searchMode,
    locationFrom,
    setRoute,
    setSearchMode,
    setNavigationMode,
    navigationMode,
  } = useLocationStore();
  const { routePreference } = useSettingsStore();
  const {
    isLoading,
    route,
    distance: routeQueryDistance,
  } = useRouteQuery(routePreference === RoutePreference.Walk ? 'foot' : 'bike');
  const {
    route: navRoute,
    distance,
    userLocation: uLocation,
  } = usePlaceNavigation(routePreference === RoutePreference.Walk ? 'foot' : 'bike');
  const { loading, fetchData, allObjects } = useObjectsStore();

  const camera = useRef<MapLibreGL.CameraRef | null>(null);
  const map = useRef(null);
  const lastRoutePoint = route?.at(-1);

  const [mapRotation, setMapRotation] = useState(60);
  const [mapCenterLocation, setMapCenterLocation] = useState(campusCenter);
  const [mapZoom, setMapZoom] = useState(14);

  const expandFullSearchBar = () => {
    setIsExpanded(true);
    clearFilteredLocations();
    setSearchQuery('');
  };

  const toggleSearchBar = () => {
    if (searchMode === 'idle') setSearchMode('searchto');
    else setSearchMode('idle');
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
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
            setErrorMsg(null);
            if (!locationEstablished) {
              setLocationEstablished(true);
            }
            console.log('map-screen.tsx location');
            console.log(location);
          }
        );

        const location = await Location.getCurrentPositionAsync();
        userLocation.current = location;

        if (userLocation.current !== undefined && locationFrom === undefined) {
          setRoute({
            locationFrom: [
              userLocation.current.coords.longitude,
              userLocation.current.coords.latitude,
            ],
          });
        }
        console.log('map-screen.tsx userLocation.current');
        console.log(userLocation.current);
      })();
    }, [])
  );

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
      locationFrom: [userLocation.current?.coords.longitude, userLocation.current?.coords.latitude],
    });
  };

  const handleMarkerPress = (id: number, location: [number, number]) => {
    // if (navigationMode !== 'arrived' || navigationMode) return;
    console.log({ navigationMode });
    const locationObject = locations.find((l) => l.id == id);
    setIsExpanded(true);
    //console.log('location Object ', locationObject, id, locations);

    updateUserHistory(id, 1);
    fetchUserHistory();

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
      case 'idle':
        setselectedObject(locationObject?.id);
        setIsExpanded(true);
        break;
    }
  };

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const handlePointNorth = () => {
    console.log('handlePointNorth');
    setMapRotation(0);
  };

  const handleMapChanged = (event: any) => {
    const { properties } = event;
    if (properties != undefined) {
      setMapRotation(properties.heading);
      setMapCenterLocation(properties.centerCoordinate);
      setMapZoom(properties.zoomLevel);
    }
  };

  const compassStyle = {
    transform: `rotate(${-mapRotation - 45}deg)`,
    margin: -5,
  };
  console.log(-mapRotation - 45);

  console.log('Locations: ', locations);
  console.log('objects: ', allObjects());

  return (
    <>
      {(isLoading || loading) && <Loading />}
      {errorMsg && <NoLocationPermission />}
      <NoInternet />

      <Drawer.Screen
        options={{
          header: () => (
            <TopHeader modeSearch={searchMode !== 'idle'} toggleSearchBar={toggleSearchBar} />
          ),
        }}
      />
      <View className="flex-1">
        {navigationMode !== 'navigating' && (
          <SearchBar
            handleSearch={handleSearch}
            handleLocationSelect={handleLocationSelect}
            isExpanded={isExpanded}
          />
        )}

        <MapLibreGL.MapView
          ref={map}
          style={{ flex: 1, paddingTop: 90 }}
          logoEnabled={false}
          styleJSON={OSM_RASTER_STYLE}
          onPress={() => {
            setSearchMode('idle');
            setSearchQuery('');
          }}
          onRegionDidChange={handleMapChanged}
          compassEnabled={false}>
          <MapLibreGL.Camera
            ref={camera}
            centerCoordinate={mapCenterLocation}
            zoomLevel={mapZoom}
            heading={mapRotation}
            maxBounds={campusBounds}
            minZoomLevel={12.5}
            followUserLocation={navigationMode === 'navigating'}
            allowUpdates
            followUserMode={UserTrackingMode.Follow}
          />
          {/* linia trasy */}
          <MapLine
            route={
              navigationMode === 'navigating' ? navRoute : navigationMode === 'routing' ? route : []
            }
            locationFrom={uLocation}
          />
          <MapMarkers
            lastRoutePoint={lastRoutePoint}
            locations={locations}
            onMarkerPress={handleMarkerPress}
          />
          {(locationEstablished || userLocation.current) && (
            <MapLibreGL.UserLocation
              animated={false}
              renderMode="native"
              androidRenderMode="compass"
            />
          )}
        </MapLibreGL.MapView>
        {/* compass */}
        <TouchableOpacity
          onPress={handlePointNorth}
          className="absolute bottom-5 right-5 z-0 z-10 rounded-full bg-white">
          <Ionicons name="compass-sharp" size={50} color="#003228" style={compassStyle} />
        </TouchableOpacity>
        <LocationModal
          isVisible={isExpanded}
          setIsVisible={setIsExpanded}
          objectId={selectedObject}
          userLocation={userLocation}
        />
        <NavigationModal
          onCancel={() => {
            setNavigationMode(undefined);
          }}
          distanceLeft={
            navigationMode === 'navigating' ? distance / 1000 : routeQueryDistance / 1000
          }
          visible={navigationMode === 'navigating' || navigationMode === 'routing'}
        />
      </View>
    </>
  );
}

interface MapLineProps {
  route: [number, number][];
  locationFrom?: [number, number];
  locationTo?: [number, number];
}

function MapLine({ route, locationFrom, locationTo }: MapLineProps) {
  const mapLineShape = {
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
  };

  return (
    <>
      <MapLibreGL.ShapeSource
        id="symbolLocationSource1"
        hitbox={{ width: 20, height: 20 }}
        shape={mapLineShape}>
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
      <MapLibreGL.ShapeSource
        id="symbolLocationSource123"
        shape={{
          type: 'FeatureCollection',
          features: [
            route.length > 0 && {
              type: 'Feature',
              id: 'endpoint',
              properties: {
                icon: 'pin',
              },
              geometry: {
                coordinates: route.at(-1),
                type: 'Point',
              },
            },
          ].filter(Boolean),
        }}>
        <MapLibreGL.CircleLayer
          id="3534"
          style={{
            circleRadius: 3,
            circleStrokeWidth: 3,
            circleStrokeColor: 'gray',
            circleColor: 'white',
            circleBlur: 0.1,
          }}
        />
      </MapLibreGL.ShapeSource>
    </>
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
          pin: require('./../../assets/map-pin.png'),
        }}
      />
      <MapLibreGL.ShapeSource
        id="symbolLocationSource123"
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
          ].filter(Boolean),
        }}>
        <MapLibreGL.CircleLayer
          id="3534"
          style={{
            circleRadius: 7,
            circleStrokeWidth: 3,
            circleStrokeColor: 'gray',
            circleColor: 'white',
            circleBlur: 0.1,
          }}
        />
      </MapLibreGL.ShapeSource>
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
  const { routePreference } = useSettingsStore();
  const { searchHistory, fetchUserHistory, updateUserHistory } = useUserStore();
  const { distance } = useRouteQuery(routePreference === RoutePreference.Walk ? 'foot' : 'bike');
  const { allObjects } = useObjectsStore();
  const _locations =
    searchQuery.length !== 0 ? filteredLocations.slice(0, 8) : locations.slice(0, 8);

  let shownLocations: MapLocation[] = _locations;

  let shownSearchHistory = searchHistory.filter((n) => {
    const object = allObjects().find((l) => l.id === n.objectId);
    if (!object) return false;
    if (!(object.name.includes(searchQuery) || searchQuery.includes(object.name))) return false;
    return true;
  });

  if (searchHistory && allObjects) {
    shownSearchHistory = searchHistory.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

    const mappedHistory = shownSearchHistory
      .map((n) => {
        const object = allObjects().find((l) => l.id === n.objectId);
        if (!object) return null;
        if (!(object.name.includes(searchQuery) || searchQuery.includes(object.name))) return null;
        return {
          id: n.objectId,
          name: object?.name ?? 'Brak nazwy',
          type: 'Historia',
          coordinates: [object?.latitude, object?.longitude],
        };
      })
      .filter((n) => n != null);

    shownLocations = [...mappedHistory, ..._locations];

    const uniqueLocations: MapLocation[] = [];
    const seenNames = new Set<string>();

    shownLocations.forEach((location) => {
      if (!seenNames.has(location.name)) {
        uniqueLocations.push(location);
        seenNames.add(location.name);
      }
    });

    // not the prettiest but quickly done
    shownLocations = uniqueLocations;
  }

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
            {shownLocations.map((item) => (
              <TouchableOpacity
                key={item.id + item.type === 'Historia' ? 'history' : null}
                className="flex-row items-center bg-white p-2"
                onPress={async () => {
                  if (searchMode === 'searchfrom') {
                    setRoute({
                      locationFrom: item,
                    });
                  } else if (searchMode === 'searchto') {
                    setRoute({
                      locationTo: item,
                    });
                  }
                  // TODO adjust route created count instead of 1
                  await updateUserHistory(item.id, 1);
                  await fetchUserHistory();

                  console.log('press in list');
                  setSearchMode('idle');
                }}>
                <View>
                  <FontAwesome5 name={typeToIcon(item.type)} size={20} color="black" />
                </View>
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
              </TouchableOpacity>
            ))}
            {shownLocations.length === 0 && (
              <View key={0} className="flex-row justify-center bg-white p-2 text-center">
                <Text className="text-lg text-gray-600">{t('map.search.noResults')}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const mapDistance = (
  location1: [number, number] | MapLocation,
  location2: [number, number] | MapLocation
): number => {
  if (!location1 || !location2) return 0;
  const [lat1, lon1] = Array.isArray(location1) ? location1 : location1.coordinates;
  const [lat2, lon2] = Array.isArray(location2) ? location2 : location2.coordinates;

  const toRad = (deg: number) => (deg * Math.PI) / 180,
    R = 6371;
  const [dLat, dLon] = [toRad(lat2 - lat1), toRad(lon2 - lon1)];
  return (
    R *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
      )
    )
  );
};

const tti = {
  'Obiekt sportowy': 'basketball-ball',
  Wydział: 'school',
  Pomnik: 'place-of-worship',
  Przyroda: 'canadian-maple-leaf',
  'Dom Studencki': 'hotel',
  Historia: 'history',
};

const typeToIcon = (t: string) => tti[t] || 'building';
