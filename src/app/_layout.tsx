import '../../global.css';
import '../../translation';
import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { SlidingMenu } from './menu';

export default function Layout() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Stack
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setShowSettings(true)}
              className="ml-4"
            >
              <Text>⚙️</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <SlidingMenu 
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}