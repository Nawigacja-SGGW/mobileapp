import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MenuIcon from '../../assets/menus1.svg';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type TopHeaderProps = {
  onSortClick: () => void;
  filter?: boolean;
  onFilterClick?: () => void;
};

export default function TopHeader({onSortClick, filter = false, onFilterClick = () => {}}: TopHeaderProps): React.ReactNode {
  const navigation = useNavigation();
  return (
    <View className="pointer-events-auto absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MenuIcon width={40} height={40} fill="#FFF" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-white">Nawigacja SGGW</Text>
      <TouchableOpacity className="p-2" onPress={onSortClick}>
        <View className="rotate-90">
          <FontAwesome6 name="arrow-right-arrow-left" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
      {filter ? (
        <TouchableOpacity className="p-2" onPress={onFilterClick}>
          <Feather name="filter" size={28} color="white" />
        </TouchableOpacity>
      ) : (<></>)}
    </View>
  );
}