import React, { forwardRef } from 'react';
import { KeyboardTypeOptions, TextInput, TextInputProps, StyleSheet, Text, View, TouchableOpacity, Image, GestureResponderEvent} from 'react-native';

type InputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  keyboardType: KeyboardTypeOptions | undefined;
  isPasswordVisible?:boolean;
  togglePasswordVisibility?:(event: GestureResponderEvent) => void
} & TextInputProps;

export const AppInput: React.FC<InputProps> = forwardRef<TextInput, InputProps>(
  ({ label, placeholder, value, onChangeText, keyboardType, ...inputProps }, ref) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          {...inputProps}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType= {keyboardType}
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
        <Text style={styles.label}>{label}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            ref={ref}
            {...inputProps}
            style={styles.passwordInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType= {keyboardType}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Image source={require("./../../assets/hide.png")} alt="Hide icon"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 18,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
    fontWeight: 700,
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 18,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    paddingHorizontal: 18,
  },
});