import { FontAwesome5 } from '@expo/vector-icons';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import LightGreenDot from '../../assets/ellipse1.svg';
import DarkGreenDot from '../../assets/ellipse2.svg';
import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon1 from '../../assets/search1.svg';
import SearchIcon2 from '../../assets/search2.svg';

type TopBarProps = {
  isExpanded: boolean;
  toggleSearchBar: () => void;
};

export default function TopBar({ isExpanded, toggleSearchBar }: TopBarProps) {
  const navigation = useNavigation();
  console.log('rerender', isExpanded);
  return (
    <View className="absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-[#0F4530] px-4 pt-4">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MenuIcon width={40} height={40} fill="#FFF" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-white">logo/nazwa</Text>
      <TouchableOpacity className="p-2" onPress={toggleSearchBar}>
        {isExpanded ? (
          <NavigationIcon width={40} height={40} fill="#FFF" />
        ) : (
          <SearchIcon2 width={28} height={28} fill="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );
}
