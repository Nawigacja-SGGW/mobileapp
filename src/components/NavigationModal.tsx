import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';

import CloseButton from '~/components/CloseButton';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import useLocationStore from '~/store/useLocationStore';
import { useUserStore } from '~/store/useUserStore';

interface NavigationModalProps {
  visible: boolean;
  onCancel: () => void;
  distanceLeft: number;
}

export default function NavigationModal({ onCancel, visible, distanceLeft }: NavigationModalProps) {
  const { locationFrom, locationTo, navigationMode, setNavigationMode } = useLocationStore();
  const { t } = useTranslation();
  const { fetchUserStatistics, updateUserStatistics } = useUserStore();
  const { distance } = useRouteQuery('foot');

  if (!locationTo || !visible || distanceLeft === 0) return <></>;

  return (
    <View className="absolute bottom-0 z-10 max-h-96 w-full items-end justify-center">
      <View className="flex w-full justify-end bg-green-main">
        <>
          {navigationMode === 'routing' && (
            <View className="absolute right-2 top-2 rounded-2xl">
              <CloseButton onClose={onCancel} />
            </View>
          )}
          <Text className="ml-4 mr-20 py-5 text-xl font-bold text-white">
            {t('navigation.navigatingTo')} <Text>{locationTo?.name}</Text>
          </Text>
          <View className="flex-1 flex-row items-center gap-5 p-5">
            <Text className="p-2 text-2xl font-bold text-white">
              <FontAwesome5 className="" size={30} name="walking" color="white" />
              {'  ' + getFormattedTime(distanceLeft)} {'  ' + formatDistance(distanceLeft)}
            </Text>
          </View>
          {Array.isArray(locationFrom) && (
            <View className="flex-row items-end  justify-center gap-5  pb-6">
              <TouchableOpacity
                className="w-60 items-center rounded-full bg-white p-2"
                onPress={async () => {
                  if (navigationMode === 'routing') {
                    setNavigationMode('navigating');
                    await updateUserStatistics(distance);
                    await fetchUserStatistics();
                  } else {
                    onCancel();
                  }
                }}>
                <Text className="font-bold text-green-main">
                  {navigationMode === 'navigating' ? t('cancel') : t('navigation.start')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      </View>
    </View>
  );
}

//stuff that probably should be replaced by some lib but no time : (
function formatDistance(distance: number) {
  if (distance > 2) return `${Math.round(distance * 10) / 10} km`;
  return `${Math.round((distance * 1000) / 5) * 5} m`;
}

function getFormattedTime(distance: number) {
  return `${Math.ceil(distance / 0.0014 / 60)} min`;
}
