import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text, Pressable } from 'react-native';

import CloseButton from '~/components/CloseButton';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import { useGuideStore } from '~/store/useGuideStore';
import useLocationStore from '~/store/useLocationStore';
import { RoutePreference, useSettingsStore } from '~/store/useSettingsStore';
import { useUserStore } from '~/store/useUserStore';

interface GuideModalProps {
  visible: boolean;
  onCancel: () => void;
  distanceLeft: number;
}

export default function GuideModal({ onCancel, visible, distanceLeft }: GuideModalProps) {
  const { navigationMode, setNavigationMode, startGuideNavigation } = useLocationStore();
  const { t } = useTranslation();
  const { updateUserStatistics } = useUserStore();
  const { distance } = useRouteQuery('foot');
  const { skipPoint, nextPoint, points } = useGuideStore();

  const isInGuideMode = navigationMode === 'guidePreview' || navigationMode === 'guide';
  const cancelMessage =
    navigationMode === 'guidePreview'
      ? t('navigation.start')
      : (nextPoint ?? 0) < points.length - 1
        ? t('cancel')
        : t('navigation.finish');

  if (isInGuideMode)
    return (
      <View className="absolute bottom-0 z-10 max-h-96 w-full items-end justify-center">
        <View className="flex w-full justify-end bg-green-main">
          <>
            {navigationMode === 'guidePreview' && (
              <>
                <View className="absolute right-2 top-2 rounded-2xl">
                  <CloseButton onClose={onCancel} />
                </View>
                <Text className="ml-4 mr-20 pt-5 text-3xl font-bold text-white">Campus Tour</Text>

                <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
                  <Entypo size={20} name="time-slot" /> {getFormattedTime(distance / 1000)}
                </Text>
                <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
                  <FontAwesome5 size={20} name="walking" color="white" /> {formatDistance(distance)}
                </Text>
                <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
                  <Entypo size={20} name="location-pin" /> Start: {points[0]?.name}
                </Text>
              </>
            )}
            {navigationMode === 'guide' && (
              <>
                <Text className=" pt-5 text-center text-xl font-bold text-white">
                  {points[nextPoint ?? 0].name}
                </Text>

                <View className="flex-row items-end  justify-center gap-5 py-4">
                  <Text className="text-2xl font-bold text-white">
                    {getFormattedTime(distanceLeft)} {formatDistance(distanceLeft)}
                  </Text>
                </View>
              </>
            )}
            <View className="flex-row items-end  justify-center gap-5 p-4">
              <TouchableOpacity
                className="h-12 flex-1 items-center rounded-full bg-white p-2 text-2xl font-bold text-green-main"
                onPress={async () => {
                  if (navigationMode === 'guidePreview') {
                    setNavigationMode('guide');
                    startGuideNavigation();
                    // await updateUserStatistics(distance);
                  } else {
                    setNavigationMode(undefined);
                  }
                }}>
                <Text className="text-xl font-bold text-green-main">{cancelMessage}</Text>
              </TouchableOpacity>

              {navigationMode === 'guide' && nextPoint < points.length - 1 && (
                <TouchableOpacity
                  className="h-12 flex-1 items-center rounded-full bg-white p-2 text-2xl font-bold text-green-main"
                  onPress={() => {
                    skipPoint();
                  }}>
                  <Text className="text-xl font-bold text-green-main">
                    {t('navigation.nextStop')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        </View>
      </View>
    );
}

//stuff that probably should be replaced by some lib but no time : (
function formatDistance(distance: number) {
  // return `${distance}`;
  if (distance > 2) return `${Math.round(distance * 10) / 10} m`;
  return `${Math.round((distance * 1000) / 5) * 5} m`;
}

function getFormattedTime(distance: number) {
  return `${Math.ceil(distance / 0.0014 / 60)} min`;
}
