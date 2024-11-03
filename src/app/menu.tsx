import { TouchableOpacity, View, Modal, Text, Dimensions, ScrollView, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { LanguageSwitch } from '~/components/LanguageSwitch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

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
    },
  ];

  const logoutOption = {
    label: t('menu.logout'),
    icon: <FontAwesome5 name="sign-out-alt" size={20} color="gray" />,
    onPress: () => {
      console.log('Log out');
    }
  };

  useEffect(() => {
    console.log("SlidingMenu visibility:", visible);
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
      <SafeAreaView style={{ 
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 60,
        bottom: 0,
        left: 0,
        right: 0
      }}>
        <TouchableOpacity onPress={onClose} style={{ flex: 1 }}>
          <Text>Close Menu</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            backgroundColor: 'white',
            width: '60%',
            height: '100%',
            paddingHorizontal: 10,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <View className="flex-1">
            {/* Adding marginTop here to push menu options downward */}
            <View className="space-y-4 mb-6" style={{ marginTop: 120 }}>
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
            <View className="flex-1 justify-between">
              <View className="mt-8">
                <TouchableOpacity
                  onPress={logoutOption.onPress}
                  className="bg-gray-100 p-3 rounded-lg flex-row items-center"
                >
                  {logoutOption.icon}
                  <Text className="text-lg ml-3">{logoutOption.label}</Text>
                </TouchableOpacity>
              </View>
              <View className="pb-6">
                <LanguageSwitch />
              </View>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}
