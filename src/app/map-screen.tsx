import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

// Import svg icons
import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon1 from '../../assets/search1.svg';;
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
  const [isExpanded, setIsExpanded] = useState(false); // Track if the search bar is expanded

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMapPress = () => {
    setIsExpanded(true); // Expand search bar when user taps on the map
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton}>
          <MenuIcon width={40} height={40} fill="#FFF" />
        </TouchableOpacity>
        <Text style={styles.logoText}>logo/nazwa</Text>
        <TouchableOpacity style={styles.searchButton} onPress={toggleSearchBar}>
          {/* Toggle search/navigation icon */}
          {isExpanded ? (
            <NavigationIcon width={40} height={40} fill="#FFF" />
          ) : (
            <SearchIcon2 width={28} height={28} fill="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { height: isExpanded ? 130 : 70 }]}>
        {isExpanded ? (
          <>
            <View style={styles.searchRow}>
              <LightGreenDot width={20} height={20} style={styles.dot} />
              <TextInput
                style={styles.searchInput}
                placeholder="Your location"
                placeholderTextColor="#000000"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.searchRow}>
              <DarkGreenDot width={20} height={20} style={styles.dot} />
              <TextInput
                style={styles.searchInput}
                placeholder="Destination"
                placeholderTextColor="#000000"
              />
            </View>
          </>
        ) : (
          <View style={styles.searchRow}>
          <SearchIcon1 width={28} height={28} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#000000"
          />
          </View>
        )}
      </View>

      {/* Map View */}
      <MapLibreGL.MapView
        style={{ flex: 1 }}
        logoEnabled={false}
        styleURL="https://americanamap.org/style.json"
        onPress={handleMapPress} // Detect tap on map
      >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#0F4530',
    zIndex: 2,
  },
  menuButton: {
    padding: 10,
  },
  logoText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'inter'
  },
  searchButton: {
    padding: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 70,
    left: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: '#FFF',
    borderRadius: 40,
    padding: 10,
    overflow: 'hidden',
    marginTop: 35
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    marginLeft: 15,
    marginTop: 3,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    top: 7,
    left: 13,
    fontSize: 19,
    fontFamily: 'inter',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
  },
  separator: {
    color: '#000000',
    height: 1,
    backgroundColor: '#000000',
    width: '83%',
    marginLeft: 50,
    marginVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
    top: 10,
    left: 12
  },
});
