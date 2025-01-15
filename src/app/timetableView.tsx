import { useNavigation } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Drawer from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Dimensions} from 'react-native';

import TopHeader from '~/components/TopHeaderSort';
import {SortFilerOption, BottomChoiceSection} from '~/components/BottomChoiceSection'

export default function TimeTableView() {
    const [isSortVisible, setSortVisible] = useState(false);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;
    const [sortedBy, setSortedBy] = useState('date');
    const [filterBy, setFilteredBy] = useState('none');
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