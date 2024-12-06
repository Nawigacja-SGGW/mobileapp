import Drawer from 'expo-router/drawer';
import React,  { useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions, StyleSheet } from 'react-native';
import useLocationStore from '~/store/useLocationStore';

import SearchIcon1 from '../../assets/search1.svg';
//@styled-icons/fluentui-system-filled/Search
import TopHeaderOL from '~/components/TopHeaderObjectList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 15,
    backgroundColor: '#6200ea',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sheetText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});


export default function Objects() {
  const navigation = useNavigation();

  const { setSearchQuery, filterLocations, clearFilteredLocations } = useLocationStore();
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [isVisible, setIsVisible] = useState(false);

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
    clearFilteredLocations();
    console.log("Go to ",locationName," detail");
    //navigation.navigate('objectDetail',{locationName});
  };

  const toggleBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? screenHeight : screenHeight - 300, // Wysokość paska, np. 300px
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsVisible(!isVisible);
  };

  return (
    <>
        <Drawer.Screen options={{header: () => <TopHeaderOL onClick={toggleBottomSheet}/>,}}/>
        <SearchBar
          handleSearch={handleSearch}
          handleLocationSelect={handleLocationSelect}
        />
        <Animated.View style={[styles.bottomSheet, { top: slideAnim }]}>
          <Text style={styles.sheetText}>To jest wysuwany pasek!</Text>
        </Animated.View>
    </>
  );
}

interface searchBarProps {
    handleSearch: (text: string) => void;
    handleLocationSelect: (name: string) => void;
  }

function SearchBar({ handleSearch, handleLocationSelect }: searchBarProps) {
    const { t } = useTranslation();
    // Zustand store
    const { locations, searchQuery, filteredLocations } = useLocationStore();

    return (
    <>
    <View className="flex-1 bg-white px-3">
        <View className="relative mt-36 mb-5 rounded-3xl p-3 h-15 border border-[#E4E4E4]">
            <View className="flex-row items-center">
                <SearchIcon1 width={28} height={28} className="mr-2" />
                <TextInput
                    className="ml-3 ml-8 flex-1 text-lg"
                    placeholder="Search"
                    placeholderTextColor="#000"
                    value={searchQuery}
                    onChangeText={handleSearch}
                    //autoFocus=
                />
            </View>
        </View>
        <ScrollView>
        {searchQuery === "" ? (locations.map((item, index) => (
            <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                className={`flex-row items-center p-2 active:bg-[#EDEDED] ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                onPress={() => { handleLocationSelect(item.name) }}>
                <View>{item.icon}</View>
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
            </TouchableOpacity>
            ))) : (filteredLocations.length > 0 ? (filteredLocations.map((item, index) => (
                <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                className={`flex-row items-center p-2 active:bg-[#EDEDED] ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                onPress={() => { handleLocationSelect(item.name) }}>
                <View>{item.icon}</View>
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
                </TouchableOpacity>
            ))) : (<Text className="text-center font-normal mt-5 text-[16px] text-[#8B8B8B]">{t('noResults')}</Text> ))
        }
        </ScrollView>
    </View>
    </>
    );
  }