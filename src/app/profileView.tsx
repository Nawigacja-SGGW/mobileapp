import React from 'react';
import Drawer from 'expo-router/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfilePicture from '../../assets/profile-picture.svg';
import TopHeader from '~/components/TopHeader';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ProfileView() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-[#003228] px-6">
      {/* Header */}
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack={true} modeSearch={''} toggleSearchBar={() => {}} />,
        }}
      />
      {/* Profile Section */}
      <View className="mt-52 items-center">
        <View className="h-52 w-52 rounded-full">
          <ProfilePicture width="100%" height="100%" />
        </View>
      </View>

      {/* User Info */}
      <View className="mt-20 px-4">
        {/* Email */}
        <View className="mb-14 w-full max-w-lg">
          <Text className="mb-1 text-2xl text-[#D3D3D3]">{t('profile.email')}</Text>
          <Text className="mt-2 text-3xl font-bold text-white">random@gmail.com</Text>
        </View>

        {/* My Kilometers */}
        <View className="mb-14 w-full max-w-lg">
          <Text className="mb-1 text-2xl text-[#D3D3D3]">{t('profile.myKilometers')}</Text>
          <Text className="mt-2 text-3xl font-bold text-white">1,2</Text>
        </View>

        {/* My Routes */}
        <View className="mb-8 w-full max-w-lg">
          <Text className="mb-1 text-2xl text-[#D3D3D3]">{t('profile.myRoutes')}</Text>
          <Text className="mt-2 text-3xl font-bold text-white">5</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity
          className="mx-auto w-3/4 items-center rounded-full bg-white py-4"
          onPress={() => router.push('/start')}>
          <Text className="text-xl font-extrabold text-black">{t('profile.logOut')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
