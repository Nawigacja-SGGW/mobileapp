import { TouchableOpacity, View, Modal, Text, Dimensions, ScrollView, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { LanguageSwitch } from '~/components/LanguageSwitch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get('window').width;

interface SlidingMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SlidingMenu({ visible, onClose }: SlidingMenuProps) {
  const [slideAnim] = useState(new Animated.Value(-screenWidth));
  const { t } = useTranslation();

  const menuOptions = [
    {
      label: t('menu.map'),
      icon: <FontAwesome5 name="map" size={20} color="gray" />,
      onPress: () => {
        console.log('Open Map');
      }
    },
    {
      label: t('menu.objects'),
      icon: <FontAwesome5 name="box" size={20} color="gray" />,
      onPress: () => {
        console.log('Open Objects');
      }
    },
    {
      label: t('menu.profile'),
      icon: <FontAwesome5 name="user" size={20} color="gray" />,
      onPress: () => {
        console.log('Open Profile');
      }
    },
    {
      label: t('menu.settings'),
      icon: <FontAwesome5 name="cog" size={20} color="gray" />,
      onPress: () => {
        console.log('Open Settings');
      }
    }
  ];

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
    >
      <View className="flex-1 bg-black/50 justify-start items-start">
        <Animated.View
          style={{
            backgroundColor: 'white',
            width: '75%',
            height: '100%',
            paddingTop: 20,
            paddingHorizontal: 10,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            className="self-start mb-4 p-2"
          >
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>

          <ScrollView contentContainerClassName="flex-1">
            <View className="space-y-4 mb-6">
              {menuOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={option.onPress}
                  className="bg-gray-100 p-3 rounded-lg flex-row items-center"
                >
                  {option.icon}
                  <Text className="text-lg ml-3">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-auto pb-6">
              <LanguageSwitch />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}