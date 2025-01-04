import { MaterialIcons } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';

import Loading from '~/components/Loading';
import TopHeader from '~/components/TopHeader';
import { useObjectsStore } from '~/store/useObjectsStore';
import { useUserStore } from '~/store/useUserStore';

export default function StatisticsView() {
  const { t } = useTranslation();
  const { loading, statistics, fetchUserStatistics } = useUserStore();
  const { height } = Dimensions.get('window');

  const { allObjects } = useObjectsStore();

  React.useEffect(() => {
    fetchUserStatistics();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4">
      {loading && <Loading />}

      {/* Header */}
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch toggleSearchBar={() => {}} />,
        }}
      />

      <ScrollView className="p-2" style={{ marginTop: height * 0.12 }}>
        <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-md">
          <MaterialIcons name="directions-walk" size={40} />
          <View className="ml-4">
            <Text className="text-base text-gray-700">{t('statistics.totalDistance')}</Text>
            <Text className="text-2xl font-bold text-gray-800">
              {statistics?.distanceSum ?? 0} km
            </Text>
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-md">
          <Text className="mb-2 text-lg font-bold">Top 5</Text>
          {!statistics?.topFiveVisitedPlaces && (
            <View className="items-center">
              <Text className="mb-2 text-base font-bold">{t('statistics.noData')}</Text>
            </View>
          )}
          <FlatList
            data={
              statistics?.topFiveVisitedPlaces.sort(
                (a, b) => b.routeCreatedCount - a.routeCreatedCount
              ) || []
            }
            keyExtractor={(item) => item.objectId.toString()}
            renderItem={({ item, index }) => (
              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-bold text-gray-800">{index + 1}.</Text>
                <Text className="ml-2 flex-1 text-sm text-gray-700">
                  {allObjects().find((o) => o.id === item.objectId)?.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {t('statistics.times', { count: item.routeCreatedCount })}
                </Text>
              </View>
            )}
          />
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-md">
          <Text className="text-lg font-bold">{t('statistics.visitedPlacesNumber')}</Text>
          <View className="mt-2 flex-row items-center justify-center">
            <MaterialIcons name="apartment" size={32} />
            <Text className="ml-2 text-2xl font-bold">{statistics?.uniquePlacesVisitedCount}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
