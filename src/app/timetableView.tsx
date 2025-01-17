import { useNavigation } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useTranslation } from 'react-i18next';
import {View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions} from 'react-native';

import TopHeader from '~/components/TopHeaderSort';
import {SortFilerOption, BottomChoiceSection} from '~/components/BottomChoiceSection';
import SearchBar from '~/components/SearchBar';
import {formatDate, getDateRange} from "~/components/DateFormat";

import {PointObject} from '~/store/useObjectsStore';
import {useEventStore} from '~/store/useEventStore';

export default function TimeTableView() {
    const [isSortVisible, setSortVisible] = useState(false);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    const [sortedBy, setSortedBy] = useState('date');
    const [filterBy, setFilteredBy] = useState('none');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSortSheet = () => {
        Animated.timing(slideAnim, {
            toValue: isSortVisible ? screenHeight : screenHeight - 200,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setSortVisible(!isSortVisible);
        setFilterVisible(false);
    };
    const toggleFilterSheet = () => {
      Animated.timing(slideAnim, {
        toValue: isFilterVisible ? screenHeight : screenHeight - 200,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setFilterVisible(!isFilterVisible);
      setSortVisible(false);
    }

    const sortOptions = [
      {id: 'date', label: 'events.date'},
      { id: 'location', label: 'events.location' },
      { id: 'category', label: 'events.category' }
    ];
    const filterOptions = [
      {id: 'date', label: 'events.date'},
      { id: 'location', label: 'events.location' },
      { id: 'category', label: 'events.category' }
    ];
    
    return (
        <>
            <Drawer.Screen options={{ header: () =>
                <TopHeader onSortClick = {toggleSortSheet} filter onFilterClick = {toggleFilterSheet} />
            }}/>
            <View className="flex-1 bg-white px-3">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <ObjectListSection sortedBy={sortedBy} filteredBy={filterBy} searchQuery={searchQuery}/>
            </View>
            {isSortVisible && (
                <BottomChoiceSection
                slideAnim={slideAnim}
                toggleSection={toggleSortSheet}
                switchedBy={sortedBy}
                setSwitchedBy={setSortedBy}
                label='sortBy'
                options={sortOptions}
                />
            )}
            {isFilterVisible && (
                <BottomChoiceSection
                slideAnim={slideAnim}
                toggleSection={toggleFilterSheet}
                switchedBy={filterBy}
                setSwitchedBy={setFilteredBy}
                label='filterBy'
                options={filterOptions}
                />
            )}
        </>
    );
}

type ObjectListArgs = {
  sortedBy :string;
  filteredBy: string;
  searchQuery: string;
};

function ObjectListSection(args: ObjectListArgs) {
  const eventsStore = useEventStore();
  const { t } = useTranslation();

  let events :PointObject[] = eventsStore.objects;
  
  // Sort by
  switch(args.sortedBy) {
    case "date": {
      events = eventsStore.sortedByDate();
      break;
    }
    case "location": {
      events = eventsStore.sortedByLocation();
      break;
    }
    case "category": {
      events = eventsStore.sortedByCategory();
      break;
    }
    default: {
      events = eventsStore.objects;
    }
  }
  // Filter by
  // Search Query
  events = events.filter((event: PointObject) =>
    event.name.toLowerCase().includes(args.searchQuery.toLowerCase()) || 
    formatDate(event.eventStart!).includes(args.searchQuery.toLowerCase()) ||
    (event.eventEnd != null && formatDate(event.eventEnd).includes(args.searchQuery.toLowerCase()))
  );

  return (
    <ScrollView>
      {
        events.length > 0 ? (
          events.map((item, index) => (<EventElement key={item.id} event={item} index={index}/>))
        ) : (
          <Text className="mt-5 text-center text-[16px] font-normal text-[#8B8B8B]">
            {t('noResults')}
          </Text>
        )
      }
    </ScrollView>
  );
}

type EventElementArgs = {
  event :PointObject;
  index :number;
};

function EventElement(args: EventElementArgs) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const onClick = (objectId: number) => {
    navigation.navigate('eventDetailsScreen', { objectId });
  };

  const startDate :Date = args.event.eventStart!;
  const endDate :Date | null = args.event.eventEnd;

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={`flex-row items-center p-5 active:bg-[#EDEDED] ${args.index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}
      onPress={() => {
        onClick(args.event.id);
      }}>
      {/* Ikona książki */}
      <Text className="mr-3">
        <Ionicons name="book-outline" size={45} color="black" />
      </Text>

      {/* Separator */}
      <View className="w-[1px] h-full bg-gray-400 mr-3" />

      {/* Data i czas */}
      <View className="flex-col">
        <View className="flex-row items-center mb-1">
          <Text className="mr-3">
            <Feather name="clock" size={28} color="black"/>
          </Text>
          <Text className="text-black text-lg w-[200px] flex-wrap">
            { getDateRange(startDate, endDate) }
          </Text>
        </View>

        {/* Lokalizacja */}
        <View className="flex-row items-center">
          <Text className="mr-3">
            <Feather name="map" size={28} color="black" />
          </Text>
          <Text className="text-black text-lg">{args.event.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}