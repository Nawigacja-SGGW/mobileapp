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
  const {
    locationFrom,
    locationTo,
    navigationMode,
    isGuideActive,
    setNavigationMode,
    startGuideNavigation,
  } = useLocationStore();
  const { t } = useTranslation();
  const { updateUserStatistics } = useUserStore();
  const { routePreference, setRoutePreference } = useSettingsStore();
  const { distance } = useRouteQuery('foot');
  const { getNextPoint, skipPoint, nextPoint, points } = useGuideStore();

  // if (navigationMode === 'guidePreview')
  //   return (
  //     <View className="absolute bottom-0 z-10 max-h-96 w-full items-end justify-center">
  //       <View className="flex w-full justify-end bg-green-main">
  //         <></>
  //       </View>
  //     </View>
  //   );
  // else if (!locationTo || !visible || distanceLeft === 0) return <></>;
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
              </>
            )}
            {navigationMode === 'guide' && (
              <>
                <Text className="ml-4 mr-20 pt-5 text-xl font-bold text-white">
                  {points[nextPoint ?? 0].name}
                </Text>
              </>
            )}
            <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
              <Entypo size={20} name="time-slot" /> {getFormattedTime(distance / 1000)}
            </Text>
            <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
              <FontAwesome5 size={20} name="walking" color="white" /> {formatDistance(distanceLeft)}
            </Text>
            <Text className="ml-4 mr-20 pt-5 text-base font-bold text-white">
              <Entypo size={20} name="location-pin" /> Start: {points[0].name}
            </Text>
            {isInGuideMode && (
              <View className="flex-row items-end  justify-center gap-5 p-4">
                <TouchableOpacity
                  className="h-12 flex-1 items-center rounded-full bg-white p-2 text-2xl font-bold text-green-main"
                  onPress={async () => {
                    if (navigationMode === 'guidePreview') {
                      setNavigationMode('guide');
                      startGuideNavigation();
                      await updateUserStatistics(distance);
                    } else {
                      setNavigationMode(undefined);
                    }
                  }}>
                  <Text className="text-xl font-bold text-green-main">{cancelMessage}</Text>
                </TouchableOpacity>

                {nextPoint !== undefined && nextPoint < points.length - 1 && (
                  <TouchableOpacity
                    className="h-12 flex-1 items-center rounded-full bg-white p-2 text-2xl font-bold text-green-main"
                    onPress={async () => {
                      await skipPoint();
                    }}>
                    <Text className="text-xl font-bold text-green-main">
                    {t("navigation.nextStop")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
        </View>
      </View>
    );
}

const RoutePreferenceOption = ({
  routePreference,
  setRoutePreference,
  distance,
  isActive,
}: {
  routePreference: RoutePreference;
  setRoutePreference: (routePreference: RoutePreference) => void;
  distance: number;
  isActive: boolean;
}) => {
  const iconName = routePreference === RoutePreference.Bike ? 'biking' : 'walking';
  return (
    <>
      <Pressable
        className={`flex-row items-center justify-center gap-4
 rounded-full bg-neutral-600/50 px-6 py-3 ${isActive ? 'border border-white' : ''}`}
        onPress={async () => {
          await setRoutePreference(routePreference);
        }}>
        <View className="w-10">
          <FontAwesome5 size={24} name={iconName} color="white" />
        </View>
        {isActive && <Text className="text-xl text-white">{getFormattedTime(distance)}</Text>}
      </Pressable>
    </>
  );
};

//stuff that probably should be replaced by some lib but no time : (
function formatDistance(distance: number) {
  if (distance > 2) return `${Math.round(distance * 10) / 10} m`;
  return `${Math.round((distance * 1000) / 5) * 5} m`;
}

function getFormattedTime(distance: number) {
  return `${Math.ceil(distance / 0.0014 / 60)} min`;
}
