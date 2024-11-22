import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ProfilePicture from '../../assets/profile-picture.svg'; 
import BackProfileIcon from '../../assets/back-profile-icon.svg';

  

//TODO: fix margins to match figma design, add drawer
export default function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('random@gmail.com');
  const [username, setUsername] = useState('user123');
  const [phoneNumber, setPhoneNumber] = useState('+48 500 222 333');

  return (
    <View className="flex-1 bg-[#003228] px-6 pt-8">
      {/* Logo and back button */}
      <View className="absolute left-0 right-0 top-6 flex-row items-center justify-center">
        <TouchableOpacity className="absolute left-4">
          <BackProfileIcon width={24} height={24} fill="white" />
        </TouchableOpacity>
        <Text className="text-l text-white">logo/nazwa</Text>
      </View>

      {/* Profile section */}
      <View className="mt-8 items-center">
        <View className="mb-4 mt-12 h-24 w-24">
          <ProfilePicture width="100%" height="100%" />
        </View>
        <Text className="text-2xl font-semibold text-white">Name Surname</Text>
      </View>

      {/* User Info */}
      <View className="flex-1 mb-10 items-center justify-start px-4 pt-12">
        {isEditing ? (
          <View className="w-full max-w-lg">
            {/* Email */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="border-b border-[#B0B0B0] pb-2 text-white"
                placeholder="Enter email"
                placeholderTextColor="gray"
              />
            </View>

            {/* Username */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">username</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="border-b border-[#B0B0B0] pb-2 text-white"
                placeholder="Enter username"
                placeholderTextColor="gray"
              />
            </View>

            {/* Phone Number */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">phone number</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className="border-b border-[#B0B0B0] pb-2 text-white"
                placeholder="Enter phone number"
                placeholderTextColor="gray"
              />
            </View>
          </View>
        ) : (
          <View className="w-full max-w-lg">
            {/* Email */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">email</Text>
              <Text className="text-xl font-bold text-white">{email}</Text>
            </View>

            {/* Username */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">username</Text>
              <Text className="text-xl font-bold text-white">{username}</Text>
            </View>

            {/* Phone Number */}
            <View className="mb-10">
              <Text className="mb-2 text-lg font-medium text-white">phone number</Text>
              <Text className="text-xl font-bold text-white">{phoneNumber}</Text>
            </View>
          </View>
        )}
      </View>
      {/* Action buttons */}
      <View className="absolute bottom-6 left-6 right-6">
        {isEditing ? (
          <TouchableOpacity
            onPress={() => setIsEditing(false)} // Wyłącz tryb edycji
            className="mx-auto w-3/4 items-center rounded-full bg-white py-4">
            <Text className="font-semibold text-[#006400]">Save Changes</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => console.log('Open History')}
              className="mx-auto mb-4 w-3/4 items-center rounded-full bg-black py-4">
              <Text className="font-semibold text-white">History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(true)} // Przełącz na tryb edycji
              className="mx-auto w-3/4 items-center rounded-full bg-white py-4">
              <Text className="font-semibold text-[#006400]">Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
