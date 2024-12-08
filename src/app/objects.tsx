import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import SearchIcon1 from '../../assets/search1.svg';

import TopHeaderOL from '~/components/TopHeaderObjectList';
import { useObjectsStore } from '~/store/useObjectsStore';

export default function Objects() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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

  return (
    <>
      <Drawer.Screen options={{ header: () => <TopHeaderOL onClick={toggleBottomSheet} /> }} />
      <SearchSection />
      {/* {isVisible && (
        <TouchableOpacity
          onPress={() => toggleBottomSheet()}
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: slideAnim.interpolate({
              inputRange: [screenHeight - 300, screenHeight],
              outputRange: [1, 0],
            }),
          }}
        />
      )}
      <Animated.View
        className="absolute left-0 right-0 h-48 bg-white p-5 shadow-lg"
        style={{ top: slideAnim }}>
        <Text className="mb-2 text-xs font-extrabold text-gray-400">{t('objects.sortBy')}</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            className="flex-row justify-between py-3"
            onPress={() => handleSelectSortOption(option.id)}>
            <Text className="text-lg font-semibold text-black">{t(option.label)}</Text>
            {selectedOption === option.id && (
              <FontAwesome6 name="circle-dot" size={20} color="[#0F9D58]" />
            )}
          </TouchableOpacity>
        ))}
      </Animated.View> */}
    </>
  );
}

function SearchSection() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const locations = useObjectsStore().sortedBy((a, b) => a.name.localeCompare(b.name));

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View className="flex-1 bg-white px-3">
        <View className="h-15 relative mb-5 mt-36 rounded-3xl border border-[#E4E4E4] p-3">
          <View className="flex-row items-center">
            <SearchIcon1 width={28} height={28} className="mr-2" />
            <TextInput
              className="ml-8 flex-1 text-lg"
              placeholder={t('objects.search')}
              placeholderTextColor="#000"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        </View>
        <ScrollView>
          {searchQuery === '' ? (
            filteredLocations.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                className={`flex-row items-center p-2 active:bg-[#EDEDED] ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                onPress={() => {
                  //handleLocationSelect(item.name);
                }}>
                {/* <View>{item.icon}</View> */}
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
              </TouchableOpacity>
            ))
          ) : filteredLocations.length > 0 ? (
            filteredLocations.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                className={`flex-row items-center p-2 active:bg-[#EDEDED] ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                onPress={() => {
                  //handleLocationSelect(item.name);
                }}>
                {/* //<View>{item.icon}</View> */}
                <Text className="ml-3 text-lg text-black">{item.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="mt-5 text-center text-[16px] font-normal text-[#8B8B8B]">
              {t('objects.noResults')}
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
