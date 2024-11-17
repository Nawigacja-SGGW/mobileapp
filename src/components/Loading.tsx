import { t } from 'i18next';
import { Text, View } from 'react-native';

const Loading = () => {
  return (
    <View className="absolute left-1/2 top-1/2 z-50 h-12 w-32 flex-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-neutral-300 shadow-lg">
      <Text className="text-xl font-medium color-green-main">{t('loading')}...</Text>
    </View>
  );
};

export default Loading;
