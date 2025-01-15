import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';

import MenuIcon from '../../assets/menus1.svg';
import NavigationIcon from '../../assets/navigation.svg';
import SearchIcon2 from '../../assets/search2.svg';

type TopBarProps = {
  modeSearch: boolean;
  onlyBack?: boolean;
  toggleSearchBar: () => void;
};

export default function TopHeader({ onlyBack, modeSearch, toggleSearchBar }: TopBarProps) {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  console.log('rerender', modeSearch, params);
  if (!onlyBack)
    return (
      <View
        pointerEvents="box-none"
        className="absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            Keyboard.dismiss();
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          <MenuIcon width={40} height={40} fill="#FFF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">Nawigacja SGGW </Text>
        <TouchableOpacity className="" onPress={toggleSearchBar}>
          {modeSearch ? (
            <NavigationIcon width={40} height={40} fill="#FFF" />
          ) : (
            <SearchIcon2 width={28} height={28} fill="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    );
  else
    return (
      <View className="absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">Nawigacja SGGW </Text>
        <View className="bg h-4 w-16" />
      </View>
    );
}
