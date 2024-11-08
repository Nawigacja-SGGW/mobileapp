import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text, Dimensions, Animated } from 'react-native';

import { LanguageSwitch } from '~/components/LanguageSwitch';

const screenWidth = Dimensions.get('window').width;
interface SlidingMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SlidingMenu({ visible, onClose }: SlidingMenuProps) {
  const [slideAnim] = useState(new Animated.Value(-screenWidth));
  const { t } = useTranslation();
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  const menuOptions = [
    {
      label: t('menu.map'),
      icon: <FontAwesome5 name="map" size={20} color="black" />,
      onPress: () => {
        console.log('Open Map');
      },
    },
    {
      label: t('menu.objects'),
      icon: <FontAwesome5 name="box" size={20} color="black" />,
      onPress: () => {
        console.log('Open Objects');
      },
    },
    {
      label: t('menu.profile'),
      icon: <FontAwesome5 name="user" size={20} color="black" />,
      onPress: () => {
        console.log('Open Profile');
      },
    },
    {
      label: t('menu.settings'),
      icon: <FontAwesome5 name="cog" size={20} color="black" />,
      onPress: () => {
        console.log('Open Settings');
      },
    },
  ];

  const logoutOption = {
    label: t('menu.logout'),
    icon: <FontAwesome5 name="sign-out-alt" size={20} color="black" />,
    onPress: () => {
      console.log('Log out');
    },
  };

  useEffect(() => {
    if (visible) {
      setIsMenuMounted(true);
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
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 10,
          }}>
          <View
            style={{
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
                }}>
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
              }}>
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
  );
}
