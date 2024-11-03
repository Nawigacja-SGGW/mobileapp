import MapLibreGL from '@maplibre/maplibre-react-native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouteQuery } from '~/hooks/useRouteQuery';
MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const initialQuery = [
  [21.04140547436029, 52.16335178481617],
  [21.05198654696983, 52.163067821889484],
] as [number, number][];

const campusCenter = [21.04635389581634, 52.16357007158958];
export default function MapExample() {
  const camera = useRef(null);
  const map = useRef(null);

  const [points, setPoints] = useState<Array<[number, number]> | null>(null);
  useEffect(() => {
    // console.log('map', map.current);
    // console.log(map.current?.getCoordinateFromView(0, 0));
  }, []);
  const route = useRouteQuery(points ?? []);

  return (
    <View className="flex-1 items-center justify-center bg-[#F5FCFF]">
      <MapLibreGL.MapView
        style={{ flex: 1, alignSelf: 'stretch' }} //3-rd party component, have to use style= instead of class name
        logoEnabled={false}
        styleURL="https://americanamap.org/style.json"
        ref={map}
        onPress={(e) => {
          console.log(e, 'elo');
          console.log(e.geometry.coordinates, points);
          setPoints((p) => {
            console.log(p);
            if (!p) return [e.geometry.coordinates];
            p = [...p, e.geometry.coordinates];
            if (p.length > 2) return [...p.slice(1)];
            return [...p];
          });
        }}>
        <MapLibreGL.Camera
          ref={camera}
          centerCoordinate={campusCenter}
          zoomLevel={14}
          heading={60}
          maxBounds={campusBounds}
          minZoomLevel={12.5}
        />

        {route.length >= 2 && (
          <MapLibreGL.ShapeSource
            id="source1"
            lineMetrics
            shape={{
              type: 'LineString',
              coordinates: route,
            }}>
            <MapLibreGL.LineLayer
              id="layer1"
              style={{
                lineColor: 'red',
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: 8,
              }}
            />
          </MapLibreGL.ShapeSource>
        )}
      </MapLibreGL.MapView>
      <View className="absolute bottom-0 right-0 h-10 w-10 bg-green-main" />
    </View>
  );
}
