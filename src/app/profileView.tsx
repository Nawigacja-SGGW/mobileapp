import { useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfilePicture from '../../assets/profile-picture.svg';

import Loading from '~/components/Loading';
import TopHeader from '~/components/TopHeader';
import { useUserStore } from '~/store/useUserStore';

const { height } = Dimensions.get('window');

export default function ProfileView() {
  const router = useRouter();
  const { t } = useTranslation();
  const { email, statistics, loading, logout } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#003228] px-4">
      {loading && <Loading />}

      {/* Header */}
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch="" toggleSearchBar={() => {}} />,
        }}
      />

      {/* Profile Section */}
      <View className="items-center" style={{ marginTop: height * 0.17 }}>
        <View className="h-52 w-52 rounded-full">
          <ProfilePicture width="100%" height="100%" />
        </View>
      </View>

      {/* User Info */}
      <View className="mt-10 px-4">
        {/* Email */}
        <View className="mb-8 w-full max-w-lg">
          <Text className="mb-1 text-lg text-[#D3D3D3]">{t('profile.email')}</Text>
          <Text className="mt-2 text-2xl font-bold text-white">{email ?? ''}</Text>
        </View>

        {/* My Kilometers */}
        <View className="mb-8 w-full max-w-lg">
          <Text className="mb-1 text-lg text-[#D3D3D3]">{t('profile.myKilometers')}</Text>
          <Text className="mt-2 text-2xl font-bold text-white">{statistics?.distanceSum ?? 0}</Text>
        </View>

        {/* My Routes */}
        <View className="mb-8 w-full max-w-lg">
          <Text className="mb-1 text-lg text-[#D3D3D3]">{t('profile.myRoutes')}</Text>
          <Text className="mt-2 text-2xl font-bold text-white">
            {statistics?.uniquePlacesVisitedCount ?? 0}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity
          className="mx-auto w-3/4 items-center rounded-full bg-white py-4"
          onPress={handleLogout}>
          <Text className="text-xl font-extrabold text-black">{t('profile.logOut')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
