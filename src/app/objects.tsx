import Drawer from 'expo-router/drawer';
import React,  { useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions } from 'react-native';
import useLocationStore from '~/store/useLocationStore';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import SearchIcon1 from '../../assets/search1.svg';
import TopHeaderOL from '~/components/TopHeaderObjectList';

export default function Objects() {
  const { t } = useTranslation();
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

  const [selectedOption, setSelectedOption] = useState<string>('name');

  const options = [
    { id: 'number', label: 'objects.number' },
    { id: 'name', label: 'objects.name' },
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
          className = 'absolute left-0 right-0 top-0 bottom-0'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: slideAnim.interpolate({
              inputRange: [screenHeight - 300, screenHeight],
              outputRange: [1, 0],
            }),
          }}
          >
          </TouchableOpacity>
        )}
        <Animated.View className = 'absolute left-0 right-0 bg-white shadow-lg p-5 h-48' style={{ top: slideAnim }}>
          <Text className='text-xs text-gray-400 font-extrabold mb-2'>{t('objects.sortBy')}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className='flex-row justify-between py-3'
              onPress={() => handleSelectSortOption(option.id)}
            >
              <Text className='text-lg text-black font-semibold'>{t(option.label)}</Text>
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
            ))) : (<Text className="text-center font-normal mt-5 text-[16px] text-[#8B8B8B]">{t('objects.noResults')}</Text> ))
        }
        </ScrollView>
    </View>
    </>
    );
  }