import { useFocusEffect } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loading from '~/components/Loading';
import TopHeader from '~/components/TopHeader';
import { useRankingStore } from '~/store/useRankingStore';
import { useUserStore } from '~/store/useUserStore';

const RankingList = ({
  title,
  data,
  userPlace,
}: {
  title: string;
  data: { name: string; value: number }[];
  userPlace: number | null;
}) => {
  const { t } = useTranslation();

  const renderItem = ({
    item,
    index,
  }: {
    item: { name: string; value: number };
    index: number;
  }) => (
    <View className="flex-row items-center border-b border-gray-200 px-4 py-2">
      <Text className="text-lg font-bold">{index + 1}.</Text>
      <View className="flex-1 flex-row justify-between">
        {userPlace === index + 1 && (
          <Text className="ml-4 text-lg font-bold">{t('rankingView.you')}</Text>
        )}
        {userPlace !== index + 1 && <Text className="ml-4 text-lg">{item.name}</Text>}
        <Text className="ml-4 text-lg font-bold">{item.value}</Text>
      </View>
    </View>
  );

  return (
    data && (
      <View className="my-4 rounded-lg bg-white shadow-md">
        <Text className="bg-gray-100 py-2 text-center text-xl font-bold">{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
        {userPlace !== null && (
          <View className="bg-gray-50 px-4 py-2">
            <Text className="text-center text-lg">
              {t('rankingView.your_place_in_ranking')}
              {': '}
              <Text className="font-bold">{userPlace}</Text>
            </Text>
          </View>
        )}
      </View>
    )
  );
};

const RankingView = () => {
  const { height } = Dimensions.get('window');
  const { t } = useTranslation();

  const {
    loading,
    fetchUserStatistics,
    mostVisitsInOnePlace,
    mostVisitedPlaces,
    mostDistanceTraveled,
  } = useRankingStore();

  useFocusEffect(
    useCallback(() => {
      fetchUserStatistics();
    }, [])
  );

  const { id } = useUserStore();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {loading && <Loading />}

      {/* Header */}
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch toggleSearchBar={() => {}} />,
        }}
      />
      <ScrollView className="flex-1 bg-gray-100" style={{ marginTop: height * 0.03 }}>
        {/* Content */}
        <View className="p-4">
          {/* Ranking List: Users with the most visits in one place */}
          <RankingList
            title={t('rankingView.users_with_the_most_visits_in_one_place')}
            data={mostVisitsInOnePlace()
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((item) => ({
                name: item.userEmail,
                value: item.count,
              }))}
            userPlace={mostVisitsInOnePlace().findIndex((item) => item.userId === id) + 1}
          />

          {/* Ranking List: Users with the most visited places */}
          <RankingList
            title={t('rankingView.users_with_the_most_visited_places')}
            data={mostVisitedPlaces()
              .slice(0, 5)
              .map((item) => ({
                name: item.userEmail,
                value: item.count,
              }))}
            userPlace={mostVisitedPlaces().findIndex((item) => item.userId === id) + 1}
          />

          {/* Ranking List: Users with the most distance traveled */}
          <RankingList
            title={t('rankingView.users_with_the_most_distance_traveled')}
            data={mostDistanceTraveled()
              .slice(0, 5)
              .map((item) => ({
                name: item.userEmail,
                value: item.distance,
              }))}
            userPlace={mostDistanceTraveled().findIndex((item) => item.userId === id) + 1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RankingView;
