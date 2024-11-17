import { t } from 'i18next';
import { Text, View } from 'react-native';

const Loading = () => {
  return (
    <View className="absolute left-1/2 top-1/2 z-50 h-32 w-48 flex-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-neutral-300 shadow-lg">
      <Text className="text-3xl font-bold color-green-main">{t('loading')}...</Text>
    </View>
  );
};

export default Loading;
