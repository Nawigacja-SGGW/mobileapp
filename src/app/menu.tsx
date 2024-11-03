<<<<<<< Updated upstream
import { TouchableOpacity, View, Modal, Text, Dimensions, ScrollView, Animated } from 'react-native';
=======
import { TouchableOpacity, View, Text, Dimensions, Animated } from 'react-native';
>>>>>>> Stashed changes
import { useState, useEffect } from 'react';
import { LanguageSwitch } from '~/components/LanguageSwitch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
<<<<<<< Updated upstream
import { SafeAreaView } from 'react-native';
=======
>>>>>>> Stashed changes

const screenWidth = Dimensions.get('window').width;

interface SlidingMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SlidingMenu({ visible, onClose }: SlidingMenuProps) {
  const [slideAnim] = useState(new Animated.Value(-screenWidth));
  const { t } = useTranslation();
<<<<<<< Updated upstream
=======
  const [isMenuMounted, setIsMenuMounted] = useState(false);
>>>>>>> Stashed changes

  const menuOptions = [
    {
      label: t('menu.map'),
<<<<<<< Updated upstream
      icon: <FontAwesome5 name="map" size={20} color="gray" />,
=======
      icon: <FontAwesome5 name="map" size={20} color="black" />,
>>>>>>> Stashed changes
      onPress: () => {
        console.log('Open Map');
      }
    },
    {
      label: t('menu.objects'),
<<<<<<< Updated upstream
      icon: <FontAwesome5 name="box" size={20} color="gray" />,
=======
      icon: <FontAwesome5 name="box" size={20} color="black" />,
>>>>>>> Stashed changes
      onPress: () => {
        console.log('Open Objects');
      }
    },
    {
      label: t('menu.profile'),
<<<<<<< Updated upstream
      icon: <FontAwesome5 name="user" size={20} color="gray" />,
=======
      icon: <FontAwesome5 name="user" size={20} color="black" />,
>>>>>>> Stashed changes
      onPress: () => {
        console.log('Open Profile');
      }
    },
    {
      label: t('menu.settings'),
<<<<<<< Updated upstream
      icon: <FontAwesome5 name="cog" size={20} color="gray" />,
=======
      icon: <FontAwesome5 name="cog" size={20} color="black" />,
>>>>>>> Stashed changes
      onPress: () => {
        console.log('Open Settings');
      }
    },
  ];

  const logoutOption = {
    label: t('menu.logout'),
<<<<<<< Updated upstream
    icon: <FontAwesome5 name="sign-out-alt" size={20} color="gray" />,
=======
    icon: <FontAwesome5 name="sign-out-alt" size={20} color="black" />,
>>>>>>> Stashed changes
    onPress: () => {
      console.log('Log out');
    }
  };

  useEffect(() => {
<<<<<<< Updated upstream
    console.log("SlidingMenu visibility:", visible);
    if (visible) {
=======
    if (visible) {
      setIsMenuMounted(true);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
      }).start(() => {
        setIsMenuMounted(false);
      });
    }
  }, [visible]);

  if (!visible && !isMenuMounted) {
    return null;
  }

  return (
    <>
      {/* Nakładka pojawiająca się natychmiast, bez zasłaniania górnego panelu */}
      {visible && (
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 80, // Ustawiamy odległość od góry, by nakładka zaczynała się poniżej górnego panelu
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 5,
          }}
        />
      )}

      {/* Panel Menu */}
      <Animated.View 
        style={{
          position: 'absolute',
          left: 0,
          top: 80,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          transform: [{ translateX: slideAnim }],
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 10,
          }}
        >
          <View style={{ 
            flex: 1, 
            paddingHorizontal: 10,
            paddingTop: 10,
            marginTop: 80,
          }}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                {option.icon}
                <Text style={{ marginLeft: 10, color: 'black' }}>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={logoutOption.onPress}
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 'auto',
                marginBottom: 50,
              }}
            >
              {logoutOption.icon}
              <Text style={{ marginLeft: 10, color: 'black' }}>{logoutOption.label}</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 20 }}>
              <LanguageSwitch />
            </View>
          </View>
        </View>
      </Animated.View>
    </>
>>>>>>> Stashed changes
  );
}
