/* eslint-disable react/jsx-curly-brace-presence */
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export function EditScreenInfo({ path }: { path: string }) {
  const { t } = useTranslation();
  const title = t('getStarted');
  const description = t('changeCode');

  return (
    <View>
      <View className={'mx-12 items-center'}>
        <Text className={'text-center text-lg leading-6'}>{title}</Text>
        <View className={'my-2 rounded-md px-1'}>
          <Text>{path}</Text>
        </View>
        <Text className={'text-center text-lg leading-6'}>{description}</Text>
      </View>
    </View>
  );
}
