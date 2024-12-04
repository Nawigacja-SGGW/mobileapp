import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '~/components/TopHeader';
import Drawer from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordView() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack={true} modeSearch={''} toggleSearchBar={() => {}} />,
        }}
      />

      {/* Tytuł */}
      <View
        style={{
          marginTop: height * 0.2,
          marginBottom: height * 0.05,
        }}
      >
        <Text className="text-2xl font-bold text-black">{t('resetPassword.title')}</Text>
      </View>

      {/* Pola tekstowe */}
      <View style={{ marginBottom: height * 0.1 }} className="space-y-6">
        {/* Current Password */}
        <View className="mt-16">
          <Text className="text-black text-sm mb-2">{t('resetPassword.currentPassword')}</Text>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            className="h-14 border border-black rounded-lg px-4 bg-white text-black text-base"
            style={{ fontSize: 36 }}
          />
        </View>

        {/* New Password */}
        <View className="mt-4">
          <Text className="text-black text-sm mt-2 mb-1">{t('resetPassword.newPassword')}</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            className="h-14 border border-black rounded-lg px-4 bg-white text-black text-base text-2xl"
            style={{ fontSize: 36 }}
          />
        </View>

        {/* Confirm New Password */}
        <View className="mt-4">
          <Text className="text-black text-sm mt-2 mb-1">{t('resetPassword.confirmNewPassword')}</Text>
          <TextInput
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
            className="h-14 border border-black rounded-lg px-4 bg-white text-black text-base"
            style={{ fontSize: 36 }}
          />
        </View>
      </View>

      {/* Przycisk resetowania */}
      <TouchableOpacity
        onPress={() => console.log('Reset Password')}
        className="bg-[#003228] rounded-full h-14 justify-center items-center"
        style={{
          width: width > 400 ? '80%' : '100%',
          alignSelf: 'center',
          marginTop: height * 0.05,
        }}
      >
        <Text className="text-white text-base font-bold text-xl">{t('resetPassword.resetButton')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
