import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View, Image } from 'react-native';

export const Logo: React.FC<TouchableOpacityProps> = forwardRef<
  TouchableOpacity,
  TouchableOpacityProps
>(({ ...touchableProps }, ref) => {
  return (
    <View className="mt-10 flex-row">
      <View className="flex-1 items-end justify-center border-r border-black pr-9">
        <Image source={require('./../../assets/icon.png')} className="h-[70px] w-[70px] items-center justify-center rounded-full"/>
      </View>

      <View className="flex-1 items-start justify-center pl-9">
        <View className="h-[70px] w-[70px] items-center justify-center rounded-full">
          <Image
            source={require('./../../assets/logoSGGW.png')}
            alt="SGGW logo"
            className="h-[70px] w-full"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
});

