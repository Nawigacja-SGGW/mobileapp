import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';

interface TopPanelProps {
  showSettings: boolean;
  onMenuToggle: () => void;
}

export function TopPanel({ showSettings, onMenuToggle }: TopPanelProps) {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#013707',
        },
        headerTintColor: '#FFFFFF',
        headerLeft: () => (
          <TouchableOpacity onPress={onMenuToggle} className="ml-4">
            <FontAwesome5 
              name={showSettings ? "chevron-left" : "bars"} 
              size={20} 
              color="white"
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}