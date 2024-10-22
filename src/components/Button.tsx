import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`my-1 items-center rounded-[28px] bg-indigo-500 p-4 shadow-md ${touchableProps.className}`}>
        <Text className="text-center text-lg font-semibold text-white">{title}</Text>
      </TouchableOpacity>
    );
  }
);
