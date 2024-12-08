import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { use } from 'i18next';
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
import { MapObject, useObjectsStore } from '~/store/useObjectsStore';

export default function Objects() {
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [isVisible, setIsVisible] = useState(false);

  const [sortedBy, setSortedBy] = useState('name');

  const objectsStore = useObjectsStore();

  const locations: MapObject[] =
    sortedBy === 'number'
      ? objectsStore.sortedByNumber()
      : objectsStore.sortedBy((a, b) => a.name.localeCompare(b.name));

  const toggleBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? screenHeight : screenHeight - 200, // Wysokość paska, np. 300px
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsVisible(!isVisible);
  };

  return (
    <View className="absolute h-full w-full">
      <Drawer.Screen options={{ header: () => <TopHeaderOL onClick={toggleBottomSheet} /> }} />
      <SearchSection locations={locations} />
      {isVisible && (
        <SortBottomSheet
          slideAnim={slideAnim}
          toggleBottomSheet={toggleBottomSheet}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
      )}
    </View>
  );
}

type SearchSectionProps = {
  locations: MapObject[];
};

function SearchSection(props: SearchSectionProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = props.locations.filter((location: MapObject) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (objectId: number) => {
    navigation.navigate('LocationDetailsScreen', { objectId });
  };

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
          {filteredLocations.length > 0 ? (
            filteredLocations.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                className={`flex-row items-center p-5 active:bg-[#EDEDED] ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                onPress={() => {
                  handleLocationSelect(item.id);
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

type SortBottomSheetProps = {
  slideAnim: Animated.Value;
  toggleBottomSheet: () => void;
  sortedBy: string;
  setSortedBy: React.Dispatch<React.SetStateAction<string>>;
};

function SortBottomSheet({
  slideAnim,
  toggleBottomSheet,
  sortedBy,
  setSortedBy,
}: SortBottomSheetProps) {
  const { t } = useTranslation();

  const handleSelectSortOption = (optionId: string) => {
    setSortedBy(optionId);
    toggleBottomSheet();
  };

  const options = [
    { id: 'number', label: 'objects.number' },
    { id: 'name', label: 'objects.name' },
  ];

  return (
    <>
      <TouchableOpacity
        onPress={() => toggleBottomSheet()}
        className="absolute bottom-0 left-0 right-0 top-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />
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
            {sortedBy === option.id && (
              <FontAwesome6 name="circle-dot" size={20} color="[#0F9D58]" />
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
}
