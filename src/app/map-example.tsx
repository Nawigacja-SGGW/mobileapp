import MapLibreGL from '@maplibre/maplibre-react-native';
import React, { useRef } from 'react';
import { View } from 'react-native';
MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const campusBounds = {
  ne: [21.054976793556115, 52.16900258184394],
  sw: [21.038764000472895, 52.156410516716925],
};

const campusCenter = [21.04635389581634, 52.16357007158958];
export default function MapExample() {
  const camera = useRef(null);

  return (
    <View className="flex-1 items-center justify-center bg-[#F5FCFF]">
      <MapLibreGL.MapView
        style={{ flex: 1, alignSelf: 'stretch' }} //3-rd party component, have to use style= instead of class name
        logoEnabled={false}
        styleURL="https://americanamap.org/style.json">
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
