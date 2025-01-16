import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text, Pressable } from 'react-native';

import CloseButton from '~/components/CloseButton';
import { useRouteQuery } from '~/hooks/useRouteQuery';
import useLocationStore from '~/store/useLocationStore';
import { RoutePreference, useSettingsStore } from '~/store/useSettingsStore';
import { useUserStore } from '~/store/useUserStore';

interface NavigationModalProps {
  visible: boolean;
  onCancel: () => void;
  distanceLeft: number;
}

export default function NavigationModal({ onCancel, visible, distanceLeft }: NavigationModalProps) {
  const { locationFrom, locationTo, navigationMode, isGuideActive, setNavigationMode } =
    useLocationStore();
  const { t } = useTranslation();
  const { updateUserStatistics } = useUserStore();
  const { routePreference, setRoutePreference } = useSettingsStore();
  const { distance } = useRouteQuery(routePreference === RoutePreference.Walk ? 'foot' : 'bike');

  if (navigationMode === 'guidePreview')
    return (
      <View className="absolute bottom-0 z-10 max-h-96 w-full items-end justify-center">
        <View className="flex w-full justify-end bg-green-main">
          <></>
        </View>
      </View>
    );
  else if (!locationTo || !visible || distanceLeft === 0) return <></>;

  return (
    <View className="absolute bottom-0 z-10 max-h-96 w-full items-end justify-center">
      <View className="flex w-full justify-end bg-green-main">
        <>
          {navigationMode === 'routing' && (
            <View className="absolute right-2 top-2 rounded-2xl">
              <CloseButton onClose={onCancel} />
            </View>
          )}
          <Text className="ml-4 mr-20 pt-5 text-3xl font-bold text-white">{locationTo?.name}</Text>
          <Text className="ml-4 mr-20 text-2xl text-neutral-300">
            {formatDistance(distanceLeft)}
          </Text>
          {navigationMode === 'guidePreview' && (
            <View className="my-6 w-full flex-1 flex-row items-center justify-center gap-10">
              <RoutePreferenceOption
                routePreference={RoutePreference.Walk}
                setRoutePreference={setRoutePreference}
                distance={distanceLeft}
                isActive={routePreference === RoutePreference.Walk}
              />
              <RoutePreferenceOption
                routePreference={RoutePreference.Bike}
                setRoutePreference={setRoutePreference}
                distance={distanceLeft}
                isActive={routePreference === RoutePreference.Bike}
              />
            </View>
          )}
          {navigationMode === 'guide' && (
            <View className="flex-row items-end  justify-center gap-5 py-4">
              <Text className="text-2xl font-bold text-white">
                {t('navigation.timeLeft', { time: getFormattedTime(distanceLeft) })}
              </Text>
            </View>
          )}
          {Array.isArray(locationFrom) && (
            <View className="flex-row items-end  justify-center gap-5 py-4">
              <TouchableOpacity
                className="h-12 w-64 items-center rounded-full bg-white p-2 text-2xl font-bold text-green-main"
                onPress={async () => {
                  if (navigationMode === 'routing') {
                    setNavigationMode('navigating');
                    await updateUserStatistics(distance);
                  } else {
                    onCancel();
                  }
                }}>
                <Text className="text-xl font-bold text-green-main">
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
