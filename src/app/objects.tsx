import Drawer from 'expo-router/drawer';
import React from 'react';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import useLocationStore from '~/store/useLocationStore';

import SearchIcon1 from '../../assets/search1.svg';
import TopHeaderOL from '~/components/TopHeaderObjectList';

export default function Objects() {
  const navigation = useNavigation();

    // Zustand store
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

  return (
    <>
        <Drawer.Screen options={{header: () => <TopHeaderOL/>,}}/>
        <SearchBar
          handleSearch={handleSearch}
          handleLocationSelect={handleLocationSelect}
        />
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
