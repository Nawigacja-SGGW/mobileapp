import { forwardRef } from 'react'; 
import { Text, TouchableOpacity, TouchableOpacityProps, View, Image } from 'react-native';

const logoSize = 70;

export const Logo: React.FC<TouchableOpacityProps> = forwardRef<TouchableOpacity, TouchableOpacityProps>(({ ...touchableProps }, ref) => {
  return (
    <View className="flex-row mt-10">
      <View className="flex-1 justify-center items-end pr-9 border-r border-black">
        <View className="h-[70px] w-[70px] rounded-full justify-center items-center bg-[#cccccc]">
          <Text>Logo</Text>
        </View>
      </View>

      <View className="flex-1 justify-center items-start pl-9">
        <View className="h-[70px] w-[70px] rounded-full justify-center items-center bg-white">
          <Image 
            source={require("./../../assets/logoSGGW.png")} 
            alt="SGGW logo" 
            className="w-full h-[70px]" 
            resizeMode="contain" 
          />
        </View>
      </View>
    </View>
  );
});