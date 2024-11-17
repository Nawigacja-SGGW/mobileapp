import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import TopHeaderOL from '~/components/TopHeaderObjectList';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Objects() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <>
        <Drawer.Screen
            options={{
            header: () => <TopHeaderOL/>,
            }}
        />
    </>
  );
}
