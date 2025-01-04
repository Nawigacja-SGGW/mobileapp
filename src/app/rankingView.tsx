import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { useRankingStore } from '~/store/useRankingStore';

const RankingList = ({ title, data, userPlace }) => {
  const renderItem = ({ item, index }) => (
    <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-2">
      <Text className="text-lg font-bold">{index + 1}.</Text>
      <Text className="text-lg">{item.name}</Text>
    </View>
  );

  return (
    <View className="my-4 rounded-lg bg-white shadow-md">
      <Text className="bg-gray-100 py-2 text-center text-xl font-bold">{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {userPlace && (
        <View className="bg-gray-50 px-4 py-2">
          <Text className="text-center text-lg">
            Your place in the ranking: <Text className="font-bold">{userPlace}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const RankingView = () => {
  const {
    loading,
    fetchUserStatistics,
    mostVisitsInOnePlace,
    mostVisitedPlaces,
    mostDistanceTraveled,
  } = useRankingStore();

  React.useEffect(() => {
    fetchUserStatistics();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Loading indicator */}
      {loading && <Text>Loading...</Text>}

      {/* Header */}
      <View className="bg-green-800 py-4">
        <Text className="text-center text-xl font-bold text-white">logo/nazwa</Text>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Ranking List: Users with the most visits in one place */}
        <RankingList
          title="Users with the most visits in one place:"
          data={mostVisitsInOnePlace()}
          userPlace={8}
        />

        {/* Ranking List: Users with the most visited places */}
        <RankingList
          title="Users with the most visited places:"
          data={mostVisitedPlaces()}
          userPlace={null}
        />

        {/* Ranking List: Users with the most distance traveled */}
        <RankingList
          title="Users with the most distance traveled:"
          data={mostDistanceTraveled()}
          userPlace={9}
        />
      </View>
    </View>
  );
};

export default RankingView;
