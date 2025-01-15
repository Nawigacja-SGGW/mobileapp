import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View className="absolute left-1/2 top-1/2 z-50 h-16 w-16 flex-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-neutral-100 shadow-lg">
      <ActivityIndicator size="large" color="#003228" />
    </View>
  );
};

export default Loading;
