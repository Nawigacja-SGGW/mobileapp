import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function TopHeader({
  onClick = () => {},
}: {
  onClick?: () => void;
}): React.ReactNode {
  const navigation = useNavigation();

  return (
    <View className="pointer-events-auto absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="menu" size={40} color="#fff" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-white">Nawigacja SGGW</Text>
      <TouchableOpacity className="p-2" onPress={onClick}>
        <FontAwesome6 name="arrow-right-arrow-left" size={28} color="#fff" classname="rotate-90" />
      </TouchableOpacity>
    </View>
  );
}
