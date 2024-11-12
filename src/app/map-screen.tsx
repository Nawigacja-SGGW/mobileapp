import MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import SearchIcon1 from '../../assets/search1.svg';
import MapPin2 from './../../assets/map-pin.png';

import TopHeader from '~/components/TopHeader';
import { OSM_RASTER_STYLE } from '~/core/OSRM-tiles';
import { useRouteQuery } from '~/hooks/useRouteQuery';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];

export default function MapExample() {
  const { t } = useTranslation();
  const camera = useRef(null);
  const map = useRef(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const [points, setPoints] = useState<[number, number][] | null>(null);
  const userLocation = useRef<Location.LocationObject>();
  useEffect(() => {
    // console.log('map', map.current);
    // console.log(map.current?.getCoordinateFromView(0, 0));
  }, []);

  const route = useRouteQuery(points ?? []);

  const toggleSearchBar = () => {
    console.log('toggle');
    setIsExpanded((n) => !n);
  };

  const handleMapPress = (e) => {
    setIsExpanded(true);

    console.log(e, 'elo');
    console.log(e.geometry.coordinates, points);
    map.current &&
      console.log(
        map.current.queryRenderedFeaturesAtPoint([
          e.properties.screenPointX,
          e.properties.screenPointY,
        ])
      );
    setPoints([
      [userLocation.current?.coords.longitude, userLocation.current?.coords.latitude],
      e.geometry.coordinates,
    ]);
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      setLocation(JSON.stringify(location));
      console.log(userLocation.current);
    })();
  }, []);

  return (
    <>
      <Drawer.Screen
        options={{
          header: () => <TopHeader isExpanded={isExpanded} toggleSearchBar={toggleSearchBar} />,
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
            <>
              <View className="mb-2 ml-4 flex-row items-center">
                <LightGreenDot width={20} height={20} className="ml-4 mr-2" />

                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder={t('map.search.startingPoint')}
                  placeholderTextColor="#000"
                />
              </View>
              <View className="my-1 ml-16 h-px w-5/6 bg-black" />
              <View className="ml-4 flex-row items-center">
                <DarkGreenDot width={20} height={20} className="ml-4 mr-2" />
                <TextInput
                  className="ml-2 mt-1 flex-1 rounded-md bg-white px-4 text-lg"
                  placeholder={t('map.search.destination')}
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

        <MapLibreGL.MapView
          ref={map}
          style={{ flex: 1 }}
          logoEnabled={false}
          styleJSON={OSM_RASTER_STYLE}
          onPress={handleMapPress}
          compassEnabled={false}>
          <MapLibreGL.Images
            images={{
              pin: MapPin2,
            }}
          />

          <MapLibreGL.Camera
            ref={camera}
            centerCoordinate={campusCenter}
            zoomLevel={14}
            heading={60}
            maxBounds={campusBounds}
            minZoomLevel={12.5}
          />

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

          <MapLibreGL.ShapeSource
            id="symbolLocationSource"
            hitbox={{ width: 20, height: 20 }}
            onPress={(e) => {
              console.log(e);
              console.log(e.features.length);
              if (e.features.length > 0) console.log(e.features[0]);
              e.features.forEach((f) => console.log(f));
            }}
            shape={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  id: 'campusCenter',
                  properties: {
                    icon: 'pin',
                  },
                  geometry: {
                    coordinates: [21.04635389581634, 52.16357007158958],
                    type: 'Point',
                  },
                },
                points &&
                  points[1] && {
                    type: 'Feature',
                    id: 'endpoint',
                    properties: {
                      icon: 'pin',
                    },
                    geometry: {
                      coordinates: points[1],
                      type: 'Point',
                    },
                  },
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

          <MapLibreGL.UserLocation renderMode="native" androidRenderMode="compass" />
        </MapLibreGL.MapView>
      </View>
    </>
  );
}
