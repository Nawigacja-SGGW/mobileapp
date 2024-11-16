import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

type ButtonProps = {
  title: string;
  buttonStyle?:StyleProp<ViewStyle>;
  textStyle?:StyleProp<TextStyle>;
} & RNTouchableOpacityProps;

export const AppButton: React.FC<ButtonProps> = forwardRef<TouchableOpacity, ButtonProps>(({ title, buttonStyle, textStyle, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button,buttonStyle]}>
        <Text style={[styles.buttonText,textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    backgroundColor: '#003228',
    borderRadius: 30,
    padding: 16,
    shadowColor: '#000', // Kolor cienia
    shadowOffset: { width: 0, height: 4 }, // Ustawienie offsetu cienia
    shadowOpacity: 0.1, // Ustawienie przezroczystości cienia
    shadowRadius: 5, // Rozmycie cienia
    elevation: 5, // Dla Androida (dodanie cienia)
    marginVertical: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
});