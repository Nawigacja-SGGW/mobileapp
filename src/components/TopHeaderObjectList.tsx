import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import styled from 'styled-components'

import MenuIcon from '../../assets/menus1.svg';
import FilterIcon from '../../assets/filter1.svg';
// import { ArrowSort } from '@styled-icons/fluentui-system-filled';
//import { MenuAlt1 } from '@styled-icons/heroicons-outline';

export default function TopHeader({ onClick = () => {} }: { onClick?: () => void }): React.ReactNode {

  const navigation = useNavigation();

//   const StyledArrowSort = styled(ArrowSort)`
//   color: red;
// `
  return (
    <View className="pointer-events-auto absolute left-0 right-0 top-0 z-20 h-28 flex-row items-center justify-between bg-green-main px-4 pb-0 pt-8">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MenuIcon width={40} height={40} fill="#FFF" />
      </TouchableOpacity>
      <Text className="text-lg font-bold text-white">logo/nazwa</Text>
      <TouchableOpacity
      className="p-2"
      onPress={onClick}>
      <FilterIcon width={28} height={28} fill="#FFF" />
      </TouchableOpacity>
      {/* <ArrowSort width={28} height={28} fill="#FFF" /> */}
      {/* <StyledArrowSort /> */}
    </View>
  );
}