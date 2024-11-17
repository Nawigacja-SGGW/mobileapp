import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import MenuIcon from '../../assets/menus1.svg';
import FilterIcon from '../../assets/filter1.svg';

export default function TopHeader() {
  const navigation = useNavigation();
  return (
    <View className="pointer-events-auto absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MenuIcon width={40} height={40} fill="#FFF" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-white">logo/nazwa</Text>
      <FilterIcon width={28} height={28} fill="#FFF" />
    </View>
  );
}
