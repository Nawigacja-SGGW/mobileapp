import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppSecureInput } from '~/components/AppInput';
import TopHeader from '~/components/TopHeader';
import { useUserStore } from '~/store/useUserStore';

export default function ChangePasswordView() {
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();

  const { resetPassword } = useUserStore();

  const { control, handleSubmit } = useForm();
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.newPassword || !data.confirmNewPassword) {
      ToastAndroid.show('Wypełnij wszystkie pola', ToastAndroid.SHORT);
      return;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      ToastAndroid.show('Hasła nie są identyczne', ToastAndroid.SHORT);
      return;
    }

    try {
      await resetPassword(data.newPassword);
      ToastAndroid.show('Zmieniono hasło pomyślnie', ToastAndroid.SHORT);
    } catch {
      ToastAndroid.show('Wystąpił błąd', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch="" toggleSearchBar={() => {}} />,
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
                keyboardType={undefined}
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
                togglePasswordVisibility={() =>
                  togglePasswordVisibility(setIsConfirmPasswordVisible)
                }
                keyboardType={undefined}
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
