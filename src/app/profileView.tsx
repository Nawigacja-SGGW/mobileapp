import React from 'react';
import Drawer from 'expo-router/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfilePicture from '../../assets/profile-picture.svg';
import BackProfileIcon from '../../assets/back-profile-icon.svg';


export default function ProfileView() {
  return (
    <>
    <Drawer.Screen options={{ headerShown: false }}
    />

    <View className="flex-1 bg-[#003228] px-6">
      {/* Header */}
      <Drawer.Screen options={{ headerShown: false }} />
      <View className="top-16 left-0 right-0 flex-row items-center justify-center">
        <TouchableOpacity className="absolute left-4">
          <BackProfileIcon width={24} height={24} fill="white" />
        </TouchableOpacity>
        <Text className="text-white text-l">logo/nazwa</Text>
      </View>

      {/* Profile Section */}
      <View className="items-center mt-28"> 
          <View className="w-40 h-40 rounded-full"> 
            <ProfilePicture width="100%" height="100%" />
          </View>
        </View>

      {/* User Info */}
      <View className="mt-40 px-4">
        {/* Email */}
        <View className="w-full max-w-lg mb-14">
          <Text className="text-white text-lg mb-1">email</Text>
          <Text className="text-white text-xl font-bold">random@gmail.com</Text>
        </View>

        {/* My Kilometers */}
        <View className="w-full max-w-lg mb-14">
          <Text className="text-white text-lg mb-1">my kilometers</Text>
          <Text className="text-white text-xl font-bold">1,2</Text>
        </View>

        {/* My Routes */}
        <View className="w-full max-w-lg mb-8">
          <Text className="text-[#D3D3D3] text-lg mb-1">my routes</Text>
          <Text className="text-white text-xl font-bold">5</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity className="bg-white py-4 rounded-full items-center w-3/4 mx-auto">
          <Text className="text-black font-extrabold text-xl">log out</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}
