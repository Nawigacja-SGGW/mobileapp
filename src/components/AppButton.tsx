import { forwardRef } from 'react'; 
import { Text, TouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native';

type ButtonProps = {
  title: string;
  buttonStyle?: string;
  textStyle?: string;
} & RNTouchableOpacityProps;

export const AppButton: React.FC<ButtonProps> = forwardRef<TouchableOpacity, ButtonProps>(({ title, buttonStyle, textStyle, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity 
      ref={ref} 
      {...touchableProps} 
      className={`justify-center bg-[#003228] rounded-[30px] py-4 shadow-md my-7 ${buttonStyle}`}>
        <Text className={`text-white text-center text-lg font-bold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
});