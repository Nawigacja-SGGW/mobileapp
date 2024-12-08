import React, { useState } from 'react';
import { SafeAreaView, View, Text, useWindowDimensions, ScrollView } from 'react-native';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'expo-router/drawer';

import TopHeader from '~/components/TopHeader';
import { AppSecureInput } from '~/components/AppInput';
import { AppButton } from '~/components/AppButton';

export default function ChangePasswordView() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const { control, handleSubmit } = useForm();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  const onSubmit = async (data: FieldValues) => {
    console.log('Submitted data:', data);
    // TODO: dodać obsługę zmiany hasła poprzez API
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack={true} modeSearch={''} toggleSearchBar={() => {}} />,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <View
          style={{
            marginTop: height * 0.2,
            marginBottom: height * 0.05,
          }}>
          <Text className="text-2xl font-bold text-black">{t('resetPassword.title')}</Text>
        </View>

        <View style={{ marginBottom: height * 0.1 }} className="space-y-6">
          {/* Current Password */}
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('resetPassword.currentPassword')}
                placeholder={t('resetPassword.currentPassword')}
                value={value}
                onChangeText={onChange}
                isPasswordVisible={isCurrentPasswordVisible}
                togglePasswordVisibility={() => togglePasswordVisibility(setIsCurrentPasswordVisible)}
              />
            )}
          />

          {/* New Password */}
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('resetPassword.newPassword')}
                placeholder={t('resetPassword.newPassword')}
                value={value}
                onChangeText={onChange}
                isPasswordVisible={isNewPasswordVisible}
                togglePasswordVisibility={() => togglePasswordVisibility(setIsNewPasswordVisible)}
              />
            )}
          />

          {/* Confirm New Password */}
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('resetPassword.confirmNewPassword')}
                placeholder={t('resetPassword.confirmNewPassword')}
                value={value}
                onChangeText={onChange}
                isPasswordVisible={isConfirmPasswordVisible}
                togglePasswordVisibility={() => togglePasswordVisibility(setIsConfirmPasswordVisible)}
              />
            )}
          />
        </View>

        {/* Reset button */}
        <AppButton
          title={t('resetPassword.resetButton')}
          onPress={handleSubmit(onSubmit)}
          style={{
            width: width > 400 ? '80%' : '100%',
            alignSelf: 'center',
            marginTop: height * 0.01,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
