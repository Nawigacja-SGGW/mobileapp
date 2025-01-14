import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const NoLocationPermission = () => {
  const { t } = useTranslation();

  return (
    <View className="absolute bottom-14 left-1/2 z-50 h-12 w-96 flex-1 -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-around rounded-xl bg-red-500 px-6 shadow-lg">
      <FontAwesome5
        name="exclamation-triangle"
        size={20}
        color="white"
        className="text-xl font-medium color-white"
      />
      <Text className="ml-6 text-xl font-medium color-white">{t('noLocationPermission')}</Text>
    </View>
  );
};

export default NoLocationPermission;
