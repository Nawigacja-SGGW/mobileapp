import React from 'react';
import Drawer from 'expo-router/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfilePicture from '../../assets/profile-picture.svg';
import TopHeader from '~/components/TopHeader';



export default function ProfileView() {
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
      <View className="items-center mt-52"> 
          <View className="w-52 h-52 rounded-full"> 
            <ProfilePicture width="100%" height="100%" />
          </View>
        </View>

      {/* User Info */}
      <View className="mt-20 px-4">
        {/* Email */}
        <View className="w-full max-w-lg mb-14">
          <Text className="text-[#D3D3D3] text-2xl mb-1">email</Text>
          <Text className="text-white text-3xl mt-2 font-bold">random@gmail.com</Text>
        </View>

        {/* My Kilometers */}
        <View className="w-full max-w-lg mb-14">
          <Text className="text-[#D3D3D3] text-2xl mb-1">my kilometers</Text>
          <Text className="text-white text-3xl mt-2 font-bold">1,2</Text>
        </View>

        {/* My Routes */}
        <View className="w-full max-w-lg mb-8">
          <Text className="text-[#D3D3D3] text-2xl mb-1">my routes</Text>
          <Text className="text-white text-3xl mt-2 font-bold">5</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="absolute bottom-6 left-6 right-6">
        <TouchableOpacity className="bg-white py-4 rounded-full items-center w-3/4 mx-auto">
          <Text className="text-black font-extrabold text-xl">log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
