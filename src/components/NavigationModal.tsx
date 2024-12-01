import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Modal, View, Text, Button } from 'react-native';
import useLocationStore from '~/store/useLocationStore';

interface NavigationModalProps {
  visible: boolean;
  onCancel: () => void;
  distanceLeft: number;
}

export default function NavigationModal({ onCancel, visible, distanceLeft }: NavigationModalProps) {
  const { locationTo } = useLocationStore();
  const { t } = useTranslation();

  if (!locationTo || !visible) return <></>;

  return (
    <View className="absolute bottom-0 max-h-96 w-full items-end justify-center">
      <View className="flex w-full justify-end bg-green-main">
        <Text className="py-5 text-center text-2xl font-bold text-white">
          {t('navigation.navigatingTo')} <Text>{locationTo?.name}</Text>
        </Text>
        <View className="flex-1 flex-row items-center justify-center gap-5 p-5">
          <Text className="p-2 text-2xl font-bold text-white">
            <FontAwesome5 className="" size={30} name="walking" color="white" />
            {'  ' + getFormattedTime(distanceLeft)} {'  ' + formatDistance(distanceLeft)}
          </Text>
        </View>
        <View className="flex-row items-end  justify-center gap-5  pb-6">
          <TouchableOpacity
            className="w-60 items-center rounded-full bg-white p-2"
            onPress={onCancel}>
            <Text className="font-bold text-green-main">{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

//stuff that probably should be replaced by some lib but no time : (
function formatDistance(distance: number) {
  if (distance > 2) return `${Math.round(distance * 10) / 10} km`;
  return `${Math.round(distance * 1000)} m`;
}

function getFormattedTime(distance: number) {
  return `${Math.ceil(distance / 0.0014 / 60)} min`;
}
