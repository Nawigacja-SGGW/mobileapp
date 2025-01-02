import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import TopHeader from '~/components/TopHeader';

export default function StatisticsView() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-[#003228] px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch toggleSearchBar={() => {}} />,
        }}
      />
    </SafeAreaView>
  );
}
