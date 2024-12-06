import Drawer from 'expo-router/drawer';
import React,  { useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions, StyleSheet } from 'react-native';
import useLocationStore from '~/store/useLocationStore';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import SearchIcon1 from '../../assets/search1.svg';
import TopHeaderOL from '~/components/TopHeaderObjectList';

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 10,
    fontWeight: 900,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 600,
  },
  checkmark: {
    fontSize: 18,
    color: '#0F9D58',
  },
});


export default function Objects() {
  const navigation = useNavigation();

  const { setSearchQuery, filterLocations, clearFilteredLocations } = useLocationStore();

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

  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [isVisible, setIsVisible] = useState(false);

  const toggleBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? screenHeight : screenHeight - 200, // Wysokość paska, np. 300px
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsVisible(!isVisible);
  };

  const [selectedOption, setSelectedOption] = useState<string>('number');

  const options = [
    { id: 'number', label: 'number' },
    { id: 'name', label: 'name: from A to Z' },
  ];

  const handleSelectSortOption = (optionId: string) => {setSelectedOption(optionId);};

  return (
    <>
        <Drawer.Screen options={{header: () => <TopHeaderOL onClick={toggleBottomSheet}/>,}}/>
        <SearchBar
          handleSearch={handleSearch}
          handleLocationSelect={handleLocationSelect}
        />
        {isVisible && (
          <TouchableOpacity 
          onPress={() => toggleBottomSheet()}
          style={[styles.overlay, {
            opacity: slideAnim.interpolate({
              inputRange: [screenHeight - 300, screenHeight],
              outputRange: [1, 0],
            }),
          }]}
          >
          </TouchableOpacity>
        )}
        <Animated.View style={[styles.bottomSheet, { top: slideAnim }]}>
          <Text style={styles.header}>SORT BY</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => handleSelectSortOption(option.id)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              {selectedOption === option.id && <FontAwesome6 name="circle-dot" size={20} color="[#0F9D58]" />}
            </TouchableOpacity>
          ))}
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
                    //autoFocus = {true}
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