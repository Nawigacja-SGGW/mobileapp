import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity } from 'react-native';

//import NoInternetIcon from '../../assets/no-internet.png';

export const NoInternet = () => {
  const { t } = useTranslation();

  return (
    <View className="absolute z-50 h-full w-screen flex-1 items-center justify-center bg-green-main">
      <Image source={require('./../../assets/no-internet.png')} />
      <Text className="pb-2 text-2xl font-bold text-white">{t('noInternet.title')}</Text>
      <Text className="text-xl text-neutral-200">{t('noInternet.text')}</Text>
      <TouchableOpacity className="absolute bottom-12 rounded-full bg-white p-4">
        <Text className="h-8 w-64 text-center text-xl font-bold text-black">
          {t('noInternet.tryAgain')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
