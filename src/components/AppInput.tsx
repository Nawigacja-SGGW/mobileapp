import React, { forwardRef } from 'react'; 
import { KeyboardTypeOptions, TextInput, TextInputProps, Text, View, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type InputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  keyboardType: KeyboardTypeOptions | undefined;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: (event: GestureResponderEvent) => void;
} & TextInputProps;

export const AppInput: React.FC<InputProps> = forwardRef<TextInput, InputProps>(
  ({ label, placeholder, value, onChangeText, keyboardType, ...inputProps }, ref) => {
    return (
      <View>
        <Text className={`text-black text-lg font-semibold mb-2 mt-5`}>{label}</Text>
        <TextInput
          ref={ref}
          {...inputProps}
          className={`border border-black p-4 rounded-lg text-black text-base`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    );
  }
);

export const AppSecureInput: React.FC<InputProps> = forwardRef<TextInput, InputProps>(
  ({ label, placeholder, value, onChangeText, keyboardType, isPasswordVisible, togglePasswordVisibility, ...inputProps }, ref) => {
    return (
      <View>
        <Text className={`text-black text-lg font-semibold mb-2 mt-5`}>{label}</Text>
        <View className={`flex flex-row items-center border border-black rounded-lg`}>
          <TextInput
            ref={ref}
            {...inputProps}
            className={`flex-1 p-4 text-black text-base`}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} className={`px-4`}>
            <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={36} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);