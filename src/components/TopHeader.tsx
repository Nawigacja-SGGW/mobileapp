import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon2 from '../../assets/search2.svg';

type TopBarProps = {
  isExpanded: boolean;
  toggleSearchBar: () => void;
};

export default function TopHeader({ isExpanded, toggleSearchBar }: TopBarProps) {
  const navigation = useNavigation();
  console.log('rerender', isExpanded);
  return (
    <View className="pointer-events-auto absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MenuIcon width={40} height={40} fill="#FFF" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-white">Nawigacja SGGW</Text>
      <TouchableOpacity className="" onPress={toggleSearchBar}>
        {isExpanded ? (
          <NavigationIcon width={40} height={40} fill="#FFF" />
        ) : (
          <SearchIcon2 width={28} height={28} fill="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );
}
